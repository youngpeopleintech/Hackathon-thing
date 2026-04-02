const MARQUEE_ITEMS = [
  'Economic Access',
  'Local Language & Culture',
  'Education & Skill Building',
  'Healthcare Access',
  'Lagos Nigeria',
  'AI Hackathon',
  'We dey build the future',
  'Full Day Conference',
  'Demo & Showcase',
  'Launchpad',
];

export function AfMarquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track" id="marqueeTrack">
        {doubled.map((label, i) => (
          <span key={`${label}-${i}`} className="marquee-item">
            <span className="marquee-dot" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
