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
            The people who taught,
            <br />
            mentored, and took the stage.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="section-sub">
            Workshop leads are on this page. Mentors sat with teams through the build week. The conference brought a
            wider set of voices to The Civic Centre on June 13.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#workshops" className="btn-outline">
            See the workshop leads →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
