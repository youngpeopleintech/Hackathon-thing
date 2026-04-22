'use client';

import React, { useEffect } from 'react';
import '@/components/af-register/ypit-af-register.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrationId: string;
  name: string;
}

export function ConfirmationModal({ isOpen, onClose, registrationId, name }: ConfirmationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
      <div className="af-reg-modal-backdrop absolute inset-0" onClick={onClose} aria-hidden />

      <div
        className="ypitAfRegister af-reg-modal-root relative w-full animate-in fade-in zoom-in duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="af-reg-modal-heading"
      >
        <div className="af-reg-modal-panel mx-auto">
          <div className="af-reg-modal-icon">
            <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 id="af-reg-modal-heading" className="af-reg-modal-title">
            You&apos;re In, {name.split(' ')[0]}!
          </h2>
          <p className="af-reg-modal-text">
            Welcome to The Artificial Future. Your registration has been confirmed.
          </p>

          <div className="af-reg-modal-id-box">
            <p className="af-reg-modal-id-label">Registration ID</p>
            <p className="af-reg-modal-id-value">{registrationId}</p>
          </div>

          <div className="af-reg-modal-next">
            <h4>What&apos;s next?</h4>
            <ul className="space-y-3 pl-0 list-none">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Check your email for confirmation details
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Watch your inbox for more details on Hackathon tracks, prizes, and team formation. You can expect this in a few weeks.
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Sign up for the pre-hackathon workshops and webinars
              </li>
            </ul>
          </div>

          <button type="button" onClick={onClose} className="btn-primary w-full">
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
