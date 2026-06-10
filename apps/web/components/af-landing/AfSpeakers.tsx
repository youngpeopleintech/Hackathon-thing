'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
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
  photoScale?: number;
}

const SPEAKERS: Speaker[] = [
  {
    name: 'Dr Olumide Okubadejo',
    role: 'AI Consultant & Visiting Professor',
    company: 'ESIEE Paris',
    session: 'The State of AI in Africa',
    sessionType: 'Keynote',
    bio: [
      'Dr Olumide Okubadejo is an AI consultant with over a decade of experience building and deploying AI systems across Africa, Europe, and the US. He holds a Master\'s and PhD in Artificial Intelligence from the UK and France, and a Master\'s in Strategy and Innovation. He has led AI teams at Spotify in Paris, Butlr in San Francisco, and Sabi, where he headed Product, Data and AI.',
      'He builds AI-native software for African organisations and leads work on agentic AI infrastructure across multiple companies on the continent. He is a visiting professor at ESIEE Paris, part of the Ventures Platform Expert Network, and a core member of the UNDP AI Working Group.',
    ],
    image: '/images/af/speakers/olumide-okubadejo.png',
    linkedin: 'https://www.linkedin.com/in/olumide-okubadejo/',
    photoPosition: 'center 15%',
  },
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
    name: 'Dapo Awobokun',
    role: 'Head of SSA',
    company: 'LuaAI',
    session: 'The pillars of a functional AI ecosystem',
    sessionType: 'Panel',
    bio: [
      'Dapo has spent nearly a decade at the heart of the African tech ecosystem. He began his career at an Engineering and Procurement services firm before transitioning into tech, where he partnered with entrepreneurs at Co-Creation Hub, Nigeria\'s foremost tech incubation hub.',
      'After a stint supporting go-to-market efforts for companies in San Francisco, Dapo joined Paystack in 2018 — two years before its landmark acquisition by Stripe. Over eight years, he managed key customer relationships, ran startup programs, and connected founders with ecosystem support across the continent.',
    ],
    image: '/images/af/speakers/dapo-awobokun.jpeg',
    linkedin: 'https://www.linkedin.com/in/dapoawobokun/',
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
  {
    name: 'Sulaiman Adewale',
    role: 'Founder & CEO',
    company: 'Xava Technologies (Xara AI)',
    session: 'The realities of building AI businesses for Africans',
    sessionType: 'Fireside Chat',
    bio: [
      'Sulaiman is the Founder and CEO of Xava Technologies and creator of Xara AI — Africa\'s first conversational banking assistant built entirely inside WhatsApp. A self-taught engineer coding since 2010, he built Xara after finding everyday banking needlessly hard as someone with impaired vision.',
      'Launched in June 2025, Xara now serves over 50,000 users and has processed more than ₦12 billion in transactions. His edge is radical simplicity: meeting users where they already are, in English, Pidgin, Hausa, and Yoruba.',
    ],
    image: '/images/af/speakers/sulaiman-adewale.jpeg',
    linkedin: 'https://www.linkedin.com/in/sulaiman-adewale-638112145/',
    photoPosition: 'center 20%',
    photoScale: 1.5,
  },
  {
    name: 'Elisha Odemakinde',
    role: 'CTO & Founder',
    company: 'BimpeAI',
    session: 'The realities of building AI businesses for Africans',
    sessionType: 'Fireside Chat',
    bio: [
      'Elisha is an AI startup founder, technical lead, and ecosystem builder specialising in LLMs, HCI, and computer vision. He founded and led prominent AI communities in Nigeria, contributed to a national-scale computer vision curriculum (3MTT), and founded Rectlabs Inc. — an enterprise AI company with globally recognised products.',
      'He is a key leader in the Nigeria AI Collective, driving national policy, talent development, and ethical AI governance. His work spans sports, commerce, healthcare, and hospitality.',
    ],
    image: '/images/af/speakers/elisha-odemakinde.png',
    linkedin: 'https://www.linkedin.com/in/elisha-odemakinde-366705150/',
    photoPosition: 'center 15%',
  },
  {
    name: 'Ubio Obu',
    role: 'CEO & AI Lead',
    company: 'Remostart AI Labs',
    session: 'The realities of building AI businesses for Africans',
    sessionType: 'Fireside Chat',
    bio: [
      'Ubio is an AI and Blockchain researcher with an academic background in Artificial Intelligence and around 5 years of experience across AI, IoT, agriculture, and human behaviour. He has approximately 7 research publications in journals including the American Institute of Physics and IEEE, holds 2 patents under application, and authored "Research Writing for Beginners".',
      'He is a Microsoft Winsider Recipient, KECTIL Leadership Fellow, and SingularityNet Ambassador.',
    ],
    image: '/images/af/speakers/ubio-obu.jpeg',
    linkedin: 'https://www.linkedin.com/in/ubio-obu-71927276/',
    photoPosition: 'center 15%',
  },
  {
    name: 'Gbenga Agoye',
    role: 'Investment & Portfolio Manager',
    company: 'Co-creation Hub (CCHub)',
    session: "Investing in Africa's AI Future",
    sessionType: 'Fireside Chat',
    bio: [
      'Gbenga is an investment and ecosystem development professional with over eight years of experience supporting high-growth startups and deploying capital across Africa. He has led and supported the deployment of more than $10 million in equity and non-equity funding, working with over 100 startups across fintech, healthtech, edtech, logistics, and the creative economy.',
      'He works at the intersection of venture capital, startup growth, and ecosystem building — and is particularly focused on the transformative role of AI in driving inclusive growth across the continent.',
    ],
    image: '/images/af/speakers/gbenga-agoye.png',
    linkedin: 'https://www.linkedin.com/in/gbengagoye/',
    photoPosition: 'center 15%',
  },
];

const SESSION_GROUPS = [
  {
    label: 'Keynote Speech & Lecture',
    sessions: ['The State of AI in Africa', 'From Next Token Prediction to AI Agents'],
    ghosts: 0,
  },
  {
    label: 'Keynote Panel · The pillars of a functional AI ecosystem',
    sessions: ['The pillars of a functional AI ecosystem'],
    ghosts: 0,
  },
  {
    label: 'Fireside Chat · The realities of building AI businesses for Africans',
    sessions: ['The realities of building AI businesses for Africans'],
    ghosts: 0,
  },
  {
    label: "Fireside Chat · Investing in Africa's AI Future",
    sessions: ["Investing in Africa's AI Future"],
    ghosts: 1,
  },
];

function isHoverDevice(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function SpeakerCard({ sp }: { sp: Speaker }) {
  const [isBioOpen, setIsBioOpen] = useState(false);

  const handlePhotoEnter = useCallback(() => {
    if (isHoverDevice()) setIsBioOpen(true);
  }, []);

  const handlePhotoLeave = useCallback(() => {
    if (isHoverDevice()) setIsBioOpen(false);
  }, []);

  const handlePhotoClick = useCallback(() => {
    if (!isHoverDevice()) setIsBioOpen(prev => !prev);
  }, []);

  return (
    <div className="speaker-card">
      <div
        className={`speaker-photo-wrap${isBioOpen ? ' bio-open' : ''}`}
        onMouseEnter={handlePhotoEnter}
        onMouseLeave={handlePhotoLeave}
        onClick={handlePhotoClick}
      >
        <Image
          src={sp.image}
          alt={sp.name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="speaker-photo"
          style={{ objectFit: 'cover', objectPosition: sp.photoPosition ?? 'center top', transform: sp.photoScale ? `scale(${sp.photoScale})` : undefined }}
        />
        <div className="speaker-session-badge">{sp.sessionType}</div>
        <div className="speaker-bio-overlay">
          {sp.bio.map((para, j) => (
            <p key={j} className="speaker-bio-text">{para}</p>
          ))}
        </div>
      </div>
      <div className="speaker-body">
        <div className="speaker-meta">
          <h3 className="speaker-name">{sp.name}</h3>
          <p className="speaker-role">{sp.role} · <span>{sp.company}</span></p>
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
  );
}

function GhostCard() {
  return (
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
  );
}

export function AfSpeakers() {
  return (
    <section id="speakers" className="section section-white">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">Speakers</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">
            We are putting together
            <br />
            an exceptional group of people.
          </h2>
        </Reveal>

        {SESSION_GROUPS.map((group) => {
          const groupSpeakers = SPEAKERS.filter(sp => group.sessions.includes(sp.session));
          if (groupSpeakers.length === 0 && group.ghosts === 0) return null;

          return (
            <div key={group.label} className="speaker-group">
              <Reveal>
                <div className="speaker-group-label">{group.label}</div>
              </Reveal>
              <div className="speakers-grid">
                {groupSpeakers.map((sp, i) => (
                  <Reveal key={sp.name} delay={0.1 + i * 0.08}>
                    <SpeakerCard sp={sp} />
                  </Reveal>
                ))}
                {Array.from({ length: group.ghosts }).map((_, i) => (
                  <Reveal key={`ghost-${group.label}-${i}`} delay={0.2 + i * 0.06}>
                    <GhostCard />
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
