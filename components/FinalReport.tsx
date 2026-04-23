'use client';

import React, { useEffect, useState } from 'react';
import { DiagnosticReport, getSeverityColor, getSeverityBg, getScorePercentage } from '@/lib/reportGenerator';
import Logo from './ui/Logo';

interface FinalReportProps {
  report: DiagnosticReport;
  onRestart: () => void;
}

const SEVERITY_LABELS: Record<string, string> = {
  Low: 'LOW RISK',
  Moderate: 'MODERATE RISK',
  High: 'HIGH PRIORITY',
  Critical: 'CRITICAL ALERT',
};

export default function FinalReport({ report, onRestart }: FinalReportProps) {
  const [visible, setVisible] = useState(false);
  const [animScore, setAnimScore] = useState(0);
  const [actionsVisible, setActionsVisible] = useState(false);
  const { template, category, totalScore } = report;
  const pct = getScorePercentage(totalScore);
  const severityColor = getSeverityColor(template.severity);
  const severityBg = getSeverityBg(template.severity);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setAnimScore(pct), 600);
    const t3 = setTimeout(() => setActionsVisible(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [pct]);

  const handleScheduleCall = () => {
    window.open('mailto:contact@mbsaadvisory.com?subject=Strategic Consultation Request&body=I completed the MBSA business diagnostic and would like to schedule a consultation.', '_blank');
  };

  return (
    <div className="relative min-h-screen px-6 py-8 overflow-y-auto">
      {/* Background */}
      <div
        className="fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(196,151,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,151,59,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Glow from top */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{
          opacity: 0.12,
          background: `radial-gradient(ellipse at top, ${severityColor}, transparent 70%)`,
        }}
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
          onClick={onRestart}
          className="flex items-center gap-2 text-xs font-body text-gray-500 hover:text-gold transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7a5 5 0 1 1 1 3M2 7V3M2 7H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          New Diagnostic
        </button>
      </div>

      <div
        className="relative z-10 max-w-3xl mx-auto pt-28 pb-20"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        {/* Report header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-6">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: severityColor }}
            />
            <span
              className="text-xs font-body font-semibold tracking-[0.2em]"
              style={{ color: severityColor }}
            >
              {SEVERITY_LABELS[template.severity]}
            </span>
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: severityColor }}
            />
          </div>

          <p
            className="text-xs font-body font-medium tracking-[0.25em] uppercase mb-3"
            style={{ color: 'rgba(196,151,59,0.7)' }}
          >
            MBSA Advisory · Diagnostic Report
          </p>

          <h1
            className="font-display font-bold leading-tight mb-4"
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #D0D0D0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {template.headline}
          </h1>

          <div className="flex items-center justify-center gap-3 mt-4">
            <span
              className="text-xs font-body px-3 py-1 rounded-full"
              style={{
                background: 'rgba(196,151,59,0.1)',
                border: '1px solid rgba(196,151,59,0.2)',
                color: '#C4973B',
              }}
            >
              {category.label}
            </span>
          </div>
        </div>

        {/* Gold divider */}
        <div className="gold-divider mb-10" />

        {/* Score + Summary row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          {/* Score gauge */}
          <div
            className="p-6 rounded-2xl"
            style={{
              background: 'rgba(13,13,22,0.8)',
              border: '1px solid rgba(196,151,59,0.15)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <p className="text-xs font-body font-medium tracking-wider uppercase text-gray-500 mb-5">
              Risk Score
            </p>

            {/* Arc gauge */}
            <div className="flex items-center justify-center mb-5">
              <div className="relative w-28 h-28">
                <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                  {/* Track */}
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                  {/* Progress */}
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke={severityColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    strokeDashoffset={`${2 * Math.PI * 52 * (1 - animScore / 100)}`}
                    style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.25,0.46,0.45,0.94)', filter: `drop-shadow(0 0 6px ${severityColor}66)` }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="font-display font-bold text-2xl leading-none"
                    style={{ color: severityColor }}
                  >
                    {animScore}%
                  </span>
                  <span className="text-[10px] font-body text-gray-600 mt-1">severity</span>
                </div>
              </div>
            </div>

            {/* Severity badge */}
            <div
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl"
              style={{ background: severityBg, border: `1px solid ${severityColor}33` }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: severityColor }} />
              <span className="text-sm font-body font-semibold" style={{ color: severityColor }}>
                {template.severity} Severity
              </span>
            </div>
          </div>

          {/* Summary */}
          <div
            className="p-6 rounded-2xl"
            style={{
              background: 'rgba(13,13,22,0.8)',
              border: '1px solid rgba(196,151,59,0.15)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <p className="text-xs font-body font-medium tracking-wider uppercase text-gray-500 mb-4">
              Diagnostic Summary
            </p>
            <p className="text-sm font-body text-gray-300 leading-relaxed mb-6">
              {template.summary}
            </p>

            <div className="gold-divider mb-5" />

            <div>
              <p className="text-[10px] font-body font-medium tracking-wider uppercase text-gray-600 mb-2">
                Estimated Impact
              </p>
              <p className="text-xs font-body text-gray-400 leading-relaxed">
                {template.leakage}
              </p>
            </div>
          </div>
        </div>

        {/* Priority Actions */}
        <div
          className="p-7 rounded-2xl mb-8"
          style={{
            background: 'rgba(13,13,22,0.8)',
            border: '1px solid rgba(196,151,59,0.15)',
            backdropFilter: 'blur(8px)',
            opacity: actionsVisible ? 1 : 0,
            transform: actionsVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(196,151,59,0.15)', border: '1px solid rgba(196,151,59,0.25)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1v14M1 8h14" stroke="#C4973B" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h3 className="font-body font-semibold text-sm text-white">
                Recommended Priority Actions
              </h3>
              <p className="text-xs font-body text-gray-600">
                Executive action plan · Immediate impact potential
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {template.actions.map((action, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-white/[0.02]"
                style={{
                  border: '1px solid rgba(196,151,59,0.08)',
                  opacity: actionsVisible ? 1 : 0,
                  animationDelay: `${i * 100}ms`,
                }}
              >
                {/* Priority number */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-body font-bold flex-shrink-0 mt-0.5"
                  style={{
                    background: i === 0 ? severityBg : 'rgba(196,151,59,0.08)',
                    border: `1px solid ${i === 0 ? severityColor + '66' : 'rgba(196,151,59,0.2)'}`,
                    color: i === 0 ? severityColor : '#C4973B',
                  }}
                >
                  {i + 1}
                </div>

                <div className="flex-1">
                  <p className="text-sm font-body text-gray-300 leading-snug">{action}</p>
                </div>

                {i === 0 && (
                  <span
                    className="text-[10px] font-body font-semibold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                    style={{
                      background: severityBg,
                      color: severityColor,
                      border: `1px solid ${severityColor}33`,
                    }}
                  >
                    FIRST
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          className="relative overflow-hidden p-8 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(196,151,59,0.1) 0%, rgba(26,26,80,0.3) 100%)',
            border: '1px solid rgba(196,151,59,0.25)',
          }}
        >
          {/* Corner decoration */}
          <div
            className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
            style={{ background: 'radial-gradient(circle at top right, rgba(196,151,59,0.12), transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none"
            style={{ background: 'radial-gradient(circle at bottom left, rgba(26,26,100,0.3), transparent 70%)' }}
          />

          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-body font-medium tracking-wider"
              style={{
                background: 'rgba(196,151,59,0.12)',
                border: '1px solid rgba(196,151,59,0.3)',
                color: '#D4A94B',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4" stroke="#D4A94B" strokeWidth="1" />
                <path d="M3 5l1.5 1.5L7 3.5" stroke="#D4A94B" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              NEXT STEP
            </div>

            <h3
              className="font-display font-bold mb-3"
              style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #D0D0D0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Book a Strategic Consultation
              <br />
              with MBSA Advisory
            </h3>

            <p className="text-sm font-body text-gray-400 mb-7 max-w-md mx-auto leading-relaxed">
              Our senior advisors will analyze your diagnostic results and design a
              customized intervention roadmap to address your primary bottleneck.
            </p>

            <button
              onClick={handleScheduleCall}
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-body font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-105 active:scale-100 mb-4"
              style={{
                background: 'linear-gradient(135deg, #C4973B 0%, #D4A94B 50%, #A07828 100%)',
                color: '#07070F',
                boxShadow: '0 8px 32px rgba(196,151,59,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 48px rgba(196,151,59,0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(196,151,59,0.3)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="2" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 1v2M11 1v2M1 6h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Schedule Strategic Call
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div>
              <button
                onClick={onRestart}
                className="text-xs font-body text-gray-600 hover:text-gold transition-colors underline underline-offset-2"
              >
                Run another diagnostic
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <div className="gold-divider mb-6" />
          <p className="text-xs font-body text-gray-700">
            This diagnostic is generated by the MBSA Advisory Strategic Intelligence Platform.
            Results are indicative and based on your responses. Consult an MBSA advisor for a comprehensive assessment.
          </p>
        </div>
      </div>
    </div>
  );
}
