'use client';

import Image from 'next/image';
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
        <Image src="/ypit-logo-white.png" alt="YPIT" height={36} width={90} style={{ objectFit: 'contain', width: 'auto' }} />
      </a>
      <div className="nav-links">
        <a href="#about" className="nav-pill">
          About
        </a>
        <a href="#tracks" className="nav-pill">
          Hackathon
        </a>
        <a href="#workshops" className="nav-pill">
          Workshops
        </a>
        <a href="#conference" className="nav-pill">
          Conference
        </a>
        <a href="#join" className="nav-pill nav-cta">
          Join Us
        </a>
        <a href="https://www.youngpeopleintech.com" target="_blank" rel="noopener noreferrer" className="nav-pill">
          About YPIT
        </a>
      </div>
    </nav>
  );
}
