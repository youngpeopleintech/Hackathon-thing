import Link from 'next/link';
import { Reveal } from './Reveal';

export function AfFooterCta() {
  return (
    <section id="footer-cta">
      <Reveal>
        <h2>
          Ready to be part of
          <br />
          <span>Nigeria&apos;s AI future?</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p>The Artificial Future. Lagos. May 30 – June 13, 2026.</p>
      </Reveal>
      <Reveal delay={0.2} className="footer-cta-btns">
        <Link href="/register" className="btn-primary">
          Register for Free
        </Link>
        <a href="#conference" className="btn-outline">
          Get Conference Tickets
        </a>
      </Reveal>
    </section>
  );
}
