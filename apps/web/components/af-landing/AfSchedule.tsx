import { Reveal } from './Reveal';

const ROWS = [
  { date: 'May 30', tag: 'Virtual + In-person', venue: 'Lagos, Nigeria', title: 'Opening Ceremony + Team Formation + Workshop', desc: 'Kick off at an amazing location, meet your team, and learn a few things together' },
  { date: 'May 31', tag: 'Virtual + In-person', venue: 'Lagos, Nigeria', title: 'Build Sprint + Workshops', desc: 'Focused building time with expert-led sessions to accelerate your prototype' },
  { date: 'June 1–4', tag: 'Virtual + In-person', venue: 'Lagos, Nigeria', title: 'Deep Build + Mentor Office Hours', desc: 'Heads-down building with structured mentorship. In-person collaboration sessions around Lagos.' },
  { date: 'June 5', tag: 'Virtual + In-person', venue: 'Lagos, Nigeria', title: 'Deep Build + More Workshops', desc: 'More time building and learning together before the final sprint' },
  { date: 'June 6', tag: 'Virtual + In-person', venue: 'Lagos, Nigeria', title: 'Final Sprint + Submissions + Closing Ceremony', desc: "Polish, prepare, and submit. We'll say goodbye until the conference." },
];

export function AfSchedule() {
  return (
    <section id="schedule" className="section section-cream">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">Week Schedule</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">
            A format that gives you
            <br />
            time to build something real.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="section-sub">Designed across two full weekends so you can go through the motions like real builders. Every session is available to join in person in Lagos or virtually — exact details will be provided to registered participants.</p>
        </Reveal>
        <Reveal delay={0.2} className="schedule-table">
          {ROWS.map((row) => (
            <div key={row.date} className="schedule-row">
              <div className="schedule-date">{row.date}</div>
              <div className="schedule-content">
                <div className="schedule-tag">{row.tag}</div>
                <div className="schedule-venue">{row.venue} <span className="schedule-venue-note">· Exact venue TBC</span></div>
                <h4>{row.title}</h4>
                <p>{row.desc}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
