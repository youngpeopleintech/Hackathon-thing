'use client';

import React from 'react';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden">
      
      {/* Subtle dot pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Floating decorative cards - Left side */}
      <div className="absolute left-8 top-1/4 hidden lg:block">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 transform -rotate-6 w-48">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-black">AI Innovation</span>
          </div>
          <p className="text-xs text-gray-500">Building the future of technology in Africa</p>
        </div>
      </div>

      {/* Floating decorative cards - Right side */}
      <div className="absolute right-8 top-1/3 hidden lg:block">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 transform rotate-6 w-52">
          <div className="text-sm font-semibold text-black mb-2">Coming Soon</div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 bg-black rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white"></div>
              <div className="w-6 h-6 bg-gray-600 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-xs text-gray-500">Join young builders</span>
          </div>
        </div>
      </div>

      {/* Bottom left card */}
      <div className="absolute left-12 bottom-1/4 hidden lg:block">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 w-56">
          <div className="text-sm font-semibold text-black mb-2">Lagos, Nigeria</div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Hackathon & Conference</span>
          </div>
        </div>
      </div>

      {/* Bottom right card */}
      <div className="absolute right-12 bottom-1/4 hidden lg:block">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 w-48 transform rotate-3">
          <div className="text-sm font-semibold text-black mb-2">Tech Tracks</div>
          <div className="flex flex-wrap gap-1">
            <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">AI/ML</span>
            <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">FinTech</span>
            <span className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">HealthTech</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading leading-tight mb-6">
          <span className="font-bold text-black">The Artificial Future</span>
          <br />
          <span className="font-light text-gray-400">coming soon</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          A hackathon and conference experience bringing together Africa's brightest young minds to build the future of AI.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://www.youngpeopleintech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>by YPIT</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-sm text-gray-400">
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
