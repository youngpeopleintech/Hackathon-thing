import Link from 'next/link';
import { Reveal } from './Reveal';

function conferenceTicketHref() {
  const url = process.env.NEXT_PUBLIC_CONFERENCE_TICKET_URL;
  return url && url.length > 0 ? url : '#conference';
}

export function AfJoinPaths() {
  const ticketHref = conferenceTicketHref();

  return (
    <section id="join" className="section section-cream">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">How to Join</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">Three ways to get involved.</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="section-sub">Find the path that fits you — we hope one does, no matter who you are.</p>
        </Reveal>
        <div className="paths-grid">
          <Reveal delay={0.1} className="path-card">
            <div className="path-bg-num">1</div>
            <span className="path-badge free">Free</span>
            <h3>Hackathon + Workshops</h3>
            <ul className="path-steps">
              <li>
                <span className="step-num">01</span>Register using the form on this page
              </li>
              <li>
                <span className="step-num">02</span>Receive confirmation with everything you need
              </li>
              <li>
                <span className="step-num">03</span>Form or join a team, sign up for workshops, book mentors
              </li>
              <li>
                <span className="step-num">04</span>Show up May 30 with your laptop and curiosity
              </li>
            </ul>
            <Link href="/register" className="btn-primary" style={{ textAlign: 'center' }}>
              Register for the Hackathon →
            </Link>
          </Reveal>
          <Reveal delay={0.2} className="path-card">
            <div className="path-bg-num">2</div>
            <span className="path-badge free">Free</span>
            <h3>Workshops Only</h3>
            <ul className="path-steps">
              <li>
                <span className="step-num">01</span>Register using the link below
              </li>
              <li>
                <span className="step-num">02</span>You&apos;ll get redirected to YPIT&apos;s Luma page
              </li>
              <li>
                <span className="step-num">03</span>Sign up to all workshops that pique your interest
              </li>
              <li>
                <span className="step-num">04</span>Subscribe to the Luma calendar to receive updates
              </li>
            </ul>
            <a href="https://luma.com/YPITAFWORKSHOPS" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ textAlign: 'center', display: 'block' }}>
              Register for Workshops →
            </a>
          </Reveal>
          <Reveal delay={0.3} className="path-card">
            <div className="path-bg-num">3</div>
            <span className="path-badge paid">Paid</span>
            <h3>Conference Only</h3>
            <ul className="path-steps">
              <li>
                <span className="step-num">01</span>Purchase a conference ticket via the ticketing page
              </li>
              <li>
                <span className="step-num">02</span>Your ticket covers the full conference day on June 13
              </li>
              <li>
                <span className="step-num">03</span>No separate hackathon registration needed
              </li>
              <li>
                <span className="step-num">04</span>Show up at The Civic Centre, Lagos Island
              </li>
            </ul>
            <a href={ticketHref} className="btn-outline" style={{ textAlign: 'center', display: 'block' }}>
              Get Conference Tickets →
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.25}>
          <div className="path-info-grid">
            <div className="path-info-card">
              <h4>If you want to be here and you are willing to learn — you are in.</h4>
              <p>
                We are not trying to find the people who are already good at this. Students, developers, founders,
                researchers. Experts and total beginners. Some of the best things get built by people who had no idea
                what they were capable of on day one.
              </p>
            </div>
            <div className="path-info-card">
              <h4>You do not need a team to register.</h4>
              <p>
                Register solo and we will help you find teammates during the opening session. Teams are between 2 and 4
                people. The hackathon and workshops can be joined remotely from anywhere in the world.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
