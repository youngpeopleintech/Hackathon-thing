import { Reveal } from './Reveal';

const WORKSHOPS = [
  {
    icon: '⚡',
    title: 'Building with AI APIs: From Zero to Working Prototype',
    desc: 'Get from zero to a functional AI-powered product. Covers OpenAI, Anthropic, and Gemini APIs — how to structure prompts and ship something real in a session.',
    dot: '#4ade80',
    meta: 'Online · All levels',
  },
  {
    icon: '📡',
    title: 'AI for the Last Mile: Designing for Low Connectivity',
    desc: 'Build AI products that actually work under Nigerian infrastructure constraints — intermittent connectivity, lower-end devices, multilingual users.',
    dot: 'var(--coral)',
    meta: 'In-person · Intermediate',
  },
  {
    icon: '🗣',
    title: 'Fine-Tuning with African Language Data',
    desc: 'Training models on thin Yoruba, Igbo, Hausa and Pidgin datasets — where to find them, how to build your own, and what\'s actually possible in a hackathon week.',
    dot: 'var(--coral)',
    meta: 'In-person · Track 02',
  },
  {
    icon: '🚀',
    title: 'From Hackathon to Product: What Happens After Demo Day',
    desc: 'What it takes to turn a hackathon project into something real. What investors look for, GTM in the Nigerian market, and what the Launchpad looks for.',
    dot: '#4ade80',
    meta: 'Online · All levels',
  },
  {
    icon: '⚖️',
    title: 'Responsible AI in African Contexts',
    desc: 'How AI bias manifests in African contexts and how to build with these risks in mind from day one. Practical not preachy — leaves you with a checklist.',
    dot: '#4ade80',
    meta: 'Online · All levels',
  },
];

export function AfWorkshops() {
  return (
    <section id="workshops" className="section section-white">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">Workshops</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">
            These workshops will expand your ambition.
            <br />
            <span style={{ color: 'var(--coral)' }}>Feel free to leave with it.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="section-sub">
            Led by people living day-to-day as AI builders. Most are online. A few are in-person. All are free.
          </p>
        </Reveal>
        <div className="workshop-grid">
          {WORKSHOPS.map((w, i) => (
            <Reveal key={w.title} delay={0.05 * (i + 1)} className="workshop-card">
              <div className="workshop-icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
              <div className="workshop-meta">
                <span className="dot" style={{ background: w.dot }} />
                {w.meta}
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.35} className="workshop-card soon">
            <div className="workshop-icon">+</div>
            <h3>More workshops coming soon</h3>
            <p>Full schedule published two weeks before the event. Register to be notified.</p>
            <div className="workshop-meta">
              <span className="dot" style={{ background: 'var(--coral)' }} />
              Register to stay updated
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
