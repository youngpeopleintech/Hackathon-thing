import { Reveal } from './Reveal';

export function AfProgramme() {
  return (
    <section id="programme" className="section section-programme-bg">
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
          <Reveal delay={0.1} className="prog-card prog-card--workshops">
            <div className="prog-num">01</div>
            <h3>The Workshops</h3>
            <div className="prog-date">April – June 6, 2026 · <strong>Free</strong></div>
            <p>
              Practical sessions led by people building at the forefront of AI. They ran for people in the hackathon
              and for people who came to learn.
            </p>
            <a href="#workshops" className="prog-link">
              See the workshops →
            </a>
          </Reveal>
          <Reveal delay={0.2} className="prog-card prog-card--hackathon">
            <div className="prog-num">02</div>
            <h3>The Hackathon</h3>
            <div className="prog-date">May 30 – June 6, 2026 · <strong>Free</strong></div>
            <p>
              A full week to build something that did not exist before. Teams picked a challenge and worked on it with
              mentors they could actually talk to.
            </p>
            <a href="/teams" className="prog-link">
              See what teams built →
            </a>
          </Reveal>
          <Reveal delay={0.3} className="prog-card prog-card--conference">
            <div className="prog-num">03</div>
            <h3>The Conference</h3>
            <div className="prog-date">June 13, 2026 · <strong>Paid ticket</strong></div>
            <p>
              A full day of talks, panels, and conversations with leading voices in AI from across Africa and beyond.
              Open to anyone — hackathon participation was not required.
            </p>
            <a href="#conference" className="prog-link">
              See the day →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
