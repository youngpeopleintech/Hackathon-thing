import Link from 'next/link';
import { Reveal } from './Reveal';

export function AfFooterCta() {
  return (
    <section id="footer-cta">
      <Reveal>
        <h2>
          Ready to be a part of
          <br />
          <span>Africa&apos;s future?</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p>The Artificial Future. Lagos. May 30 – June 13, 2026.</p>
      </Reveal>
      <Reveal delay={0.2} className="footer-cta-btns">
        <a href="https://luma.com/1zien2bm" target="_blank" rel="noopener noreferrer" className="btn-primary">
          Register for Free
        </a>
        <a href="#conference" className="btn-outline">
          Get Conference Tickets
        </a>
      </Reveal>
    </section>
  );
}
