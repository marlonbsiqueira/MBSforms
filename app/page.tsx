'use client';

import React, { useState, useCallback } from 'react';
import LandingHero from '@/components/LandingHero';
import CategorySelector from '@/components/CategorySelector';
import QuestionFlow from '@/components/QuestionFlow';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { categories } from '@/lib/diagnosticData';
import { generateReport, DiagnosticReport } from '@/lib/reportGenerator';
import { Lang } from '@/lib/translations';

type Step = 'landing' | 'category' | 'questions' | 'lead';

export default function Home() {
  const [step, setStep] = useState<Step>('landing');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [report, setReport] = useState<DiagnosticReport | null>(null);
  const [lang, setLang] = useState<Lang>('en');

  const toggleLang = useCallback(() => setLang((l) => (l === 'en' ? 'pt' : 'en')), []);
  const handleStart = useCallback(() => setStep('category'), []);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setStep('questions');
  }, []);

  const handleQuestionsComplete = useCallback(
    (answers: number[]) => {
      if (!selectedCategoryId) return;
      const r = generateReport(selectedCategoryId, answers);
      setReport(r);
      setStep('lead');
    },
    [selectedCategoryId]
  );

  const handleRestart = useCallback(() => {
    setSelectedCategoryId(null);
    setReport(null);
    setStep('landing');
  }, []);

  const selectedCategory = selectedCategoryId
    ? categories.find((c) => c.id === selectedCategoryId) ?? null
    : null;

  return (
    <main>
      {step === 'landing' && (
        <LandingHero onStart={handleStart} lang={lang} onToggleLang={toggleLang} />
      )}
      {step === 'category' && (
        <CategorySelector onSelect={handleCategorySelect} onBack={handleRestart} lang={lang} onToggleLang={toggleLang} />
      )}
      {step === 'questions' && selectedCategory && (
        <QuestionFlow category={selectedCategory} onComplete={handleQuestionsComplete} onBack={() => setStep('category')} lang={lang} onToggleLang={toggleLang} />
      )}
      {step === 'lead' && report && (
        <LeadCaptureForm report={report} onRestart={handleRestart} lang={lang} onToggleLang={toggleLang} />
      )}
    </main>
  );
}
