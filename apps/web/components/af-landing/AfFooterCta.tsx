import { Reveal } from './Reveal';

export function AfFooterCta() {
  return (
    <section id="footer-cta">
      <Reveal>
        <h2>
          Be in the room on
          <br />
          <span>June 13.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p>The Artificial Future Conference. The Civic Centre, Lagos Island.</p>
      </Reveal>
      <Reveal delay={0.2} className="footer-cta-btns">
        <a href="https://eventornigeria.com/explore/ypit-af" target="_blank" rel="noopener noreferrer" className="btn-primary">
          Get Conference Tickets
        </a>
      </Reveal>
    </section>
  );
}
