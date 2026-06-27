'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
}

export default function Logo({ size = 'md', variant = 'full' }: LogoProps) {
  const sizes = {
    sm: { text: 'text-lg', sub: 'text-[9px]', gap: 'gap-2' },
    md: { text: 'text-2xl', sub: 'text-[10px]', gap: 'gap-2.5' },
    lg: { text: 'text-3xl', sub: 'text-xs', gap: 'gap-3' },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.gap}`}>
      {/* Icon mark */}
      <div className="relative flex-shrink-0">
        <svg
          width={size === 'sm' ? 28 : size === 'md' ? 36 : 44}
          height={size === 'sm' ? 28 : size === 'md' ? 36 : 44}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="1"
            width="42"
            height="42"
            rx="8"
            stroke="url(#goldGrad)"
            strokeWidth="1.5"
          />
          <path
            d="M10 32L16 20L22 26L28 14L34 22"
            stroke="url(#goldGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="22" cy="16" r="2" fill="url(#goldGrad)" />
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D4A94B" />
              <stop offset="1" stopColor="#A07828" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {variant === 'full' && (
        <div className="flex flex-col">
          <span
            className={`${s.text} font-display font-bold tracking-tight leading-none`}
            style={{
              background: 'linear-gradient(135deg, #D4A94B 0%, #C4973B 50%, #A07828 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            MBSA
          </span>
          <span
            className={`${s.sub} font-body font-medium tracking-[0.2em] uppercase text-gray-400 leading-tight mt-0.5`}
          >
            Advisory
          </span>
        </div>
      )}
    </div>
  );
}
