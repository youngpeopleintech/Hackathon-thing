'use client';

import Image from 'next/image';
import { Reveal } from './Reveal';

const CONFERENCE_TICKET_URL = 'https://eventornigeria.com/explore/ypit-af';

const TICKETS = [
  {
    name: 'Hackathon Participants',
    tag: 'Students',
    price: '₦3,500',
    desc: 'You took part in the hackathon. This ticket gets you into the conference to see how it all wraps up — the demos, the awards, and the day itself.',
    includes: 'Full day conference access and sponsor area.',
    note: 'Bring your hackathon registration confirmation and student ID.',
    image: '/images/af/african-ai-man.png',
    url: 'https://eventornigeria.com/checkout?step=1&action=purchase&ticket=86ac67dd-4d9d-42b9-9439-99716daaa9d5&event=91a755ba-62e4-4a77-8566-96608eb39b8a&occurrence=23158575-6458-471a-a273-b17904fd13c1',
  },
  {
    name: 'Hackathon Participants',
    tag: null,
    price: '₦4,000',
    desc: 'You were in the hackathon. Come to the conference and see the best projects presented live. This is the finish line.',
    includes: 'Full day conference access and sponsor area.',
    note: 'Bring your participation proof — we\'ll check at the door.',
    image: '/images/af/african-woman-ai.png',
    url: 'https://eventornigeria.com/checkout?step=1&action=purchase&ticket=86006851-24bd-4645-8dbe-1b6ca8be0441&event=91a755ba-62e4-4a77-8566-96608eb39b8a&occurrence=23158575-6458-471a-a273-b17904fd13c1',
  },
  {
    name: 'General Attendees',
    tag: 'Students',
    price: '₦4,500',
    desc: 'A full day of talks and panels with people who are actually building AI. If you\'re a student curious about where this is all going, this is worth your Saturday.',
    includes: 'Full day conference access and sponsor area.',
    note: 'Valid student ID required at the door.',
    image: '/images/af/young-tech-bro.png',
    url: 'https://eventornigeria.com/checkout?step=1&action=purchase&ticket=1383be7a-e090-453e-bb0f-4b19a2b557af&event=91a755ba-62e4-4a77-8566-96608eb39b8a&occurrence=23158575-6458-471a-a273-b17904fd13c1',
  },
  {
    name: 'General Attendees',
    tag: null,
    price: '₦7,500',
    desc: 'A full day of honest conversations about AI in Africa — where it is, where it\'s going, and who\'s building it. No prior technical background needed.',
    includes: 'Full day conference access and sponsor area.',
    note: null,
    image: '/images/af/young-tech-woman-ai.png',
    url: 'https://eventornigeria.com/checkout?step=1&action=purchase&ticket=ea053f23-1922-4697-9729-bfbd4c53190d&event=91a755ba-62e4-4a77-8566-96608eb39b8a&occurrence=23158575-6458-471a-a273-b17904fd13c1',
  },
];

const AGENDA = [
  {
    num: '01',
    type: 'Panel',
    typeColor: '#FF4600',
    title: 'The pillars of a functional AI ecosystem',
    desc: 'Data, infrastructure, applications, and policy — how the verticals work together, or don\'t.',
  },
  {
    num: '02',
    type: 'Lecture',
    typeColor: '#1a1714',
    title: 'From Next Token Prediction to AI Agents',
    desc: 'A technical journey through the history of AI, the key breakthroughs behind modern language models, and how they evolved into today\'s agentic systems.',
    speaker: 'Ayomide Odunmakinde · Member of Technical Staff, Cohere',
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
              We will also be showcasing the most ambitious projects from The Artificial Future Hackathon. We will bring
              the best teams to present in front of a live audience, and we will award prizes on the day.
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

        {/* Tickets */}
        <div id="tickets" style={{ scrollMarginTop: 80 }} />
        <Reveal delay={0.2}>
          <div className="conf-agenda-label" style={{ marginTop: 64 }}>Tickets</div>
        </Reveal>
        <div className="ticket-grid">
          {TICKETS.map((t, i) => (
            <Reveal key={i} delay={0.1 + i * 0.07}>
              <div className="ticket-card ticket-card--featured">
                <div className="ticket-card-left">
                  <div className="ticket-card-top">
                    <div className="ticket-name-row">
                      <span className="ticket-name">{t.name}</span>
                      {t.tag && <span className="ticket-tag">{t.tag}</span>}
                    </div>
                    <div className="ticket-price">{t.price}</div>
                    <p className="ticket-desc">{t.desc}</p>
                  </div>
                  <div className="ticket-card-bottom">
                    <p className="ticket-includes">{t.includes}</p>
                    {t.note && <p className="ticket-note">{t.note}</p>}
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ticket-btn"
                    >
                      Get ticket →
                    </a>
                  </div>
                </div>
                <div className="ticket-card-right">
                  <Image
                    src={t.image}
                    alt=""
                    fill
                    sizes="300px"
                    style={{ objectFit: 'contain', objectPosition: 'center bottom' }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Sponsor ticket */}
        <Reveal delay={0.2}>
          <a
            href="https://eventornigeria.com/checkout?step=1&action=purchase&ticket=23cc2574-0ea9-4fa9-a91e-2776c4bfc8a8&event=91a755ba-62e4-4a77-8566-96608eb39b8a&occurrence=23158575-6458-471a-a273-b17904fd13c1"
            target="_blank"
            rel="noopener noreferrer"
            className="ticket-sponsor-card"
          >
            <div className="ticket-sponsor-left">
              <div className="ticket-name-row">
                <span className="ticket-name">Investing in the Future</span>
                <span className="ticket-tag ticket-tag--gold">Sponsors &amp; Investors</span>
              </div>
              <p className="ticket-desc">For organisations and investors who want to be present when the next wave of African AI is being introduced. You'll have access to the full conference, demo day, and time with the teams.</p>
              <p className="ticket-includes">Full conference and demo day access, plus an invite to the post-conference mixer with other founders and senior executives.</p>
            </div>
            <div className="ticket-sponsor-right">
              <div className="ticket-price ticket-price--gold">₦100,000</div>
              <span className="ticket-btn ticket-btn--gold">Get ticket →</span>
            </div>
          </a>
        </Reveal>

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
                  {item.speaker && <p className="conf-agenda-speaker">{item.speaker}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
