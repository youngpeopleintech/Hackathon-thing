'use client';

import React from 'react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="af-reg-hero lg:h-full">
      <div className="af-reg-hero-bg" aria-hidden />
      <div className="af-reg-hero-grid" aria-hidden />
      <div className="af-reg-hero-orb" aria-hidden />

      <div className="af-reg-hero-inner">
        <Link href="/" className="af-reg-back">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to event
        </Link>

        <a
          href="https://www.youngpeopleintech.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-8 hover:opacity-80 transition-opacity"
        >
          <img src="/ypit-logo.png" alt="YPIT - Young People In Tech" className="h-11 md:h-12 w-auto mx-auto" />
        </a>

        <p className="af-reg-hero-eyebrow">Registration · YPIT AF 2026</p>

        <h1 className="af-reg-hero-title">
          The Artificial <span>Future.</span>
        </h1>

        <p className="af-reg-hero-tagline">
          Lagos, Nigeria · May 30 – June 13, 2026. Join the hackathon, workshops, and conference shaping how Africans
          build AI.
        </p>

        <div className="af-reg-hero-meta">
          <svg className="w-5 h-5 shrink-0 text-[var(--coral)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Lagos, Nigeria
        </div>
      </div>
    </div>
  );
}
