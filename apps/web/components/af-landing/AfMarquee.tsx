const MARQUEE_ITEMS = [
  'Built for Africans',
  'Built by Africans',
  'Lagos, Nigeria',
  'Workshops',
  'Mentorships',
  'Venture Launchpad',
  'Full day Conference',
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
