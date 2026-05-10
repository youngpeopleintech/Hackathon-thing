'use client';

import { useCallback, useEffect, useRef } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FADE_SIZE = 80; // px of fade at each edge

export function AfManifestoOverlay({ isOpen, onClose }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Scroll-driven edge fades via mask-image
  const updateMask = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const atTop = scrollTop < 2;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 2;
    const topStop = atTop ? '0%' : `${FADE_SIZE}px`;
    const bottomStop = atBottom ? '100%' : `calc(100% - ${FADE_SIZE}px)`;
    el.style.maskImage = `linear-gradient(to bottom, transparent 0%, black ${topStop}, black ${bottomStop}, transparent 100%)`;
    el.style.webkitMaskImage = el.style.maskImage;
  }, []);

  // Reset scroll position and mask when overlay opens
  useEffect(() => {
    if (isOpen) {
      const el = scrollRef.current;
      if (el) { el.scrollTop = 0; updateMask(); }
    }
  }, [isOpen, updateMask]);

  return (
    <div className={`manifesto-overlay${isOpen ? ' is-open' : ''}`} aria-modal role="dialog" aria-label="The Artificial Future Manifesto">

      {/* Close button */}
      <button className="manifesto-close" onClick={onClose} aria-label="Close manifesto">
        <span>Close</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="manifesto-scroll" ref={scrollRef} onScroll={updateMask}>
        <div className="manifesto-inner">

          {/* Header */}
          <div className="manifesto-header">
            <div className="manifesto-label">The Artificial Future · Manifesto</div>
            <h1 className="manifesto-title">We know<br />what we're<br />building.</h1>
          </div>

          {/* Section 1 */}
          <div className="manifesto-section">
            <div className="manifesto-section-num">01</div>
            <h2 className="manifesto-heading">How We Got Here</h2>
            <div className="manifesto-body">
              <p>In 2021, we had a simple idea: throw a party for people working in tech. We expected maybe 20 people. Seventy showed up, and that party became Young People In Tech (YPIT).</p>
              <p>YPIT has since grown into a community of thousands. People finding co-founders, landing first roles, building products together, getting mentored. Turns out there were a lot of people looking for a place to belong, learn, build, and progress.</p>
              <p>Four years later, we're watching another moment unfold. AI is here, and once again we see the same pattern: interested people, not enough places for them to go. People who want to learn but don't know where to start. People who've started but don't know what to build. People already building but without the support to take it further.</p>
              <p>Most of the tools being built right now weren't built with Africa in mind. LLMs that don't speak Hausa or Swahili with any fluency. Financial AI untrained on informal economy data. Voice interfaces that don't recognise our accents. The companies deciding what problems to solve, what data to train on, and what use cases to prioritise are not in Lagos, Nairobi, or Accra.</p>
              <p>The next few years will determine whether AI ends up useful to a trader in Balogun Market, a farmer in Kano, or a student in Enugu. Whether African voices shape this technology, or whether we receive a version designed for someone else.</p>
              <p className="manifesto-pull"><span className="manifesto-highlight">Africa is not late to AI.</span> The question isn't whether African builders will participate. It's whether the environment exists to help them do it well.</p>
              <p><span className="manifesto-highlight">The Artificial Future is our answer to that question.</span></p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="manifesto-section">
            <div className="manifesto-section-num">02</div>
            <h2 className="manifesto-heading">What We Believe</h2>
            <div className="manifesto-body">
              <p>We're building a pipeline, not just running an event. Most programmes in this space are designed to find the people who are already good. We care about taking people from wherever they are and helping them get to the next level, because the builders who will solve the most important problems here aren't necessarily the ones who've already found their footing.</p>
              <p className="manifesto-pull"><span className="manifesto-highlight">Inclusion isn't a compromise. It's the strategy.</span> When you put enthusiasts in the same room as experts, something happens: the experts remember what it was like to start out, the enthusiasts level up faster than they would alone, and everyone builds something better than they would have done by themselves. YPIT's community isn't mostly hardcore ML engineers, but we have thousands of ambitious, curious people willing to learn, willing to build, willing to try. That is the foundation we're building on.</p>
              <p>We believe in real problems and open briefs. We give builders a problem space and trust them to figure out what's possible within it. The technically ambitious builder and the enthusiastic first-timer are both making valid attempts at something meaningful, and both belong here.</p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="manifesto-section">
            <div className="manifesto-section-num">03</div>
            <h2 className="manifesto-heading">What We're Building</h2>
            <div className="manifesto-body">
              <p className="manifesto-pull"><span className="manifesto-highlight">The Artificial Future is a pathway from curiosity to learning, to building, to launching.</span></p>
              <p>The Workshop Series runs in the weeks before the hackathon: virtual sessions led by practitioners actively building with AI, sharing honest accounts of what the work actually looks like from inside.</p>
              <p>The Hackathon brings together 250+ builders across 50 teams over two weekends in Lagos. Challenge areas are economic access, local language and culture, education, and healthcare. Non-technical tracks are included by design, because not every valuable contribution to a product is written in code.</p>
              <p>The Conference convenes the ecosystem on June 13 at The Civic Centre, Lagos, with up to 1,000 founders, investors, policymakers, and builders in one room. Demo Day is where the best hackathon projects present to the people who can actually do something with them.</p>
              <p>The Launchpad is what comes next for the best teams. A post-hackathon pathway built with partners deeply embedded in Nigeria's technology ecosystem, designed to give serious builders the infrastructure, support, and connections to take their ideas further. <span className="manifesto-highlight">The best work here will not be left without a next step.</span></p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="manifesto-section">
            <div className="manifesto-section-num">04</div>
            <h2 className="manifesto-heading">Who This Is For</h2>
            <div className="manifesto-body">
              <p>If you're curious about AI but don't know where to start, <span className="manifesto-highlight">you belong here.</span> If you're technical but haven't built with AI yet, <span className="manifesto-highlight">you belong here.</span> If you're already building and need community, mentorship, or a platform to go further, <span className="manifesto-highlight">you definitely belong here.</span></p>
              <p>We're not looking for people who've already made it. We're looking for people who'll spend their weekends learning. The ones who see a problem and think of a solution. YPIT has been making room for people like that for four years. The Artificial Future is the next chapter.</p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="manifesto-section">
            <div className="manifesto-section-num">05</div>
            <h2 className="manifesto-heading">What We're Reaching For</h2>
            <div className="manifesto-body">
              <p>For every person who comes through AF, we want the same three things: you learned something you didn't know before, you built something you're proud of, and you met people you want to keep building with. <span className="manifesto-highlight">That's the floor, but the ceiling is bigger.</span></p>
              <p><span className="manifesto-highlight">Africa has builders.</span> What it doesn't have is a reliable way to find them, develop them, and connect them to the capital and networks they need to build at scale. The Artificial Future is designed to show that there's an ecosystem to be built here. To start the flywheel of talent, network, capital, and scale that a thriving, African AI ecosystem needs. The workshops, the hackathon, the conference, the Launchpad are how we get there.</p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="manifesto-footer">
            <a href="https://luma.com/1zien2bm" target="_blank" rel="noopener noreferrer" className="btn-primary" onClick={onClose}>
              Register for Free
            </a>
            <button className="manifesto-close-link" onClick={onClose}>Back to the site →</button>
          </div>

        </div>
      </div>
    </div>
  );
}
