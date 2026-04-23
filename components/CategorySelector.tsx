'use client';

import React, { useState, useEffect } from 'react';
import { categories } from '@/lib/diagnosticData';
import Logo from './ui/Logo';

interface CategorySelectorProps {
  onSelect: (categoryId: string) => void;
  onBack: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  financial: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  operations: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M20 12h-2M6 12H4M19.07 19.07l-1.41-1.41M5.34 5.34L3.93 3.93M12 20v-2M12 6V4" />
    </svg>
  ),
  sales: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  hr: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  logistics: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  marketing: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  technology: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  organization: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  customer: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  production: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20M4 20V10l4-4 4 4V8l4-4 4 4v12" />
    </svg>
  ),
  service: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
};

export default function CategorySelector({ onSelect, onBack }: CategorySelectorProps) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen px-6 py-8 overflow-y-auto">
      {/* Background */}
      <div
        className="fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(196,151,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,151,59,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{
          background: 'rgba(7,7,15,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(196,151,59,0.08)',
        }}
      >
        <Logo size="sm" />
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-body text-gray-500 hover:text-gold transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M11 7H3M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      </div>

      <div
        className="relative z-10 max-w-5xl mx-auto pt-28 pb-16"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        {/* Section header */}
        <div className="text-center mb-12">
          <p
            className="text-xs font-body font-medium tracking-[0.25em] uppercase mb-4"
            style={{ color: '#C4973B' }}
          >
            Step 1 of 2
          </p>
          <h2
            className="font-display font-bold leading-tight mb-4"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #CCCCCC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            What is the primary challenge
            <br />your company is facing?
          </h2>
          <p className="text-sm font-body text-gray-500 max-w-md mx-auto leading-relaxed">
            Select the area that most closely reflects your current strategic concern.
            Your selection will guide the diagnostic.
          </p>
        </div>

        {/* Gold divider */}
        <div className="gold-divider mb-12" />

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative text-left p-6 rounded-2xl transition-all duration-300"
              style={{
                background:
                  hovered === cat.id
                    ? 'rgba(196,151,59,0.08)'
                    : 'rgba(19,19,30,0.7)',
                border:
                  hovered === cat.id
                    ? '1px solid rgba(196,151,59,0.4)'
                    : '1px solid rgba(196,151,59,0.12)',
                boxShadow:
                  hovered === cat.id
                    ? '0 8px 32px rgba(196,151,59,0.12), 0 0 0 1px rgba(196,151,59,0.2)'
                    : '0 2px 16px rgba(0,0,0,0.3)',
                transform: hovered === cat.id ? 'translateY(-2px)' : 'translateY(0)',
                opacity: visible ? 1 : 0,
                animationDelay: `${i * 40}ms`,
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                style={{
                  background:
                    hovered === cat.id
                      ? 'rgba(196,151,59,0.2)'
                      : 'rgba(196,151,59,0.08)',
                  color: hovered === cat.id ? '#D4A94B' : '#8A7840',
                  border: '1px solid rgba(196,151,59,0.15)',
                }}
              >
                {CATEGORY_ICONS[cat.id]}
              </div>

              {/* Text */}
              <h3
                className="font-body font-semibold text-sm mb-1.5 transition-colors duration-300"
                style={{ color: hovered === cat.id ? '#F5F5F0' : '#C8C8D0' }}
              >
                {cat.label}
              </h3>
              <p className="text-xs font-body text-gray-600 leading-snug">
                {cat.description}
              </p>

              {/* Arrow */}
              <div
                className="absolute bottom-5 right-5 transition-all duration-300"
                style={{
                  opacity: hovered === cat.id ? 1 : 0,
                  transform: hovered === cat.id ? 'translateX(0)' : 'translateX(-4px)',
                  color: '#C4973B',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Hover glow corner */}
              {hovered === cat.id && (
                <div
                  className="absolute top-0 right-0 w-24 h-24 pointer-events-none rounded-2xl"
                  style={{
                    background: 'radial-gradient(circle at top right, rgba(196,151,59,0.12), transparent 70%)',
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
