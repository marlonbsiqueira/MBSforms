'use client';

import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {label && (
          <span className="text-xs font-body font-medium text-gray-400 tracking-wider uppercase">
            {label}
          </span>
        )}
        <span className="text-xs font-body font-medium text-gold ml-auto">
          {current} / {total}
        </span>
      </div>

      <div
        className="relative h-[3px] rounded-full overflow-hidden"
        style={{ background: 'rgba(196,151,59,0.12)' }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #A07828, #D4A94B, #C4973B)',
          }}
        />
        {/* Shimmer */}
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${pct}%`,
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            animation: 'shimmer 2s linear infinite',
            backgroundSize: '200% 100%',
          }}
        />
      </div>
    </div>
  );
}
