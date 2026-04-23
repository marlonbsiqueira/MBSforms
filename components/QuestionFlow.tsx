'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Category } from '@/lib/diagnosticData';
import ProgressBar from './ui/ProgressBar';
import Logo from './ui/Logo';

interface QuestionFlowProps {
  category: Category;
  onComplete: (answers: number[]) => void;
  onBack: () => void;
}

export default function QuestionFlow({ category, onComplete, onBack }: QuestionFlowProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const answersRef = useRef<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  const question = category.questions[currentQ];
  const isLast = currentQ === category.questions.length - 1;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Reset animation on question change
  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, [currentQ]);

  const handleSelect = (score: number, idx: number) => {
    setSelected(idx);

    setTimeout(() => {
      answersRef.current = [...answersRef.current, score];
      const newAnswers = answersRef.current;

      if (isLast) {
        setExiting(true);
        setTimeout(() => onComplete(newAnswers), 500);
      } else {
        setCurrentQ((q) => q + 1);
        setSelected(null);
      }
    }, 400);
  };

  return (
    <div
      className="relative min-h-screen flex flex-col px-6 py-8 overflow-hidden"
      style={{
        opacity: exiting ? 0 : 1,
        transition: exiting ? 'opacity 0.5s ease' : 'none',
      }}
    >
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

      {/* Top glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(ellipse at top, rgba(196,151,59,0.5), transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{
          background: 'rgba(7,7,15,0.95)',
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
          Change Category
        </button>
      </div>

      {/* Main */}
      <div className="relative z-10 max-w-2xl mx-auto w-full pt-28 pb-16 flex flex-col flex-1">

        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-xs font-body font-medium tracking-wider uppercase"
              style={{ color: '#C4973B' }}
            >
              {category.label}
            </span>
            <span className="text-xs font-body text-gray-600">
              Step 2 of 2
            </span>
          </div>
          <ProgressBar
            current={currentQ + 1}
            total={category.questions.length}
            label="Question"
          />
        </div>

        {/* Question card */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.45s ease, transform 0.45s ease',
          }}
        >
          {/* Question number */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-semibold flex-shrink-0"
              style={{
                background: 'rgba(196,151,59,0.15)',
                border: '1px solid rgba(196,151,59,0.3)',
                color: '#D4A94B',
              }}
            >
              {currentQ + 1}
            </div>
            <div className="h-px flex-1" style={{ background: 'rgba(196,151,59,0.15)' }} />
          </div>

          {/* Question text */}
          <h2
            className="font-display font-semibold leading-tight mb-10"
            style={{
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
              color: '#F5F5F0',
            }}
          >
            {question.text}
          </h2>

          {/* Answer options */}
          <div className="flex flex-col gap-3">
            {question.answers.map((answer, idx) => {
              const isSelected = selected === idx;
              const isDeselected = selected !== null && selected !== idx;

              return (
                <button
                  key={idx}
                  data-answer={idx}
                  onClick={() => selected === null && handleSelect(answer.score, idx)}
                  disabled={selected !== null}
                  className="relative text-left p-5 rounded-xl transition-all duration-300 group"
                  style={{
                    background: isSelected
                      ? 'rgba(196,151,59,0.15)'
                      : 'rgba(19,19,30,0.7)',
                    border: isSelected
                      ? '1px solid rgba(196,151,59,0.5)'
                      : '1px solid rgba(196,151,59,0.1)',
                    opacity: isDeselected ? 0.4 : 1,
                    transform: isSelected ? 'scale(1.01)' : 'scale(1)',
                    backdropFilter: 'blur(8px)',
                    cursor: selected !== null ? 'default' : 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (selected !== null) return;
                    e.currentTarget.style.background = 'rgba(196,151,59,0.08)';
                    e.currentTarget.style.border = '1px solid rgba(196,151,59,0.3)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    if (selected !== null) return;
                    e.currentTarget.style.background = 'rgba(19,19,30,0.7)';
                    e.currentTarget.style.border = '1px solid rgba(196,151,59,0.1)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Radio indicator */}
                    <div
                      className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300"
                      style={{
                        border: isSelected
                          ? '2px solid #C4973B'
                          : '2px solid rgba(196,151,59,0.3)',
                        background: isSelected ? 'rgba(196,151,59,0.2)' : 'transparent',
                      }}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full" style={{ background: '#C4973B' }} />
                      )}
                    </div>

                    {/* Answer label */}
                    <span
                      className="font-body text-sm leading-snug transition-colors duration-300"
                      style={{ color: isSelected ? '#F5F5F0' : '#9090A0' }}
                    >
                      {answer.label}
                    </span>
                  </div>

                  {/* Check mark on select */}
                  {isSelected && (
                    <div
                      className="absolute right-5 top-1/2 -translate-y-1/2"
                      style={{ color: '#C4973B' }}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <circle cx="9" cy="9" r="8" stroke="#C4973B" strokeWidth="1.5" />
                        <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#C4973B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer hint */}
        {selected === null && (
          <p className="text-center text-xs font-body text-gray-700 mt-8">
            Select an answer to proceed · No right or wrong answers
          </p>
        )}

        {selected !== null && !isLast && (
          <p className="text-center text-xs font-body mt-8" style={{ color: '#C4973B' }}>
            Loading next question...
          </p>
        )}

        {selected !== null && isLast && (
          <p className="text-center text-xs font-body mt-8" style={{ color: '#C4973B' }}>
            Generating your diagnostic report...
          </p>
        )}
      </div>
    </div>
  );
}
