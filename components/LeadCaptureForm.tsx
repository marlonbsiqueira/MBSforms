'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { DiagnosticReport, getSeverityColor, getSeverityBg } from '@/lib/reportGenerator';
import { Lang, translations } from '@/lib/translations';
import { EMAIL_CONFIG } from '@/lib/emailConfig';
import Logo from './ui/Logo';

interface LeadCaptureFormProps {
  report: DiagnosticReport;
  onRestart: () => void;
  lang: Lang;
  onToggleLang: () => void;
}

export default function LeadCaptureForm({ report, onRestart, lang, onToggleLang }: LeadCaptureFormProps) {
  const T = translations[lang];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const { template, category, totalScore, answers } = report;
  const severityColor = getSeverityColor(template.severity);
  const severityBg = getSeverityBg(template.severity);
  const scorePct = Math.max(0, Math.min(100, Math.round(((totalScore - 5) / 15) * 100)));

  const buildAnswersDetail = () =>
    category.questions
      .map((q, i) => {
        const score = answers[i];
        const answerObj = q.answers.find((a) => a.score === score);
        return `Q${i + 1}: ${q.text}\nAnswer: ${answerObj?.label ?? 'N/A'} (Score: ${score}/4)`;
      })
      .join('\n\n');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus('sending');

    const actionsText = template.actions.map((a, i) => `${i + 1}. ${a}`).join('\n');

    try {
      await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          category: category.label,
          score_pct: `${scorePct}%`,
          total_score: `${totalScore}/20`,
          severity: template.severity,
          headline: template.headline,
          summary: template.summary,
          leakage: template.leakage,
          actions: actionsText,
          answers_detail: buildAnswersDetail(),
        },
        EMAIL_CONFIG.PUBLIC_KEY
      );
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <div
          className="fixed inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(196,151,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,151,59,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-lg mx-auto text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(76,175,125,0.15)', border: '1px solid rgba(76,175,125,0.4)' }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M6 16l7 7 13-13" stroke="#4CAF7D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="font-display font-bold text-3xl text-white mb-4">{T.successTitle}</h2>
          <p className="font-body text-gray-400 leading-relaxed mb-8 max-w-sm mx-auto">{T.successMsg}</p>
          <button
            onClick={onRestart}
            className="text-xs font-body text-gray-600 hover:text-gold transition-colors underline underline-offset-2"
          >
            {T.anotherDiagnostic}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen px-6 py-8 overflow-y-auto">
      <div
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(196,151,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,151,59,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ opacity: 0.1, background: `radial-gradient(ellipse at top, ${severityColor}, transparent 70%)` }}
        aria-hidden="true"
      />

      {/* Header */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ background: 'rgba(7,7,15,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(196,151,59,0.08)' }}
      >
        <Logo size="sm" />
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleLang}
            className="text-xs font-body font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
            style={{ background: 'rgba(196,151,59,0.1)', border: '1px solid rgba(196,151,59,0.3)', color: '#C4973B' }}
          >
            {T.langButton}
          </button>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 text-xs font-body text-gray-500 hover:text-gold transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7a5 5 0 1 1 1 3M2 7V3M2 7H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {T.anotherDiagnostic}
          </button>
        </div>
      </div>

      <div className="relative z-10 max-w-lg mx-auto pt-32 pb-20">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: severityColor }} />
            <span className="text-xs font-body font-semibold tracking-[0.2em]" style={{ color: severityColor }}>
              {T.formStep.toUpperCase()}
            </span>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: severityColor }} />
          </div>
          <h1
            className="font-display font-bold leading-tight mb-4"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #CCCCCC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {T.formTitle}
          </h1>
          <p className="font-body text-sm text-gray-400 leading-relaxed max-w-sm mx-auto">{T.formSubtitle}</p>
        </div>

        <div className="gold-divider mb-8" />

        <form onSubmit={handleSubmit}>
          <div
            className="p-7 rounded-2xl mb-4"
            style={{ background: 'rgba(13,13,22,0.8)', border: '1px solid rgba(196,151,59,0.15)', backdropFilter: 'blur(8px)' }}
          >
            {/* Badges */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span
                className="text-xs font-body px-3 py-1 rounded-full"
                style={{ background: 'rgba(196,151,59,0.1)', border: '1px solid rgba(196,151,59,0.2)', color: '#C4973B' }}
              >
                {category.label}
              </span>
              <span
                className="text-xs font-body px-3 py-1 rounded-full"
                style={{ background: severityBg, border: `1px solid ${severityColor}44`, color: severityColor }}
              >
                {template.severity} Risk · {scorePct}%
              </span>
            </div>

            {/* Name */}
            <div className="mb-5">
              <label className="block text-xs font-body font-medium tracking-wider uppercase text-gray-500 mb-2">
                {T.fullName}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={T.fullNamePlaceholder}
                className="w-full px-4 py-3 rounded-xl text-sm font-body text-gray-200 placeholder-gray-600 outline-none transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,151,59,0.2)' }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid rgba(196,151,59,0.5)';
                  e.target.style.background = 'rgba(196,151,59,0.04)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(196,151,59,0.2)';
                  e.target.style.background = 'rgba(255,255,255,0.04)';
                }}
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-xs font-body font-medium tracking-wider uppercase text-gray-500 mb-2">
                {T.emailLabel}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={T.emailPlaceholder}
                className="w-full px-4 py-3 rounded-xl text-sm font-body text-gray-200 placeholder-gray-600 outline-none transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,151,59,0.2)' }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid rgba(196,151,59,0.5)';
                  e.target.style.background = 'rgba(196,151,59,0.04)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(196,151,59,0.2)';
                  e.target.style.background = 'rgba(255,255,255,0.04)';
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-3.5 rounded-full font-body font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #C4973B 0%, #D4A94B 50%, #A07828 100%)',
                color: '#07070F',
                boxShadow: '0 8px 32px rgba(196,151,59,0.3)',
              }}
            >
              {status === 'sending' ? T.sending : T.submitBtn}
            </button>

            {status === 'error' && (
              <p className="text-center text-xs text-red-400 mt-3">{T.errorMsg}</p>
            )}
          </div>

          <p className="text-center text-xs font-body text-gray-700 leading-relaxed px-4">{T.privacy}</p>
        </form>
      </div>
    </div>
  );
}
