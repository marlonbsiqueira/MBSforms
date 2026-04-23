'use client';

import React, { useState, useCallback } from 'react';
import LandingHero from '@/components/LandingHero';
import CategorySelector from '@/components/CategorySelector';
import QuestionFlow from '@/components/QuestionFlow';
import FinalReport from '@/components/FinalReport';
import { categories } from '@/lib/diagnosticData';
import { generateReport, DiagnosticReport } from '@/lib/reportGenerator';

type Step = 'landing' | 'category' | 'questions' | 'report';

export default function Home() {
  const [step, setStep] = useState<Step>('landing');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [report, setReport] = useState<DiagnosticReport | null>(null);

  const handleStart = useCallback(() => {
    setStep('category');
  }, []);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setStep('questions');
  }, []);

  const handleQuestionsComplete = useCallback(
    (answers: number[]) => {
      if (!selectedCategoryId) return;
      const r = generateReport(selectedCategoryId, answers);
      setReport(r);
      setStep('report');
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
      {step === 'landing' && <LandingHero onStart={handleStart} />}
      {step === 'category' && (
        <CategorySelector
          onSelect={handleCategorySelect}
          onBack={handleRestart}
        />
      )}
      {step === 'questions' && selectedCategory && (
        <QuestionFlow
          category={selectedCategory}
          onComplete={handleQuestionsComplete}
          onBack={() => setStep('category')}
        />
      )}
      {step === 'report' && report && (
        <FinalReport report={report} onRestart={handleRestart} />
      )}
    </main>
  );
}
