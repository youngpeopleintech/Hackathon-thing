import { Reveal } from './Reveal';

export function AfJoinPaths() {
  return (
    <section id="audiences" className="section section-cream">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">Who it was for</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">Builders, students, and the room around them.</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="section-sub">
            The programme had different ways in. This is what each of them included.
          </p>
        </Reveal>
        <div className="paths-grid">
          <Reveal delay={0.1} className="path-card">
            <div className="path-bg-num">1</div>
            <span className="path-badge free">Hackathon</span>
            <h3>Teams and builders</h3>
            <ul className="path-steps">
              <li>
                <span className="step-num">01</span>People registered solo, then formed teams of 2 to 4
              </li>
              <li>
                <span className="step-num">02</span>Opening session on May 30 was for team formation
              </li>
              <li>
                <span className="step-num">03</span>The build week included mentor office hours
              </li>
              <li>
                <span className="step-num">04</span>Teams could join from Lagos or remotely
              </li>
            </ul>
            <a href="#tracks" className="btn-primary" style={{ textAlign: 'center', display: 'block' }}>
              See the tracks →
            </a>
          </Reveal>
          <Reveal delay={0.2} className="path-card">
            <div className="path-bg-num">2</div>
            <span className="path-badge free">Students</span>
            <h3>Student builders and attendees</h3>
            <ul className="path-steps">
              <li>
                <span className="step-num">01</span>Students could join the hackathon with no prior AI experience
              </li>
              <li>
                <span className="step-num">02</span>A student conference pass asked for ID at the door
              </li>
              <li>
                <span className="step-num">03</span>Workshops stayed open whether or not you were on a team
              </li>
              <li>
                <span className="step-num">04</span>The point was a room lecturers do not usually put you in
              </li>
            </ul>
            <a href="#workshops" className="btn-outline" style={{ textAlign: 'center', display: 'block' }}>
              See the workshops →
            </a>
          </Reveal>
          <Reveal delay={0.3} className="path-card">
            <div className="path-bg-num">3</div>
            <span className="path-badge paid">Conference</span>
            <h3>Guests and investors</h3>
            <ul className="path-steps">
              <li>
                <span className="step-num">01</span>June 13 at The Civic Centre was a paid conference day
              </li>
              <li>
                <span className="step-num">02</span>General attendees did not need to have built anything
              </li>
              <li>
                <span className="step-num">03</span>Hackathon teams presented the work from the week
              </li>
              <li>
                <span className="step-num">04</span>Investor passes included the demo day and the mixer
              </li>
            </ul>
            <a href="#conference" className="btn-outline" style={{ textAlign: 'center', display: 'block' }}>
              See the conference →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
