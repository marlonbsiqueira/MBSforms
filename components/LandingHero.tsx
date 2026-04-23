'use client';

import React, { useEffect, useState } from 'react';
import Logo from './ui/Logo';

interface LandingHeroProps {
  onStart: () => void;
}

export default function LandingHero({ onStart }: LandingHeroProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(196,151,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,151,59,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Top radial */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(196,151,59,0.4) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Floating orbs */}
      <div
        className="absolute top-1/4 right-[8%] w-48 h-48 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: 'radial-gradient(circle, #C4973B, transparent)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-[8%] w-64 h-64 rounded-full opacity-[0.05] blur-3xl"
        style={{ background: 'radial-gradient(circle, #1A1A6E, transparent)' }}
        aria-hidden="true"
      />

      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ borderBottom: '1px solid rgba(196,151,59,0.08)' }}
      >
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-body text-gray-400 tracking-wider">
            Diagnostic Platform
          </span>
        </div>
      </div>

      {/* Main content */}
      <div
        className="relative z-10 max-w-3xl mx-auto text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8">
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-body font-medium tracking-wider"
            style={{
              background: 'rgba(196,151,59,0.1)',
              border: '1px solid rgba(196,151,59,0.25)',
              color: '#D4A94B',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#D4A94B" strokeWidth="1" />
              <path d="M4 6l1.5 1.5L8 4" stroke="#D4A94B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            STRATEGIC INTELLIGENCE PLATFORM
          </div>
        </div>

        {/* Headline */}
        <h1
          className="font-display font-bold leading-[1.1] mb-6"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #D0D0D0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Uncover the Real{' '}
          </span>
          <span className="text-gold-shimmer">
            Bottleneck
          </span>
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #D0D0D0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            in Your Business.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="font-body font-light text-gray-400 leading-relaxed mb-12 mx-auto"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '580px' }}
        >
          Answer 5 strategic questions and receive a precision diagnostic identifying your
          company&apos;s primary growth constraint — with an executive action plan.
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-10 mb-12">
          {[
            { value: '5', label: 'Questions' },
            { value: '<3', label: 'Minutes' },
            { value: '11', label: 'Business Areas' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="font-display font-bold text-2xl mb-0.5"
                style={{
                  background: 'linear-gradient(135deg, #D4A94B, #C4973B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {value}
              </div>
              <div className="text-xs font-body text-gray-500 tracking-wider uppercase">{label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-body font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-105 active:scale-100"
          style={{
            background: 'linear-gradient(135deg, #C4973B 0%, #D4A94B 50%, #A07828 100%)',
            color: '#07070F',
            boxShadow: '0 0 0 0 rgba(196,151,59,0.4), 0 8px 32px rgba(196,151,59,0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              '0 0 0 6px rgba(196,151,59,0.15), 0 12px 48px rgba(196,151,59,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              '0 0 0 0 rgba(196,151,59,0.4), 0 8px 32px rgba(196,151,59,0.3)';
          }}
        >
          <span>BEGIN DIAGNOSTIC</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Trust signal */}
        <p className="mt-6 text-xs font-body text-gray-600 tracking-wide">
          Trusted by growth-stage companies across 12 industries
        </p>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #07070F, transparent)' }}
        aria-hidden="true"
      />

      {/* Decorative lines */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-px opacity-30"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(196,151,59,0.6))' }}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-px opacity-30"
        style={{ background: 'linear-gradient(270deg, transparent, rgba(196,151,59,0.6))' }}
        aria-hidden="true"
      />
    </div>
  );
}
