'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Reveal } from './Reveal';

interface Mentor {
  name: string;
  role: string;
  company: string;
  areas: string[];
  bio: string;
  linkedin: string;
  image: string | null;
  photoPosition?: string;
}

const MENTORS: Mentor[] = [
  {
    name: 'Pearce Mutendera',
    role: 'Chief Technology Officer',
    company: 'Synergya.io',
    areas: ['Healthcare AI', 'Enterprise Architecture', 'AI Governance'],
    bio: 'Pearce is a digital health leader, enterprise architect, and AI practitioner with over 20 years of experience spanning clinical practice, national health systems, and frontier technology. He began his career as a nurse before transitioning into technology, and has advised governments and Ministries of Health across Africa — including Kenya, Nigeria, and Uganda — on national digital health architecture. He is Co-Founder and CTO of Synergya, and is completing an MSc in Global Healthcare Leadership at Oxford\'s Saïd Business School.',
    linkedin: 'https://www.linkedin.com/in/pearcemutendera/',
    image: '/images/af/speakers/pearce-mutendera.png',
    photoPosition: 'center 20%',
  },
  {
    name: 'Triumph Urias',
    role: 'AI Engineer & Consultant',
    company: '',
    areas: ['Generative AI', 'Agentic AI', 'RAG Systems'],
    bio: 'Triumph is an experienced AI and Machine Learning Engineer who architects and scales end-to-end AI systems for high-impact clients across Telecommunications, Oil & Gas, and Financial Services. He is particularly recognised for his work in Generative AI, developing sophisticated RAG systems and Agentic AI workflows to solve complex enterprise challenges.',
    linkedin: 'https://triumphurias.com',
    image: '/images/af/speakers/triumph-urias.jpg',
    photoPosition: 'center 20%',
  },
  {
    name: 'Adebusayo Adewunmi',
    role: 'AI System Architect, Team Lead Data & AI',
    company: 'Infinion Technologies',
    areas: ['Agentic AI', 'Fraud & Credit AI', 'LLM Applications', 'Systems Design'],
    bio: 'Adebusayo is an AI engineer, systems architect, and startup CTO with experience building AI solutions across fintech, digital banking, fraud detection, and conversational AI. He was part of the team that led the core AI system behind WEMA ALAT 2.0, and has worked across Tier-1 financial institutions including Zenith Bank and Stanbic IBTC. He is also Co-Founder and CTO of Chatter, an AI-powered discovery and intelligence platform.',
    linkedin: 'https://www.linkedin.com/in/adebusayoadewunmi',
    image: '/images/af/speakers/adebusayo-adewunmi.jpg',
    photoPosition: 'center 20%',
  },
  {
    name: 'Oluwadarasimi Olowookere',
    role: 'ML Research Engineer',
    company: 'Intron Health',
    areas: ['Speech AI', 'Deep Learning', 'ML Inference', 'African Language Models'],
    bio: 'Oluwadarasimi is a Machine Learning Research Scientist focused on speech AI, model efficiency, and low-resource African language technologies. Her work spans multilingual ASR/TTS systems, LLM inference optimisation, and GPU kernel programming with PyTorch and Triton. She is passionate about building AI systems that are efficient, accessible, and relevant to African contexts.',
    linkedin: 'https://www.linkedin.com/in/oluwadarasimi/',
    image: '/images/af/speakers/darasimi-olowookere.jpeg',
    photoPosition: 'center 15%',
  },
  {
    name: 'Aaron Sotunde-Adesina',
    role: 'Co-founder & Business Lead',
    company: 'Quonos',
    areas: ['Product Building', 'AI Agents', 'Business & Strategy', 'Fintech'],
    bio: 'Aaron is an operator with over seven years of experience building and scaling technology businesses across Africa, working across fintech, infrastructure, and platform products. He is Co-founder at Quonos, a product studio that takes ideas from early concept to scalable software, and leads R&D at Sycamore.ng. He previously founded Zoropay, a tuition finance platform that disbursed over $500,000 to underserved students.',
    linkedin: 'https://www.linkedin.com/in/aaron-sotunde-adesina-09330416a/',
    image: '/images/af/speakers/aaron-sotunde-adesina.png',
    photoPosition: 'center 20%',
  },
  {
    name: 'Ubio Obu',
    role: 'CEO & AI Lead',
    company: 'Remostart AI Labs',
    areas: ['AI Research', 'Blockchain & AI', 'Ventures', 'IoT'],
    bio: 'Ubio is an AI and Blockchain researcher with an academic background in Artificial Intelligence and around 5 years of experience across AI, IoT, agriculture, and human behaviour. He has approximately 7 research publications in journals including the American Institute of Physics and IEEE, holds 2 patents under application, and authored "Research Writing for Beginners". He is a Microsoft Winsider Recipient, KECTIL Leadership Fellow, and SingularityNet Ambassador.',
    linkedin: 'https://www.linkedin.com/in/ubio-obu-71927276/',
    image: '/images/af/speakers/ubio-obu.jpeg',
    photoPosition: 'center 15%',
  },
  {
    name: 'Odunola Jenrola',
    role: 'AI Engineer',
    company: 'Awarri',
    areas: ['Audio & Speech AI', 'African Language Models', 'Machine Learning', 'Real-time Inference'],
    bio: 'Odunola is a Machine Learning Engineer specialising in audio and multimodal AI systems, with a particular focus on African languages. At Awarri in Lagos, he builds fast, low-latency streaming speech models and real-time inference systems for African language applications. Previously, as a Founding ML Researcher at Spitch, he worked on automatic speech recognition and speech-language models. He holds a First Class Honours degree in Electrical and Electronics Engineering from the University of Ibadan.',
    linkedin: 'https://www.linkedin.com/in/odunolaoluwa-jenrola',
    image: '/images/af/speakers/odunola-jenrola.jpeg',
    photoPosition: 'center 15%',
  },
  {
    name: 'Nkechi Anyanwu',
    role: 'Product Engineer',
    company: 'Vouchsafe',
    areas: ['Software Engineering', 'AI-assisted Building', 'Fintech'],
    bio: 'Nkechi is a founding Product Engineer building trust infrastructure for KYC and Digital ID at Vouchsafe. She is a host of Conversations with Technologists, where technologists gather to talk about what they\'re building and learning, and Build Sessions, one-day hackathons where builders take ideas into working products. Before tech, she spent her early career as an investment banker covering financial services and fintech companies.',
    linkedin: 'https://www.linkedin.com/in/nkechianyanwu/',
    image: '/images/af/speakers/nkechi-anyanwu.jpg',
    photoPosition: 'center 20%',
  },
  {
    name: 'Abisola Aderohunmu',
    role: 'AI Product Manager',
    company: 'Heala Tech',
    areas: ['AI Product Strategy', 'Product Building', 'Healthtech', 'MVP Scoping'],
    bio: 'Abisola is an award-winning AI Product Manager, speaker, and thought leader specialising in AI, product strategy, and digital innovation. With experience across fintech, HRTech, and healthtech, she builds scalable, user-centric products powered by data and intelligent systems. At Heala Tech, she leads product innovation across a connected digital health ecosystem, using AI and automation to improve healthcare access across Africa. She has guided hundreds of aspiring and mid-level product managers through mentorship and practical frameworks.',
    linkedin: 'https://www.linkedin.com/in/abisola-r-a-4316b6144',
    image: '/images/af/speakers/abisola-aderohunmu.jpg',
    photoPosition: 'center 20%',
  },
  {
    name: 'Lolade Ilori',
    role: 'Frontend Engineer',
    company: 'African Fintech Foundry',
    areas: ['Frontend Engineering', 'React & Next.js', 'TypeScript', 'Web Accessibility'],
    bio: 'Lolade is a Frontend Engineer with over 5 years of experience building user-centric web applications using React, Next.js, and TypeScript. At African Fintech Foundry, he works on scalable, accessible frontend systems. He\'s passionate about building software that genuinely meets user needs and brings a collaborative, solution-oriented mindset to every team he\'s part of.',
    linkedin: 'https://www.linkedin.com/in/lolade-ilori/',
    image: '/images/af/speakers/lolade-ilori.jpeg',
    photoPosition: 'center 20%',
  },
  {
    name: 'Bunmi Akinremi',
    role: 'AI/ML Engineer & Lecturer',
    company: 'Pan Atlantic University',
    areas: ['AI Engineering', 'ML Deployment', 'Speech AI', 'Research'],
    bio: 'Bunmi thrives at the intersection of research and engineering, where rigorous experimentation meets scalable systems. From deploying production-grade ML pipelines, to building fact-checking platforms with LLMs, to developing the next generation of African ML researchers at Deep Learning Indaba — her work consistently turns ideas into solutions that matter.',
    linkedin: 'https://www.linkedin.com/in/bunmi-akinremi',
    image: '/images/af/speakers/bunmi-akinremi.jpeg',
    photoPosition: 'center 20%',
  },
  {
    name: 'Ojurereoluwa Daniel Oreofe',
    role: 'Co-founder',
    company: 'Cencori',
    areas: ['Product Strategy', 'AI Integration', 'Go-to-Market', 'Growth'],
    bio: 'Daniel is Co-Founder of Cencori, a product and growth leader working across AI, fintech, and healthtech. He speaks on AI adoption, building in Africa, and the gap between strategy and execution. He has six years of experience helping teams move from clarity to building — his mentoring style is less about giving answers and more about asking the question that makes the answer obvious.',
    linkedin: 'https://www.linkedin.com/in/thedanieloreofe',
    image: '/images/af/speakers/oreofe-daniel.jpg',
    photoPosition: 'center 20%',
  },
];

function isHoverDevice(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function MentorCard({ mentor }: { mentor: Mentor }) {
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
    <div className="mentor-card">
      {/* Photo with bio overlay on hover */}
      <div
        className={`mentor-photo-wrap${isBioOpen ? ' bio-open' : ''}`}
        onMouseEnter={handlePhotoEnter}
        onMouseLeave={handlePhotoLeave}
        onClick={handlePhotoClick}
      >
        {mentor.image ? (
          <Image
            src={mentor.image}
            alt={mentor.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ objectFit: 'cover', objectPosition: mentor.photoPosition ?? 'center top' }}
          />
        ) : (
          <div className="mentor-placeholder">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="18" r="9" fill="currentColor" opacity="0.25" />
              <path d="M6 42c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
            </svg>
          </div>
        )}
        <div className="mentor-bio-overlay">
          <p className="mentor-bio-text">{mentor.bio}</p>
        </div>
      </div>

      {/* Card body — always visible */}
      <div className="mentor-body">
        <div>
          <h3 className="mentor-name">{mentor.name}</h3>
          <p className="mentor-role">
            {mentor.role}
            {mentor.company ? <> · <span className="mentor-company">{mentor.company}</span></> : null}
          </p>
        </div>
        <div className="mentor-areas">
          {mentor.areas.map(a => <span key={a} className="mentor-area-tag">{a}</span>)}
        </div>
        <a
          href={mentor.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mentor-link"
          onClick={e => e.stopPropagation()}
        >
          {mentor.linkedin.includes('linkedin.com') ? 'LinkedIn' : 'Website'}
        </a>
      </div>
    </div>
  );
}

export function AfMentors() {
  return (
    <section id="mentors" className="section section-cream">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">Mentors</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">
            People in your corner
            <br />
            <span style={{ color: 'var(--coral)' }}>for the full two weeks.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="section-sub">
            Our mentors bring real-world experience across AI engineering, product, research, and business.
            They&apos;re here to help you think clearly, build faster, and go further.
          </p>
        </Reveal>
        <div className="mentor-grid">
          {MENTORS.map((m, i) => (
            <Reveal key={m.name} delay={0.1 + i * 0.07}>
              <MentorCard mentor={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
