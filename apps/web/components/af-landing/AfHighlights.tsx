import { Reveal } from './Reveal';

const ALBUM_URL = 'https://youngpeopleintech.pixieset.com/ypittheartificialfuture2026/';

export function AfHighlights() {
  return (
    <section id="highlights" className="section section-white">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">Highlights</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">
            Lagos, May 30 – June 13.
            <br />
            The room, the builds, the day.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="section-sub">
            Workshops ran through the spring. The hackathon occupied the first week of June. The conference closed the
            programme at The Civic Centre. The photo album holds the frames from those weeks.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <a href={ALBUM_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            View the photo album →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
