'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="relative h-screen bg-white overflow-hidden flex flex-col">
      
      {/* Subtle dot pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Main Content - Two Column Layout */}
      <div className="relative z-10 flex-1 flex items-center px-6 lg:px-12 xl:px-20 py-8">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Column - Hero */}
          <div className="text-center lg:text-left">
            {/* YPIT Logo */}
            <div className="flex justify-center lg:justify-start mb-6">
              <a 
                href="https://www.youngpeopleintech.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/ypit-logo.png" 
                  alt="YPIT - Young People In Tech" 
                  className="h-12 md:h-14 w-auto"
                />
              </a>
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-heading leading-tight mb-2">
              <span className="font-bold text-black">The Artificial Future</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 font-light mb-4">
              AI Hackathon & Conference
            </p>

            <p className="text-base text-gray-500 mb-6 flex items-center justify-center lg:justify-start gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Lagos, Nigeria
            </p>

            {/* CTA Button */}
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Join Waitlist</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Right Column - About */}
          <div className="bg-gray-50 rounded-2xl p-6 xl:p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-black mb-3">
              About YPIT AF
            </h2>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              <strong className="text-black">YPIT AF (The Artificial Future)</strong> is a flagship AI Hackathon and Conference by Young People In Tech, designed to empower professional and economic growth in the age of AI.
            </p>

            <p className="text-gray-600 text-sm mb-3">
              The event brings together builders, founders, investors, and young professionals to:
            </p>

            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 bg-black rounded flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm">Build and showcase AI-powered solutions</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 bg-black rounded flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm">Learn practical, hands-on AI skills</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 bg-black rounded flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm">Connect with Nigeria's AI ecosystem</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 bg-black rounded flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm">Spotlight local talent on a global stage</span>
              </li>
            </ul>

            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-gray-600 text-xs leading-relaxed">
                <span className="font-semibold text-black">Why join the waitlist?</span> Get early access to updates, priority registration, and first dibs on participation opportunities ahead of the official launch.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute left-6 top-20 hidden xl:block">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 transform -rotate-6 w-40">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-black">AI Innovation</span>
          </div>
        </div>
      </div>

      <div className="absolute right-6 top-20 hidden xl:block">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-3 transform rotate-6 w-44">
          <div className="text-xs font-semibold text-black mb-1">Coming Soon</div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              <div className="w-5 h-5 bg-black rounded-full border-2 border-white"></div>
              <div className="w-5 h-5 bg-gray-400 rounded-full border-2 border-white"></div>
              <div className="w-5 h-5 bg-gray-600 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-[10px] text-gray-500">Join young builders</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 py-4 text-center border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Presented by{' '}
          <a 
            href="https://www.youngpeopleintech.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black hover:text-gray-600 font-medium underline underline-offset-2"
          >
            Young People in Tech
          </a>
        </p>
      </div>
    </div>
  );
}
