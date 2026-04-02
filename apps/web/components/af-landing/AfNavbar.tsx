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
      <a href="#hero" className="nav-logo">
        YPIT <span>AF</span>
      </a>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#tracks">Tracks</a>
        <a href="#schedule">Schedule</a>
        <a href="#conference">Conference</a>
        <a href="#join">Join</a>
        <Link href="/register" className="nav-cta">
          Register Free
        </Link>
      </div>
    </nav>
  );
}
