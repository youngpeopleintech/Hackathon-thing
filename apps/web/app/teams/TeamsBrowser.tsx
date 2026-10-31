'use client';

import { useMemo, useState } from 'react';
import submissions from '@/data/submissions.json';

const TRACKS = ['All', 'Finance', 'Education', 'Healthcare', 'Language', 'Storytelling'] as const;
type Track = (typeof TRACKS)[number];

type Member = { name: string; role: string };
type Project = {
  team: string;
  product: string;
  track: string;
  problem: string;
  audience: string;
  built: string;
  ai: string;
  members: Member[];
  github: string[];
  brief: string;
};

const projects = [...(submissions.projects as Project[])].sort((a, b) =>
  a.product.localeCompare(b.product, 'en')
);
const withoutBrief = submissions.withoutBrief as { team: string; track: string }[];

function repoLabel(url: string, total: number) {
  if (total === 1) return 'GitHub';
  const name = url.split('/').filter(Boolean).pop();
  return name || 'GitHub';
}

export function TeamsBrowser() {
  const [track, setTrack] = useState<Track>('All');

  const visible = useMemo(
    () => (track === 'All' ? projects : projects.filter((project) => project.track === track)),
    [track]
  );
  const quiet = useMemo(
    () =>
      track === 'All' ? withoutBrief : withoutBrief.filter((team) => team.track === track),
    [track]
  );
  const quietGroups = useMemo(() => {
    const order = ['Finance', 'Education', 'Healthcare', 'Language', ''];
    return order
      .map((name) => ({
        name,
        teams: quiet.filter((team) => team.track === name).map((team) => team.team),
      }))
      .filter((group) => group.teams.length > 0);
  }, [quiet]);

  return (
    <div className="teams-inner">
      <p className="teams-eyebrow">The Hackathon · May 30 – June 6, 2026</p>
      <h1 className="teams-title">
        <span className="line">What teams</span>
        <span className="line accent">built.</span>
      </h1>
      <p className="teams-lead">
        {projects.length} teams left a public brief from the week in Lagos and online. Each card is
        the product, who made it, and the code. The written brief opens the problem, the person it
        was for, and how AI was used.
      </p>

      <div className="teams-filters" role="group" aria-label="Filter by track">
        {TRACKS.map((name) => {
          const count = name === 'All' ? projects.length : projects.filter((project) => project.track === name).length;
          return (
            <button
              key={name}
              type="button"
              className="teams-filter"
              aria-pressed={track === name}
              onClick={() => setTrack(name)}
            >
              {name}
              <span>{count}</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="teams-empty">
          {track === 'Storytelling'
            ? 'No published brief used the storytelling track.'
            : `No published brief in ${track}.`}
        </p>
      ) : (
        <div className="teams-grid">
          {visible.map((project) => (
            <article key={project.product + project.team} className="team-card">
              <header className="team-card-top">
                <h2>{project.product}</h2>
                <span className="team-track">{project.track}</span>
              </header>
              <p className="team-name">{project.team}</p>
              <p className="team-built">{project.built}</p>
              {project.members.length > 0 && (
                <ul className="team-members">
                  {project.members.map((member) => (
                    <li key={member.name}>
                      <span>{member.name}</span>
                      {member.role ? ` · ${member.role}` : ''}
                    </li>
                  ))}
                </ul>
              )}
              <div className="team-links">
                {project.github.map((url) => (
                  <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                    {repoLabel(url, project.github.length)}
                  </a>
                ))}
              </div>
              <details className="team-more">
                <summary>The brief</summary>
                <div className="team-more-body">
                  {project.problem && (
                    <section>
                      <h3>The problem</h3>
                      <p>{project.problem}</p>
                    </section>
                  )}
                  {project.audience && (
                    <section>
                      <h3>Who it was for</h3>
                      <p>{project.audience}</p>
                    </section>
                  )}
                  {project.ai && (
                    <section>
                      <h3>How AI was used</h3>
                      <p>{project.ai}</p>
                    </section>
                  )}
                  <a href={project.brief} target="_blank" rel="noopener noreferrer">
                    Read the full brief
                  </a>
                </div>
              </details>
            </article>
          ))}
        </div>
      )}

      {quietGroups.length > 0 && (
        <section className="teams-quiet">
          <h2>Registered, without a brief here</h2>
          <p>
            These names were on the hackathon board. A public project write-up was not available for
            them. Mafita filed a brief that is not publicly readable.
          </p>
          {quietGroups.map((group) => (
            <div key={group.name || 'sheet'} className="teams-quiet-group">
              <h3>{group.name || 'On the sheet'}</h3>
              <ul>
                {group.teams.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
