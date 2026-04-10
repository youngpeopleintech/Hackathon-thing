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
              The Artificial Future is trying to be a space that empowers these people. If this resonates, join us.
            </p>
            <p>
              Over several weeks, you will take part in workshops that build real skills, collaborate with others in a
              live hackathon, and join a conference where Africa&apos;s most ambitious thinkers share what they are
              seeing and building. Active participation involves learning, building, and exposure. All of it is connected.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="callout">
              <h4>Open to everyone.</h4>
              <p>
                Whether you are a student, a developer, a founder, a researcher, a policy maker, or an investor — you
                belong here. You do not need to arrive as an expert. We have found that since 2022, across every event
                we have run, the most interesting things happen when you put curious, ambitious people in the same room
                together. This is that room.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
