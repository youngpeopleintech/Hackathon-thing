import { Reveal } from './Reveal';

export function AfPartners() {
  return (
    <section id="partners" className="section section-cream">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">Partners & Sponsors</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">
            The organisations making
            <br />
            The Artificial Future possible.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="section-sub">
            We are grateful to the partners who believe in what we are building. More announcements coming soon.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="partner-grid">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="partner-slot">
              <span>Coming Soon</span>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.25} className="partner-cta">
          <div>
            <h3>Interested in partnering with The Artificial Future?</h3>
            <p>Capital, technology, utility, and people partnerships available.</p>
          </div>
          <a href="mailto:hello@youngpeopleintech.com" className="btn-primary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            Get in touch →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
