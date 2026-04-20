'use client';

import { useState } from 'react';
import { Reveal } from './Reveal';
import { submitWaitlist } from '@/lib/api';

export function AfConference() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await submitWaitlist(email);
      setStatus('success');
      setEmail('');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  };

  return (
    <section id="conference" className="section section-cream">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">The Conference</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">
            A day that <span style={{ color: '#FE324B' }}>actually matters.</span>
          </h2>
        </Reveal>
        <div className="conf-grid">
          <Reveal delay={0.15}>
            <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 22 }}>
              The Artificial Future Conference is a standalone day of talks, panels, and conversations about the state
              and future of AI in Africa and globally. Curated to be genuinely useful — not just inspirational.
            </p>
            <p style={{ fontSize: 17, fontWeight: 300, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 22 }}>
              We will also be showcasing the most ambitious Hackathon projects. The best teams present in front of a
              live audience, and we will award prizes and crown a winner on the day.
            </p>
            <p style={{ fontSize: 14, color: '#b0a89a', fontWeight: 300, lineHeight: 1.7, marginBottom: 36 }}>
              Open to anyone. You do not need to have participated in the hackathon to attend. Tickets are paid and
              capacity is limited.
            </p>

            {status === 'success' ? (
              <div className="conf-waitlist-success">
                <span className="conf-waitlist-success-icon">✓</span>
                You&apos;re on the list. We&apos;ll let you know when tickets go on sale.
              </div>
            ) : (
              <form className="conf-waitlist-form" onSubmit={handleWaitlist}>
                <p className="conf-waitlist-label">Tickets go on sale soon. Join the waitlist:</p>
                <div className="conf-waitlist-row">
                  <input
                    type="email"
                    className="conf-waitlist-input"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
                    required
                  />
                  <button type="submit" className="conf-waitlist-btn" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Joining…' : 'Join Waitlist →'}
                  </button>
                </div>
                {status === 'error' && <p className="conf-waitlist-error">{errorMsg}</p>}
              </form>
            )}
          </Reveal>
          <Reveal delay={0.25} className="conf-card">
            <div className="conf-card-header">
              <h4>Conference Details</h4>
              <p>June 13, 2026</p>
            </div>
            <div className="conf-detail">
              <div className="conf-detail-marker" aria-hidden />
              <div>
                <h5>Venue</h5>
                <p>The Civic Centre, Lagos Island, Nigeria</p>
              </div>
            </div>
            <div className="conf-detail">
              <div className="conf-detail-marker" aria-hidden />
              <div>
                <h5>Main Stage</h5>
                <p>Keynotes from leading voices in African AI</p>
              </div>
            </div>
            <div className="conf-detail">
              <div className="conf-detail-marker" aria-hidden />
              <div>
                <h5>Breakout Sessions</h5>
                <p>Workshops, roundtables, and panels</p>
              </div>
            </div>
            <div className="conf-detail">
              <div className="conf-detail-marker" aria-hidden />
              <div>
                <h5>Demo Day</h5>
                <p>Top hackathon teams pitch live — YC-style</p>
              </div>
            </div>
            <div className="conf-detail">
              <div className="conf-detail-marker" aria-hidden />
              <div>
                <h5>Networking</h5>
                <p>Dedicated breaks and closing reception</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
