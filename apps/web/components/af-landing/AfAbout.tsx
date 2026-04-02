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
            A programme built to put young Africans at the centre of AI —
            <br />
            <span style={{ color: 'var(--coral)' }}>not as observers, but as builders.</span>
          </h2>
        </Reveal>
        <div className="about-grid">
          <Reveal delay={0.15} className="about-body">
            <p>
              There are a lot of young Africans paying close attention to AI right now. Curious people, ambitious
              people, people already trying to figure out where they fit. And there are not nearly enough spaces built
              to actually empower them.
            </p>
            <p>That is what The Artificial Future is trying to be.</p>
            <p>
              Over several weeks, you will take part in workshops that build real skills, collaborate with others in a
              live hackathon, and join a conference where Africa&apos;s most ambitious thinkers share what they are
              seeing and building. All of it is in Lagos. All of it is connected.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="callout">
              <h4>Open to everyone.</h4>
              <p>
                Students, developers, founders, researchers, and anyone genuinely curious about AI. You do not need to
                arrive as an expert. You just need to show up and try.
              </p>
            </div>
            <div className="callout gold">
              <h4>If you are curious but not sure where to start — you belong here.</h4>
              <p>
                And if you are already building, you belong here too — because when you put that person in the same
                room as the first two, something interesting tends to happen.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
