import { Reveal } from './Reveal';

export function AfFooterCta() {
  return (
    <section id="footer-cta">
      <Reveal>
        <h2>
          Want the record of
          <br />
          <span>what happened?</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p>The Artificial Future. Lagos. May 30 – June 13, 2026.</p>
      </Reveal>
      <Reveal delay={0.2} className="footer-cta-btns">
        <a href="#impact" className="btn-primary">
          Get the impact report
        </a>
        <a href="#highlights" className="btn-outline">
          See the highlights
        </a>
      </Reveal>
    </section>
  );
}
