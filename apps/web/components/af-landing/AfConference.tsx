import { Reveal } from './Reveal';

function conferenceTicketHref() {
  const url = process.env.NEXT_PUBLIC_CONFERENCE_TICKET_URL;
  return url && url.length > 0 ? url : '#conference';
}

export function AfConference() {
  const ticketHref = conferenceTicketHref();

  return (
    <section id="conference" className="section section-cream">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">The Conference</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">
            A day that <span style={{ color: 'var(--coral)' }}>actually matters.</span>
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
            <p style={{ fontSize: 14, color: '#b0a89a', fontWeight: 300, lineHeight: 1.7, marginBottom: 40 }}>
              Open to anyone. You do not need to have participated in the hackathon to attend. Tickets are paid and
              capacity is limited.
            </p>
            <a href={ticketHref} className="btn-primary">
              Get Your Conference Ticket →
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
      </div>
    </section>
  );
}
