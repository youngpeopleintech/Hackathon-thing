import { readFile } from 'node:fs/promises';
import { createHmac, timingSafeEqual } from 'node:crypto';
import path from 'node:path';
import { NextRequest } from 'next/server';

const MAX_AGE_SECONDS = 60 * 60 * 12;
const SECURITY_HEADERS = {
  'Cache-Control': 'no-store, max-age=0',
  'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
};

type TeamBoardMember = {
  email?: string;
};

type TeamBoardTeam = {
  members?: TeamBoardMember[];
};

type TeamBoardData = {
  teams?: TeamBoardTeam[];
  on_hold?: TeamBoardMember[];
  storytelling?: TeamBoardMember[];
};

type GateConfig = {
  cookieName: string;
  htmlFile: string;
  title: string;
  description: string;
  isEmailAllowed: (email: string) => Promise<boolean>;
};

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getSessionSecret() {
  const secret = process.env.TEAM_BOARD_SESSION_SECRET;

  if (!secret) {
    throw new Error('TEAM_BOARD_SESSION_SECRET is not configured');
  }

  return secret;
}

function sign(payload: string) {
  return createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
}

function encodeSessionPayload(payload: { email: string; issuedAt: number }) {
  return Buffer.from(JSON.stringify(payload)).toString('base64url');
}

function decodeSessionPayload(payload: string) {
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      email?: unknown;
      issuedAt?: unknown;
    };

    if (typeof parsed.email !== 'string' || typeof parsed.issuedAt !== 'number') {
      return null;
    }

    return {
      email: parsed.email,
      issuedAt: parsed.issuedAt,
    };
  } catch {
    return null;
  }
}

function secureCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export async function loadParticipantEmails() {
  const dataPath = path.join(process.cwd(), 'data', 'team-board.json');
  const data = JSON.parse(await readFile(dataPath, 'utf8')) as TeamBoardData;
  const emails = new Set<string>();

  data.teams?.forEach((team) => {
    team.members?.forEach((member) => {
      if (member.email) {
        emails.add(normalizeEmail(member.email));
      }
    });
  });

  data.on_hold?.forEach((member) => {
    if (member.email) {
      emails.add(normalizeEmail(member.email));
    }
  });

  data.storytelling?.forEach((member) => {
    if (member.email) {
      emails.add(normalizeEmail(member.email));
    }
  });

  return emails;
}

export async function isParticipantEmailAllowed(email: string) {
  const emails = await loadParticipantEmails();

  return emails.has(normalizeEmail(email));
}

export async function isOrganiserEmailAllowed(email: string) {
  const configuredEmail = process.env.TEAM_BOARD_ORGANISER_EMAIL;

  if (!configuredEmail) {
    return false;
  }

  return normalizeEmail(configuredEmail) === normalizeEmail(email);
}

function createSessionCookie(email: string, config: GateConfig) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = encodeSessionPayload({ email: normalizeEmail(email), issuedAt });
  const signature = sign(payload);

  return [
    `${config.cookieName}=${encodeURIComponent(`${payload}.${signature}`)}`,
    'Path=/teams',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${MAX_AGE_SECONDS}`,
    process.env.NODE_ENV === 'production' ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ');
}

async function hasValidSession(request: NextRequest, config: GateConfig) {
  const session = request.cookies.get(config.cookieName)?.value;

  if (!session) {
    return false;
  }

  const parts = session.split('.');

  if (parts.length !== 2) {
    return false;
  }

  const [payload, signature] = parts;
  const decodedPayload = decodeSessionPayload(payload);

  if (!decodedPayload) {
    return false;
  }

  const now = Math.floor(Date.now() / 1000);

  if (now - decodedPayload.issuedAt > MAX_AGE_SECONDS) {
    return false;
  }

  if (!secureCompare(signature, sign(payload))) {
    return false;
  }

  return config.isEmailAllowed(decodedPayload.email);
}

function renderGate(config: GateConfig, error?: string) {
  const errorMarkup = error ? `<p class="error">${error}</p>` : '';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow,noarchive,nosnippet">
  <title>${config.title}</title>
  <style>
    *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:linear-gradient(135deg,#fff8ef,#fff,#f4efe8);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#161616;padding:24px}.card{width:min(100%,460px);background:#fff;border:1px solid rgba(255,70,0,.18);border-radius:28px;box-shadow:0 24px 80px rgba(22,22,22,.12);padding:34px}.eyebrow{color:#ff4600;font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;margin:0 0 12px}h1{font-size:40px;line-height:1;margin:0 0 14px;letter-spacing:-.04em}p{color:#5f5f5f;line-height:1.6;margin:0 0 24px}label{display:block;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-bottom:10px}input{width:100%;border:1px solid rgba(22,22,22,.18);border-radius:999px;padding:15px 18px;font:inherit;outline:none}input:focus{border-color:#ff4600;box-shadow:0 0 0 4px rgba(255,70,0,.12)}button{width:100%;border:0;border-radius:999px;background:#ff4600;color:#fff;cursor:pointer;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:16px 24px;margin-top:18px}.error{color:#b42318;font-size:14px;margin:12px 0 0}
  </style>
</head>
<body>
  <form class="card" method="post">
    <p class="eyebrow">YPIT Artificial Future</p>
    <h1>${config.title}</h1>
    <p>${config.description}</p>
    <label for="email">Registered email</label>
    <input id="email" name="email" type="email" autocomplete="email" required autofocus>
    ${errorMarkup}
    <button type="submit">Continue</button>
  </form>
</body>
</html>`;
}

export async function handleBoardGet(request: NextRequest, config: GateConfig) {
  if (!(await hasValidSession(request, config))) {
    return new Response(renderGate(config), {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        ...SECURITY_HEADERS,
      },
    });
  }

  const htmlPath = path.join(process.cwd(), 'data', config.htmlFile);
  const html = await readFile(htmlPath, 'utf8');

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      ...SECURITY_HEADERS,
    },
  });
}

export async function handleBoardPost(request: NextRequest, config: GateConfig) {
  const formData = await request.formData();
  const email = normalizeEmail(String(formData.get('email') || ''));

  if (!email || !(await config.isEmailAllowed(email))) {
    return new Response(renderGate(config, 'That email is not allowed to access this board.'), {
      status: 401,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        ...SECURITY_HEADERS,
      },
    });
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: request.nextUrl.pathname,
      'Set-Cookie': createSessionCookie(email, config),
      ...SECURITY_HEADERS,
    },
  });
}
