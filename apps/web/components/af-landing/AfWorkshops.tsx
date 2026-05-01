'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Reveal } from './Reveal';

interface Workshop {
  num: string;
  title: string;
  speaker: string;
  bio: string[];
  desc: string;
  date: string;
  format: string;
  linkedIn: string;
  image: string;
  photoPosition?: string;
  lumaUrl: string;
}

const WORKSHOPS: Workshop[] = [
  {
    num: '01',
    title: 'AI at work: A PM\'s practical guide',
    speaker: 'Subomi Salami',
    bio: [
      'Subomi is a Senior Product Manager at Microsoft, where she works on building innovative AI-driven solutions that enhance user work experiences. She brings a unique blend of strategic thinking, user empathy, and execution to her work.',
      'Subomi is very passionate about technology, creativity, and helping others break into tech. She enjoys sharing insights on career transitions, product strategy, and AI\'s impact on the future of work.',
    ],
    desc: 'Subomi is a Senior PM at Microsoft AI and she\'s been figuring out, in real time, what it means to manage AI products and use AI to do her job better. In this session, she shares the honest account of that journey, including the tools she uses daily, the skills she\'s building, and how to think about evaluating AI output.',
    date: 'Thursday April 30th',
    format: 'Online · All levels',
    linkedIn: 'https://www.linkedin.com/in/subomisalami/',
    image: '/images/af/speakers/subomi-salami.jpg',
    lumaUrl: 'https://luma.com/ivjizaoi',
  },
  {
    num: '02',
    title: 'A Deep Dive into MCPs: What They Are, What They Unlock, and How to Use Them',
    speaker: 'Andrew Nduati',
    bio: [
      'Andrew is a Developer Relations engineer at Paystack, one of Africa\'s leading payment infrastructure companies. He works closely with developers and product teams to help bring their ideas to life — most recently shipping the Paystack MCP server, giving AI clients accurate, real-time access to Paystack\'s APIs.',
      'In his free time, he\'s either hiking or playing some chess.',
    ],
    desc: 'MCPs are one of the most important shifts happening in AI right now, and most people have no idea what they are. Andrew breaks it down using Paystack\'s MCP server as a live, real-world example, showing what MCPs unlock and how to think about building with them.',
    date: 'Wednesday May 6th',
    format: 'Online · All levels',
    linkedIn: 'https://www.linkedin.com/in/andrewnduati/',
    image: '/images/af/speakers/andrew-nduati.jpg',
    lumaUrl: '#',
  },
  {
    num: '03',
    title: 'The DIY Stack: Personalized Software in the Age of AI',
    speaker: 'Jeremiah Nnadi',
    bio: [
      'Jeremiah is the Product Lead at Octav, an AI & Data company modernizing how creative rights and royalties flow through the music industry.',
      'London-based, Jerry started out as a software engineer and moved into technical product roles at companies across multiple African countries, the US, and the UK, working in fintech, e-commerce, and venture capital. He sits comfortably in the middle ground between product, engineering, design, and data, and is borderline obsessed with technical tooling and creative problem-solving.',
      'Jerry is a multidisciplinary builder at heart, and loves exploring new ideas, trying out new tools, and especially talking about and teaching what he learns.',
    ],
    desc: 'In this session, I\'ll show how you can now design, prototype, test, integrate, and ship your own tools. The space is so matured that you can create software built for your goals, running on a stack you actually own and operate. Using a personal finance app I built (Kolo) as a case study, we\'ll walk through each stage of the build: turning an idea into a designed interface, a working prototype, tested code, real data integrations, and a maintained product (with AI at most steps). The goal isn\'t to teach you to build a finance app. It\'s to show what\'s possible when you stop outsourcing software to other people. You don\'t need a team, a big budget, or a traditional engineering background. All that\'s really essential is a problem you care about, a careful process, and a willingness to actually interact with technical workflows.',
    date: 'Thursday May 7th',
    format: 'Online · All levels',
    linkedIn: 'https://www.linkedin.com/in/jeremiahnnadi/',
    image: '/images/af/speakers/jeremiah-nnadi.jpg',
    lumaUrl: '#',
  },
  {
    num: '04',
    title: 'AI-assisted development: Principles for building in the age of AI',
    speaker: 'Nkechi',
    bio: [
      'Nkechi is a founding Product engineer building trust infrastructure for KYC and Digital ID at Vouchsafe. She\'s a host of Conversations with Technologists, where technologists gather to talk about what they\'re building and learning, and Build Sessions, one-day hackathons where builders take ideas into working products.',
      'Before tech, she spent her early career as an investment banker covering financial services and fintech companies.',
    ],
    desc: 'Before you jump into randomly prompting Claude or Lovable, you need to get your foundation right. This session gives you the framework for using AI to augment your ability to build — covering spec-driven development workflows, patterns for interacting with AI tools, and how to think about your role as a builder in the age of AI.',
    date: 'Thursday May 14th',
    format: 'Online · All levels',
    linkedIn: '#',
    image: '/images/af/speakers/nkechi.jpg',
    lumaUrl: '#',
  },
  {
    num: '05',
    title: 'Exploring Agents: How to build them safely — from infrastructure to impact',
    speaker: 'Bola Banjo',
    bio: [
      'Bola is an AI Engineer and founder of Cencori. Bola has been building AI products for years and realized early on that the infrastructure gap was killing builder productivity. His startup, Cencori, tackles that gap by handling the hard infrastructure work so builders can focus on agent logic. Security and scalability are his obsessions.',
    ],
    desc: 'Agents are the next frontier in AI but building them safely is hard. Bola walks through what makes agents powerful, what makes them risky, and how Cencori\'s infrastructure approach lets builders create safe, scalable agents without reinventing the wheel.',
    date: 'Thursday May 21st',
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
          style={{ objectFit: 'cover', objectPosition: ws.photoPosition ?? 'center 20%' }}
        />
        <div className="wc-bio-overlay">
          {ws.bio.map((para, i) => (
            <p key={i} className="wc-bio-text">{para}</p>
          ))}
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
