import { Reveal } from './Reveal';

export function AfAbout() {
  return (
    <section id="about" className="section section-white">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">What is The Artificial Future?</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">
            A programme built to put young Africans at the centre of AI.
            <br />
            <span style={{ color: 'var(--coral)' }}>Not as observers, but as builders.</span>
          </h2>
        </Reveal>
        <div className="about-grid">
          <Reveal delay={0.15} className="about-body">
            <p>
              There are a lot of young Africans paying close attention to AI right now. Some are curious, many are
              ambitious, and a lot of people are already trying to figure out where they fit. However, there are not
              nearly enough spaces built to actually empower them.
            </p>
            <p>
              The Artificial Future was a space built to empower these people. Over several weeks, participants took part
              in workshops, collaborated in a live hackathon, and joined a conference where Africa&apos;s most ambitious
              thinkers shared what they are seeing and building.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="callout">
              <h4>Open to everyone.</h4>
              <p>
                Whether you are a student, a developer, a founder, a researcher, a policy maker, or an investor — you
                belong in that room. You did not need to arrive as an expert. Since 2022, across every event we have
                run, the most interesting things happen when curious, ambitious people share a room. This was that room.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
