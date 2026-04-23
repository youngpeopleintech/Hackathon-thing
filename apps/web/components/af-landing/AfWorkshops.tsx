'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Reveal } from './Reveal';

interface Workshop {
  num: string;
  title: string;
  speaker: string;
  bio: string;
  desc: string;
  date: string;
  format: string;
  linkedIn: string;
  image: string;
  lumaUrl: string;
}

const WORKSHOPS: Workshop[] = [
  {
    num: '01',
    title: 'AI at Work: A PM\'s Practical Guide',
    speaker: 'Subomi Salami',
    bio: 'Senior AI PM at Microsoft AI. Previously Meta and Bumble. Based in London.',
    desc: 'An honest account of managing AI products day-to-day — the tools Subomi uses, how she evaluates AI output, and the skills she\'s actively building.',
    date: 'Thu 30 Apr',
    format: 'Online · All levels',
    linkedIn: 'https://www.linkedin.com/in/subomisalami/',
    image: '/images/af/speakers/subomi-salami.jpg',
    lumaUrl: '#',
  },
  {
    num: '02',
    title: 'A Deep Dive into MCPs',
    speaker: 'Andrew Nduati',
    bio: 'Developer Relations at Paystack. Shipped the Paystack MCP server.',
    desc: 'MCPs demystified — what they are, how they work, and a live walkthrough using the Paystack MCP server as the example.',
    date: 'Wed 6 May',
    format: 'Online · All levels',
    linkedIn: 'https://www.linkedin.com/in/andrewnduati/',
    image: '/images/af/speakers/andrew-nduati.jpg',
    lumaUrl: '#',
  },
  {
    num: '03',
    title: 'The DIY Stack',
    speaker: 'Jeremiah Nnadi',
    bio: 'Product Lead at Octav. London-based multidisciplinary builder.',
    desc: 'Using Kolo — his personal finance app — as a live case study in building with AI tools without a traditional engineering team.',
    date: 'Thu 7 May',
    format: 'Online · All levels',
    linkedIn: 'https://www.linkedin.com/in/jeremiahnnadi/',
    image: '/images/af/speakers/jeremiah-nnadi.jpg',
    lumaUrl: '#',
  },
  {
    num: '04',
    title: 'Exploring Agents',
    speaker: 'Bola Banjo',
    bio: 'AI Engineer and founder of Cencori. Focused on security and scalability.',
    desc: 'What makes agents genuinely powerful — and genuinely risky. A look at how Cencori approaches agent infrastructure.',
    date: 'Thu 21 May',
    format: 'Online · All levels',
    linkedIn: 'https://www.linkedin.com/in/bolaabanjo/',
    image: '/images/af/speakers/bola-banjo.jpg',
    lumaUrl: '#',
  },
];

function isHoverDevice(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

interface WorkshopCardProps {
  ws: Workshop;
  index: number;
}

function WorkshopCard({ ws, index }: WorkshopCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBioOpen, setIsBioOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardEnter = useCallback(() => {
    if (isHoverDevice()) setIsExpanded(true);
  }, []);

  const handleCardLeave = useCallback(() => {
    if (isHoverDevice()) {
      setIsExpanded(false);
      setIsBioOpen(false);
    }
  }, []);

  const handleCardClick = useCallback(() => {
    if (!isHoverDevice()) setIsExpanded(prev => !prev);
  }, []);

  const handlePhotoEnter = useCallback(() => {
    if (isHoverDevice()) setIsBioOpen(true);
  }, []);

  const handlePhotoLeave = useCallback(() => {
    if (isHoverDevice()) setIsBioOpen(false);
  }, []);

  const handlePhotoClick = useCallback((e: React.MouseEvent) => {
    if (!isHoverDevice()) {
      e.stopPropagation();
      setIsBioOpen(prev => !prev);
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`workshop-card-v2${isExpanded ? ' is-expanded' : ''}`}
      style={{ '--bounce-delay': `${index * 0.12}s` } as React.CSSProperties}
      onMouseEnter={handleCardEnter}
      onMouseLeave={handleCardLeave}
      onClick={handleCardClick}
    >
      {/* Photo + bio overlay */}
      <div
        className={`wc-photo-wrap${isBioOpen ? ' bio-open' : ''}`}
        onMouseEnter={handlePhotoEnter}
        onMouseLeave={handlePhotoLeave}
        onClick={handlePhotoClick}
      >
        <Image
          src={ws.image}
          alt={ws.speaker}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="wc-photo"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
        />
        <div className="wc-bio-overlay">
          <p className="wc-bio-text">{ws.bio}</p>
          <a
            href={ws.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="wc-linkedin-btn"
            onClick={e => e.stopPropagation()}
          >
            LinkedIn →
          </a>
        </div>
      </div>

      {/* Card body */}
      <div className="wc-body">
        <div className="wc-num" style={{ color: '#7E3BED' }}>{ws.num}</div>
        <h3 className="wc-title">{ws.title}</h3>
        <p className="wc-speaker">{ws.speaker}</p>

        {/* Expandable description */}
        <div className="wc-desc-wrap">
          <p className="wc-desc">{ws.desc}</p>
        </div>

        <div className="wc-footer">
          <div className="workshop-meta">
            <span className="dot" style={{ background: '#7E3BED' }} />
            {ws.date} · {ws.format}
          </div>
          {ws.lumaUrl !== '#' ? (
            <a
              href={ws.lumaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="workshop-luma-btn"
              onClick={e => e.stopPropagation()}
            >
              Sign up →
            </a>
          ) : (
            <span className="workshop-luma-btn workshop-luma-btn--soon">Details soon</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function AfWorkshops() {
  return (
    <section id="workshops" className="section section-workshops-bg">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">Workshops</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">
            These workshops will expand your ambition.
            <br />
            <span style={{ color: '#7E3BED' }}>Feel free to leave with it.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="section-sub">
            Led by people living day-to-day as AI builders. Online. Free.
          </p>
        </Reveal>

        <div className="workshop-grid-v2">
          {WORKSHOPS.map((ws, i) => (
            <Reveal key={ws.num} delay={0.1 + i * 0.08}>
              <WorkshopCard ws={ws} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
