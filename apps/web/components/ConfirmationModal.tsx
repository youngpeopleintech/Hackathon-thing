'use client';

import React, { useEffect } from 'react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white border border-gray-100 rounded-2xl p-8 max-w-md mx-4 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="relative">
          {/* Success icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-navy-900 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          {/* Content */}
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold text-navy-900 mb-2">
              You're In, {name.split(' ')[0]}!
            </h2>
            <p className="text-navy-600 mb-6">
              Welcome to YPIT: The Artificial Future. Your registration has been confirmed.
            </p>
            
            {/* Registration ID */}
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6">
              <p className="text-xs text-navy-500 mb-1">Registration ID</p>
              <p className="text-navy-900 font-mono text-sm break-all">{registrationId}</p>
            </div>
            
            {/* Next steps */}
            <div className="text-left bg-navy-900/5 border border-navy-900/10 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-navy-900 mb-2">What's next?</p>
              <ul className="text-sm text-navy-700 space-y-2">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-navy-800 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Check your email for confirmation details
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-navy-800 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Join our community for team formation
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-navy-800 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Attend pre-hackathon workshops
                </li>
              </ul>
            </div>
            
            <button
              onClick={onClose}
              className="btn-primary w-full"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
