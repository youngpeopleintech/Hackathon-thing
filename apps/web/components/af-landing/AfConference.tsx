import { Reveal } from './Reveal';

export function AfConference() {
  return (
    <section id="conference" className="section section-cream">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">The Conference</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">
            A day that <span style={{ color: '#FE324B' }}>actually mattered.</span>
          </h2>
        </Reveal>
        <div className="conf-grid">
          <Reveal delay={0.15}>
            <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 22 }}>
              The Artificial Future Conference was a standalone day of talks, panels, and conversations about the state
              and future of AI in Africa and globally.
            </p>
            <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 22 }}>
              The most ambitious hackathon projects were showcased that day. The best teams presented in front of a
              live audience, and prizes were awarded on the day.
            </p>
            <p style={{ fontSize: 14, color: '#b0a89a', fontWeight: 300, lineHeight: 1.7, marginBottom: 36 }}>
              It was open to anyone. You did not need to have been in the hackathon to attend. Tickets were paid and
              capacity was limited.
            </p>
            <a href="#impact" className="btn-outline">
              Get the impact report →
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
                <p>Top hackathon teams pitched live</p>
              </div>
            </div>
            <div className="conf-detail">
              <div className="conf-detail-marker" aria-hidden />
              <div>
                <h5>Networking</h5>
                <p>Dedicated breaks and a closing reception</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
