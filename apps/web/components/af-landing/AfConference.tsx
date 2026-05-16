'use client';

import { Reveal } from './Reveal';

const CONFERENCE_TICKET_URL = 'https://eventornigeria.com/explore/ypit-af';

const AGENDA = [
  {
    num: '01',
    type: 'Panel',
    typeColor: '#FF4600',
    title: 'What it actually takes to build AI in Africa',
    desc: 'Data, infrastructure, applications, and policy — how the verticals work together, or don\'t.',
  },
  {
    num: '02',
    type: 'Lecture',
    typeColor: '#1a1714',
    title: 'From Next Token Prediction to AI Agents',
    desc: 'A technical journey through the history of AI, the key breakthroughs behind modern language models, and how they evolved into today\'s agentic systems.',
  },
  {
    num: '03',
    type: 'Fireside Chat',
    typeColor: '#7E3BED',
    title: 'The realities of building AI businesses for Africans',
    desc: 'Local founders building AI-first businesses share what the journey actually looks like.',
  },
  {
    num: '04',
    type: 'Fireside Chat',
    typeColor: '#7E3BED',
    title: 'Investing in Africa\'s AI Future',
    desc: 'Founders, angels, and institutional investors on funding the ecosystem.',
  },
  {
    num: '05',
    type: 'Demo Day',
    typeColor: '#0077C8',
    title: 'Hackathon Showcase',
    desc: 'Top teams present to a live audience of investors, corporates, and community. Judges deliberate.',
  },
  {
    num: '06',
    type: 'Awards',
    typeColor: '#c9a84c',
    title: 'Awards Ceremony',
    desc: 'Prize announcements including named award categories from headline partners.',
  },
];

export function AfConference() {
  return (
    <section id="conference" className="section section-cream">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">The Conference</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">
            A day that <span style={{ color: '#FE324B' }}>actually matters.</span>
          </h2>
        </Reveal>
        <div className="conf-grid">
          <Reveal delay={0.15}>
            <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 22 }}>
              The Artificial Future Conference is a standalone day of talks, panels, and conversations about the state
              and future of AI in Africa and globally. Curated to be genuinely useful — not just inspirational.
            </p>
            <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 22 }}>
              We will also be showcasing the most ambitious Hackathon projects. The best teams present in front of a
              live audience, and we will award prizes and crown a winner on the day.
            </p>
            <p style={{ fontSize: 14, color: '#b0a89a', fontWeight: 300, lineHeight: 1.7, marginBottom: 36 }}>
              Open to anyone. You do not need to have participated in the hackathon to attend. Tickets are paid and
              capacity is limited.
            </p>
            <a
              href={CONFERENCE_TICKET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="conf-waitlist-btn"
              style={{ display: 'inline-flex', textDecoration: 'none' }}
            >
              Get Conference Tickets →
            </a>
          </Reveal>
          <Reveal delay={0.25} className="conf-card">
            <div className="conf-card-header">
              <h4>Conference Details</h4>
              <p>June 13, 2026</p>
            </div>
            <div className="conf-detail">
              <div className="conf-detail-marker" aria-hidden />
              <div>
                <h5>Venue</h5>
                <p>The Civic Centre, Lagos Island, Nigeria</p>
              </div>
            </div>
            <div className="conf-detail">
              <div className="conf-detail-marker" aria-hidden />
              <div>
                <h5>Main Stage</h5>
                <p>Keynotes from leading voices in African AI</p>
              </div>
            </div>
            <div className="conf-detail">
              <div className="conf-detail-marker" aria-hidden />
              <div>
                <h5>Breakout Sessions</h5>
                <p>Workshops, roundtables, and panels</p>
              </div>
            </div>
            <div className="conf-detail">
              <div className="conf-detail-marker" aria-hidden />
              <div>
                <h5>Demo Day</h5>
                <p>Top hackathon teams pitch live — YC-style</p>
              </div>
            </div>
            <div className="conf-detail">
              <div className="conf-detail-marker" aria-hidden />
              <div>
                <h5>Networking</h5>
                <p>Dedicated breaks and closing reception</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Agenda */}
        <Reveal delay={0.2}>
          <div className="conf-agenda-label">June 13 · Agenda</div>
        </Reveal>
        <div className="conf-agenda">
          {AGENDA.map((item, i) => (
            <Reveal key={item.num} delay={0.1 + i * 0.07}>
              <div className="conf-agenda-row">
                <span className="conf-agenda-num">{item.num}</span>
                <div className="conf-agenda-body">
                  <span className="conf-agenda-type" style={{ color: item.typeColor }}>{item.type}</span>
                  <h4 className="conf-agenda-title">{item.title}</h4>
                  <p className="conf-agenda-desc">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
