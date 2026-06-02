'use client';

import Image from 'next/image';
import { Reveal } from './Reveal';

interface Speaker {
  name: string;
  role: string;
  company: string;
  session: string;
  sessionType: string;
  bio: string[];
  image: string;
  linkedin?: string;
  twitter?: string;
  photoPosition?: string;
}

const SPEAKERS: Speaker[] = [
  {
    name: 'Ayomide Odunmakinde',
    role: 'Member of Technical Staff',
    company: 'Cohere',
    session: 'From Next Token Prediction to AI Agents',
    sessionType: 'Lecture',
    bio: [
      'Ayomide is a member of technical staff at Cohere where he is working on agents and reasoning models. He was previously a research scholar at Cohere Labs, contributing to advancing large language models — with his most recent work focusing on optimising the training of compact, high-performance multilingual models.',
      'He also has experience working on video and audio understanding. In his spare time, he plays a lot of video games.',
    ],
    image: '/images/af/speakers/ayomide-odunmakinde.jpg',
    linkedin: 'https://linkedin.com/in/ayoodumak',
    twitter: 'https://x.com/ayoodumakinde',
    photoPosition: 'center 15%',
  },
  {
    name: 'Sharon Ibejih',
    role: 'Senior Data Scientist & Founder',
    company: 'Tonative',
    session: 'The pillars of a functional AI ecosystem',
    sessionType: 'Panel',
    bio: [
      'Sharon is a Senior Data Scientist and researcher whose entire career has been oriented around a single problem: African languages are severely underrepresented in AI, and the data needed to fix that largely doesn\'t exist yet.',
      'She came up through Data Science Nigeria as a researcher and innovation engineer, was a Machine Learning Fellow at Sunbird AI in Uganda, and has worked as an ML engineer across several Nigerian tech companies. She founded Tonative to institutionalise the data curation work she\'d been doing in research contexts.',
    ],
    image: '/images/af/speakers/sharon-ibejih.png',
    linkedin: 'https://www.linkedin.com/in/sharonibejih/',
    photoPosition: 'center 15%',
  },
  {
    name: 'Temi Babs',
    role: 'Founder',
    company: 'SpitchAI',
    session: 'The pillars of a functional AI ecosystem',
    sessionType: 'Panel',
    bio: [
      'Temi is an engineer with a deep love for AI and an even deeper connection to language, with seven years in the AI space. He built Spitch — the ElevenLabs of Africa — after realising that the voice feature he needed didn\'t work because existing models couldn\'t handle African accents.',
      'SpitchAI pitched at AA3 (Iyinoluwa Aboyeji\'s fund demo day) and appeared at VivaTech in Paris.',
    ],
    image: '/images/af/speakers/temi-babs.jpeg',
    linkedin: 'https://www.linkedin.com/in/temi-babs/',
    photoPosition: 'center 15%',
  },
  {
    name: 'Loba Agboola',
    role: 'Digital Policy & Programmes Analyst',
    company: 'Federal Ministry of Innovation, Communication and Digital Economy',
    session: 'The pillars of a functional AI ecosystem',
    sessionType: 'Panel',
    bio: [
      'Loba is a development economist and technology policy practitioner whose research cuts across artificial intelligence, innovation, and digital public infrastructure in African countries. She has contributed directly to Nigeria\'s Child Online Protection Bill and the delivery of key digital public infrastructure.',
      'She is also a researcher at Advocacy for Policy and Innovation. Her work has been published in The Republic and The Cable, and she has contributed to flagship research including the AfreximBank African Trade & Economic Outlook 2026.',
    ],
    image: '/images/af/speakers/loba-agboola.jpeg',
    linkedin: 'https://www.linkedin.com/in/starloba/',
    photoPosition: 'center 15%',
  },
];

const GHOST_COUNT = 2;

export function AfSpeakers() {
  return (
    <section id="speakers" className="section section-white">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">Speakers & Mentors</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">
            We are putting together
            <br />
            an exceptional group of people.
          </h2>
        </Reveal>

        <div className="speakers-grid">
          {SPEAKERS.map((sp, i) => (
            <Reveal key={sp.name} delay={0.1 + i * 0.1}>
              <div className="speaker-card">
                <div className="speaker-photo-wrap">
                  <Image
                    src={sp.image}
                    alt={sp.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="speaker-photo"
                    style={{ objectFit: 'cover', objectPosition: sp.photoPosition ?? 'center top' }}
                  />
                  <div className="speaker-session-badge">{sp.sessionType}</div>
                </div>
                <div className="speaker-body">
                  <div className="speaker-meta">
                    <h3 className="speaker-name">{sp.name}</h3>
                    <p className="speaker-role">{sp.role} · <span>{sp.company}</span></p>
                  </div>
                  <p className="speaker-session-title">{sp.session}</p>
                  <div className="speaker-bio">
                    {sp.bio.map((para, j) => <p key={j}>{para}</p>)}
                  </div>
                  <div className="speaker-links">
                    {sp.linkedin && (
                      <a href={sp.linkedin} target="_blank" rel="noopener noreferrer" className="speaker-link">
                        LinkedIn
                      </a>
                    )}
                    {sp.twitter && (
                      <a href={sp.twitter} target="_blank" rel="noopener noreferrer" className="speaker-link">
                        X / Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Ghost placeholders for upcoming announcements */}
          {Array.from({ length: GHOST_COUNT }).map((_, i) => (
            <Reveal key={`ghost-${i}`} delay={0.2 + i * 0.06}>
              <div className="speaker-card speaker-card--ghost">
                <div className="speaker-photo-wrap ghost-photo" />
                <div className="speaker-body">
                  <div className="ghost-lines">
                    <div className="ghost-line-block wide" />
                    <div className="ghost-line-block medium" />
                    <div className="ghost-line-block short" style={{ marginTop: 16 }} />
                    <div className="ghost-line-block long" />
                  </div>
                  <p className="speaker-ghost-label">Announcing soon</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
