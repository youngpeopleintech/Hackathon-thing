'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function AfNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <Link href="/#hero" className="nav-logo">
        <img src="/ypit-logo-white.png" alt="YPIT" height={36} width={90} style={{ objectFit: 'contain', width: 'auto' }} />
      </Link>
      <div className="nav-links">
        <Link href="/#about" className="nav-pill">
          About
        </Link>
        <Link href="/#highlights" className="nav-pill">
          Highlights
        </Link>
        <Link href="/#programme" className="nav-pill">
          Programme
        </Link>
        <Link href="/#workshops" className="nav-pill">
          Workshops
        </Link>
        <Link href="/#conference" className="nav-pill">
          Conference
        </Link>
        <Link href="/teams" className="nav-pill nav-keep">
          Teams
        </Link>
        <Link href="/#impact" className="nav-pill nav-cta">
          Impact report
        </Link>
        <a href="https://www.youngpeopleintech.com" target="_blank" rel="noopener noreferrer" className="nav-pill">
          About YPIT
        </a>
      </div>
    </nav>
  );
}
