import { Reveal } from './Reveal';

const WORKSHOPS = [
  {
    num: '01',
    title: 'Workshop title coming soon',
    desc: 'Details will be published shortly. Register your interest below to be notified when the full schedule drops.',
    date: 'April 2026',
    format: 'Online · All levels',
    lumaUrl: '#',
    accentColor: '#7E3BED',
  },
  {
    num: '02',
    title: 'Workshop title coming soon',
    desc: 'Details will be published shortly. Register your interest below to be notified when the full schedule drops.',
    date: 'May 2026',
    format: 'Online · All levels',
    lumaUrl: '#',
    accentColor: '#7E3BED',
  },
  {
    num: '03',
    title: 'Workshop title coming soon',
    desc: 'Details will be published shortly. Register your interest below to be notified when the full schedule drops.',
    date: 'May 2026',
    format: 'In-person · Lagos',
    lumaUrl: '#',
    accentColor: '#7E3BED',
  },
];

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
            <span className="workshops-headline-accent" style={{ color: '#7E3BED' }}>Feel free to leave with it.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="section-sub">
            Led by people living day-to-day as AI builders. Most are online. A few are in-person. All are free.
          </p>
        </Reveal>
        <div className="workshop-grid">
          {WORKSHOPS.map((ws, i) => (
            <Reveal key={ws.num} delay={0.1 + i * 0.08} className="workshop-card">
              <div className="workshop-num" style={{ color: ws.accentColor }}>{ws.num}</div>
              <h3>{ws.title}</h3>
              <p>{ws.desc}</p>
              <div className="workshop-footer">
                <div className="workshop-meta">
                  <span className="dot" style={{ background: ws.accentColor }} />
                  {ws.date} · {ws.format}
                </div>
                {ws.lumaUrl !== '#' ? (
                  <a href={ws.lumaUrl} target="_blank" rel="noopener noreferrer" className="workshop-luma-btn">
                    Sign up →
                  </a>
                ) : (
                  <span className="workshop-luma-btn workshop-luma-btn--soon">Details soon</span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
