'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with Three.js
const PixelBlast = dynamic(() => import('@/components/ui/PixelBlast'), {
  ssr: false,
  loading: () => null,
});

export function HeroSection() {
  return (
    <div className="relative h-full min-h-screen bg-white flex flex-col items-center justify-center px-8 overflow-hidden">
      {/* PixelBlast Background - Primary cyan */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}>
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#00e5ff"
          patternScale={3}
          patternDensity={1.3}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          speed={0.6}
          edgeFade={0.2}
          transparent
        />
      </div>
      
      {/* Neon glow overlay effect */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-60"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(0, 229, 255, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(56, 189, 248, 0.12) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 50%, rgba(20, 184, 166, 0.08) 0%, transparent 60%)
          `,
          animation: 'pulse 8s ease-in-out infinite alternate'
        }}
      />
      
      {/* Content - Centered */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* YPIT Logo */}
        <div className="mb-6">
          <a 
            href="https://www.youngpeopleintech.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block hover:opacity-80 transition-opacity pointer-events-auto"
          >
            <img 
              src="/ypit-logo.png" 
              alt="YPIT - Young People In Tech" 
              className="h-10 md:h-12 w-auto mx-auto"
            />
          </a>
        </div>

        {/* Main heading with subtle glow */}
        <h1 
          className="text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-navy-900 leading-tight mb-6 pointer-events-none"
          style={{
            textShadow: '0 0 40px rgba(6, 182, 212, 0.15)'
          }}
        >
          The Artificial Future
        </h1>
        
        {/* Tagline */}
        <p className="text-xl lg:text-2xl text-navy-700 mb-8 font-medium">
          Building Africa's AI Future, Together.
        </p>
        
        {/* Location */}
        <div className="inline-flex items-center gap-2 text-navy-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-lg font-medium">Lagos, Nigeria</span>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 0.5;
            transform: scale(1.02);
          }
        }
      `}</style>
    </div>
  );
}
