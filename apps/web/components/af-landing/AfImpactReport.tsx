'use client';

import { useState } from 'react';
import { submitImpactReport } from '@/lib/api';
import { Reveal } from './Reveal';

export function AfImpactReport() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await submitImpactReport(email);
      setStatus('success');
      setEmail('');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  return (
    <section id="impact" className="section section-cream">
      <div className="section-inner">
        <Reveal>
          <div className="section-label">Impact report</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-headline">Get the story of what happened.</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="section-sub">
            The impact report covers who came, what got built, and what the three weeks in Lagos added up to. Leave
            your email and we will send it when it is ready.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          {status === 'success' ? (
            <div className="conf-waitlist-success">
              <span className="conf-waitlist-success-icon">✓</span>
              You&apos;re on the list. We&apos;ll send the impact report when it&apos;s ready.
            </div>
          ) : (
            <form className="conf-waitlist-form" onSubmit={handleSubmit}>
              <div className="conf-waitlist-row">
                <input
                  type="email"
                  className="conf-waitlist-input"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setStatus('idle');
                  }}
                  required
                />
                <button type="submit" className="conf-waitlist-btn" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Joining…' : 'Send me the report →'}
                </button>
              </div>
              {status === 'error' ? <p className="conf-waitlist-error">{errorMsg}</p> : null}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
