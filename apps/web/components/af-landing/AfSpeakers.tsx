import { Reveal } from './Reveal';

export function AfSpeakers() {
  return (
    <section id="speakers" className="section section-white">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">Speakers & Mentors</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">
            We are putting together
            <br />
            an exceptional group of people.
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="speakers-box">
          <h3>Announcements coming soon.</h3>
          <p>
            We are recruiting practitioners, researchers, and builders who are actually changing what it means to build
            AI for Africans. Follow us to hear first.
          </p>
          <a href="https://www.youngpeopleintech.com" target="_blank" rel="noopener noreferrer" className="btn-outline">
            Follow us for updates →
          </a>
          <div className="ghost-grid">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="ghost-card">
                <div className="ghost-avatar" />
                <div className="ghost-line" />
                <div className="ghost-line short" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
