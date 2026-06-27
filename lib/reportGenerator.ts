import { categories, Category, ReportTemplate } from './diagnosticData';

export interface DiagnosticReport {
  category: Category;
  answers: number[];
  totalScore: number;
  template: ReportTemplate;
}

export function generateReport(categoryId: string, answers: number[]): DiagnosticReport {
  const category = categories.find((c) => c.id === categoryId)!;
  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const template = category.report.find(
    (r) => totalScore >= r.minScore && totalScore <= r.maxScore
  ) ?? category.report[category.report.length - 1];

  return { category, answers, totalScore, template };
}

export function getSeverityColor(severity: ReportTemplate['severity']): string {
  const map: Record<string, string> = {
    Low: '#4CAF7D',
    Moderate: '#F0C040',
    High: '#F08040',
    Critical: '#E04040',
  };
  return map[severity] ?? '#C4973B';
}

export function getSeverityBg(severity: ReportTemplate['severity']): string {
  const map: Record<string, string> = {
    Low: 'rgba(76,175,125,0.12)',
    Moderate: 'rgba(240,192,64,0.12)',
    High: 'rgba(240,128,64,0.12)',
    Critical: 'rgba(224,64,64,0.12)',
  };
  return map[severity] ?? 'rgba(196,151,59,0.12)';
}

export function getScorePercentage(totalScore: number): number {
  const raw = Math.round(((totalScore - 5) / 15) * 100);
  return Math.max(0, Math.min(100, raw));
}
