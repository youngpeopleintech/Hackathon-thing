#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const args = process.argv.slice(2);
const flags = args.filter((arg) => arg.startsWith('--'));
const inputPaths = args.filter((arg) => !arg.startsWith('--'));
const [participantInputPath, organiserInputPath] = inputPaths;
const allowCountDrop = flags.includes('--allow-count-drop');
const dataDir = path.join(__dirname, '..', 'data');
const jsonOutputPath = path.join(dataDir, 'team-board.json');
const htmlOutputPath = path.join(dataDir, 'team-board.html');
const organiserJsonOutputPath = path.join(dataDir, 'team-board-organiser.json');
const organiserHtmlOutputPath = path.join(dataDir, 'team-board-organiser.html');

function fail(message) {
  console.error(`Team board update failed: ${message}`);
  process.exit(1);
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    fail(`could not read ${filePath}: ${error.message}`);
  }
}

function extractDataLiteral(html) {
  const marker = 'const DATA =';
  const start = html.indexOf(marker);

  if (start === -1) {
    fail('could not find a const DATA assignment');
  }

  if (html.indexOf(marker, start + marker.length) !== -1) {
    fail('found more than one const DATA assignment');
  }

  const braceStart = html.indexOf('{', start + marker.length);

  if (braceStart === -1) {
    fail('const DATA assignment does not contain an object literal');
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = braceStart; index < html.length; index += 1) {
    const char = html[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }

      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;

      if (depth === 0) {
        return html.slice(braceStart, index + 1);
      }
    }
  }

  fail('const DATA object literal was not closed');
}

function normalize(value) {
  return String(value || '').trim().toLowerCase();
}

function validateData(data) {
  const errors = [];

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    errors.push('DATA must be a top-level object');
  }

  if (!data.meta || typeof data.meta !== 'object' || Array.isArray(data.meta)) {
    errors.push('DATA.meta must be an object');
  }

  if (!Array.isArray(data.teams)) {
    errors.push('DATA.teams must be an array');
    return { errors, participantCount: 0, teamCount: 0 };
  }

  const seenTeamNames = new Set();
  const seenParticipantIds = new Set();
  const seenParticipantEmails = new Set();
  const seenParticipantKeys = new Set();
  const seenPlacements = new Set();
  let teamMemberCount = 0;
  let totalParticipantCount = 0;
  let duplicatePlacementCount = 0;

  function validateParticipant(member, placementGroup, context) {
    totalParticipantCount += 1;

    if (!member || typeof member !== 'object' || Array.isArray(member)) {
      errors.push(`${context} must be an object`);
      return;
    }

    const participantId = normalize(member.id);
    const participantEmail = normalize(member.email);
    const participantKey = participantId || participantEmail;
    const placementKey = participantKey ? `${participantKey}:${placementGroup}` : '';

    if (!normalize(member.name)) {
      errors.push(`${context} is missing a name`);
    }

    if (!participantId) {
      errors.push(`${context} is missing an id`);
    } else {
      seenParticipantIds.add(participantId);
    }

    if (participantEmail) {
      seenParticipantEmails.add(participantEmail);
    }

    if (participantKey) {
      if (seenParticipantKeys.has(participantKey)) {
        duplicatePlacementCount += 1;
      } else {
        seenParticipantKeys.add(participantKey);
      }
    }

    if (placementKey) {
      if (seenPlacements.has(placementKey)) {
        errors.push(`duplicate participant placement detected for ${context}`);
      } else {
        seenPlacements.add(placementKey);
      }
    }
  }

  data.teams.forEach((team, teamIndex) => {
    if (!team || typeof team !== 'object' || Array.isArray(team)) {
      errors.push(`team ${teamIndex + 1} must be an object`);
      return;
    }

    const teamName = normalize(team.name);

    if (!teamName) {
      errors.push(`team ${teamIndex + 1} is missing a name`);
    } else if (seenTeamNames.has(teamName)) {
      errors.push('duplicate team name detected');
    } else {
      seenTeamNames.add(teamName);
    }

    if (!Array.isArray(team.members)) {
      errors.push(`team ${teamIndex + 1} must have a members array`);
      return;
    }

    team.members.forEach((member, memberIndex) => {
      teamMemberCount += 1;
      validateParticipant(member, `team:${teamName}`, `member ${memberIndex + 1} in team ${teamIndex + 1}`);
    });
  });

  [
    ['on_hold', 'on_hold_count'],
    ['storytelling', 'storytelling_count'],
  ].forEach(([arrayKey, metaKey]) => {
    if (!Array.isArray(data[arrayKey])) {
      errors.push(`DATA.${arrayKey} must be an array`);
      return;
    }

    data[arrayKey].forEach((member, memberIndex) => {
      validateParticipant(member, arrayKey, `${arrayKey} member ${memberIndex + 1}`);
    });

    if (typeof data.meta[metaKey] === 'number' && data.meta[metaKey] !== data[arrayKey].length) {
      errors.push(`DATA.meta.${metaKey} does not match DATA.${arrayKey}.length`);
    }
  });

  if (typeof data.meta.total_participants === 'number' && data.meta.total_participants < seenParticipantEmails.size) {
    errors.push('DATA.meta.total_participants is lower than the counted unique participant emails');
  }

  if (typeof data.meta.people_in_teams === 'number' && data.meta.people_in_teams !== teamMemberCount) {
    errors.push('DATA.meta.people_in_teams does not match the counted team members');
  }

  if (typeof data.meta.total_teams === 'number' && data.meta.total_teams !== data.teams.length) {
    errors.push('DATA.meta.total_teams does not match DATA.teams.length');
  }

  return {
    errors,
    participantCount: seenParticipantKeys.size,
    placementCount: totalParticipantCount,
    duplicatePlacementCount,
    teamMemberCount,
    teamCount: data.teams.length,
  };
}

function readExistingSnapshot() {
  if (!fs.existsSync(jsonOutputPath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(jsonOutputPath, 'utf8'));
  } catch {
    fail('existing team-board.json is not valid JSON');
  }
}

function parseSnapshot(inputPath, label) {
  const html = readFile(path.resolve(inputPath));
  const dataLiteral = extractDataLiteral(html);
  let data;

  try {
    data = JSON.parse(dataLiteral);
  } catch (error) {
    fail(`${label} DATA is not valid JSON: ${error.message}`);
  }

  const validation = validateData(data);

  if (validation.errors.length > 0) {
    fail(`${label} validation failed: ${validation.errors.join('; ')}`);
  }

  return { html, data, validation };
}

function stripOrganiserGate(html) {
  let nextHtml = html;

  nextHtml = nextHtml.replace(
    /<div class="gate-overlay" id="gate"[\s\S]*?<div id="main-content" style="display:none">/,
    '<div id="main-content">'
  );

  nextHtml = nextHtml.replace(/const GATE_CODE[\s\S]*?(?=<\/script>)/, '');

  const remainingGateMarkers = [
    'GATE_CODE',
    'gate-input',
    'gate-error',
    'af_org_access',
    'checkGate',
    'Access Organiser View',
  ].filter((marker) => nextHtml.includes(marker));

  if (remainingGateMarkers.length > 0) {
    fail(`organiser board still contains client-side gate markers: ${remainingGateMarkers.join(', ')}`);
  }

  return nextHtml;
}

if (!participantInputPath || !organiserInputPath) {
  fail('usage: npm run teams:update -- /path/to/participant-board.html /path/to/organiser-board.html [--allow-count-drop]');
}

const participantSnapshot = parseSnapshot(participantInputPath, 'participant board');
const organiserSnapshot = parseSnapshot(organiserInputPath, 'organiser board');
organiserSnapshot.html = stripOrganiserGate(organiserSnapshot.html);
const existingSnapshot = readExistingSnapshot();

if (existingSnapshot && !allowCountDrop) {
  const existingValidation = validateData(existingSnapshot);

  if (participantSnapshot.validation.participantCount < existingValidation.participantCount) {
    fail('new participant snapshot has fewer participants than the current snapshot; pass --allow-count-drop if intentional');
  }
}

fs.mkdirSync(dataDir, { recursive: true });

const nextJson = `${JSON.stringify(participantSnapshot.data, null, 2)}\n`;
const nextOrganiserJson = `${JSON.stringify(organiserSnapshot.data, null, 2)}\n`;
const tempJsonPath = `${jsonOutputPath}.tmp`;
const tempHtmlPath = `${htmlOutputPath}.tmp`;
const tempOrganiserJsonPath = `${organiserJsonOutputPath}.tmp`;
const tempOrganiserHtmlPath = `${organiserHtmlOutputPath}.tmp`;

fs.writeFileSync(tempJsonPath, nextJson);
fs.writeFileSync(tempHtmlPath, participantSnapshot.html);
fs.writeFileSync(tempOrganiserJsonPath, nextOrganiserJson);
fs.writeFileSync(tempOrganiserHtmlPath, organiserSnapshot.html);
fs.renameSync(tempJsonPath, jsonOutputPath);
fs.renameSync(tempHtmlPath, htmlOutputPath);
fs.renameSync(tempOrganiserJsonPath, organiserJsonOutputPath);
fs.renameSync(tempOrganiserHtmlPath, organiserHtmlOutputPath);

console.log(
  `Updated participant and organiser team boards (${participantSnapshot.validation.teamCount} teams, ${participantSnapshot.validation.participantCount} participants).`
);
