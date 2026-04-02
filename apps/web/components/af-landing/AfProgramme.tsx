import { Reveal } from './Reveal';

export function AfProgramme() {
  return (
    <section id="programme" className="section section-cream">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">What&apos;s On</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">
            Three distinct experiences.
            <br />
            One connected programme.
          </h2>
        </Reveal>
        <div className="prog-grid">
          <Reveal delay={0.1} className="prog-card">
            <div className="prog-num">01</div>
            <h3>The Workshops</h3>
            <div className="prog-date">📚 April – June 6, 2026 · Free</div>
            <p>
              Practical sessions led by people building at the forefront of AI. Expand your view of what is possible —
              whether you are in the hackathon or just here to learn.
            </p>
            <a href="#workshops" className="prog-link">
              See Schedule →
            </a>
          </Reveal>
          <Reveal delay={0.2} className="prog-card">
            <div className="prog-num">02</div>
            <h3>The Hackathon</h3>
            <div className="prog-date">🛠 May 30 – June 6, 2026 · Free</div>
            <p>
              A full week to build something that did not exist before. Pick a challenge, build a team, and work on it
              with mentors you can actually talk to.
            </p>
            <a href="#tracks" className="prog-link">
              View Tracks →
            </a>
          </Reveal>
          <Reveal delay={0.3} className="prog-card">
            <div className="prog-num">03</div>
            <h3>The Conference</h3>
            <div className="prog-date">🎤 June 13, 2026 · Paid ticket</div>
            <p>
              A full day of talks, panels, and conversations with leading voices in AI from across Africa and beyond.
              Open to anyone — no hackathon participation required.
            </p>
            <a href="#conference" className="prog-link">
              Get Tickets →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
