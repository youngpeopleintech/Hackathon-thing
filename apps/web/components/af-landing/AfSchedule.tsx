import { Reveal } from './Reveal';

const ROWS = [
  { date: 'Sat, May 30', tag: 'In-person', venue: 'Access Towers', title: 'Opening Ceremony + Team Formation', desc: 'Kick off, meet your team, and get building.', requirements: 'Bring a valid ID card. Be ready to provide your name and phone number by Wednesday May 27th.' },
  { date: 'Sun, May 31', tag: 'In-person', venue: 'Cafe One, Ikeja', title: 'Build Sprint', desc: 'Focused building time to get your prototype off the ground.', requirements: 'Download the Cafe One app, get onboarded on the YPIT Channel, and pay a 50% discounted workspace rate of ₦3,000 (excl. VAT).' },
  { date: 'Tue, June 2', tag: 'In-person', venue: 'CcHub, Lekki Phase 1', title: 'Build Week & Mentor Sessions', desc: 'Heads-down building with structured mentor support.', requirements: 'Provide your name at entry.' },
  { date: 'Wed, June 3', tag: 'In-person', venue: 'Paystack Office, Ikeja · Cafe One', title: 'Build Week & Mentor Sessions', desc: 'Keep building. Mentors are on hand.', requirements: 'Just show up and build.' },
  { date: 'Fri, June 5', tag: 'In-person', venue: 'CcHub', title: 'Deep Build', desc: 'The final push before closing. Make it count.' },
  { date: 'Sat, June 6', tag: 'In-person', venue: 'Paystack Office, Ikeja', title: 'Closing Ceremony', desc: "We wrap up the build week together and look ahead to Demo Day." },
  { date: 'Sun, June 7', tag: 'Online', venue: 'Online', title: 'Submissions', desc: 'Final submissions due. Polish your project and send it in.' },
  { date: 'Fri, June 13', tag: 'In-person', venue: 'The Civic Centre, Lagos Island', title: 'Demo Day & Conference', desc: 'Top teams present live. Awards, panels, and the full Artificial Future Conference.' },
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
          <p className="section-sub">Designed across two full weekends so you can go through the motions like real builders. In-person sessions take place across Lagos — exact requirements for each day are listed below.</p>
        </Reveal>
        <Reveal delay={0.2} className="schedule-table">
          {ROWS.map((row) => (
            <div key={row.date} className="schedule-row">
              <div className="schedule-date">{row.date}</div>
              <div className="schedule-content">
                <div className="schedule-tag">{row.tag}</div>
                <div className="schedule-venue">{row.venue}</div>
                <h4>{row.title}</h4>
                <p>{row.desc}</p>
                {row.requirements && (
                  <p className="schedule-requirements">{row.requirements}</p>
                )}
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.25} className="section-cta">
          <a href="https://luma.com/1zien2bm" target="_blank" rel="noopener noreferrer" className="btn-primary">Register for the Hackathon →</a>
        </Reveal>
      </div>
    </section>
  );
}
