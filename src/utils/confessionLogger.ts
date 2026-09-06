import { AnswersMap } from '../types';
import { MATTER_CARDS } from '../data/storyData';

export interface ConfessionLogData {
  timestamp: string;
  exactMoment: string;
  answers: AnswersMap;
}

const STORAGE_KEY = 'mr_robot_confession_log';

export const generateLogText = (answers: AnswersMap, exactMoment: string, timestamp?: string): string => {
  const dateStr = timestamp || new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const lines: string[] = [];
  lines.push('============================================================');
  lines.push('💌 TO MR. ROBOT — ISHU’S CONFESSION & ANSWERS LOG FILE 💌');
  lines.push('============================================================');
  lines.push(`Generated on : ${dateStr}`);
  lines.push('Recipient    : Mr. Robot (Nachiket)');
  lines.push('From         : Ishu');
  lines.push('Soundtrack   : Rait Zara Si (Atrangi Re)');
  lines.push('------------------------------------------------------------\n');

  lines.push('🦋 [HIS EXACT BUTTERFLY MOMENT]');
  if (exactMoment && exactMoment.trim()) {
    lines.push(`"${exactMoment.trim()}"\n`);
  } else {
    lines.push('(He hasn’t written down his moment yet)\n');
  }

  lines.push('------------------------------------------------------------');
  lines.push('📋 [HIS ANSWERS TO WHAT MATTERS TO ME]');
  lines.push('------------------------------------------------------------');

  MATTER_CARDS.forEach((card, index) => {
    const padNum = String(index + 1).padStart(2, '0');
    const total = String(MATTER_CARDS.length).padStart(2, '0');
    const ans = answers[card.id] || 'Pending / Not answered yet';
    lines.push(`Card [${padNum}/${total}]: ${card.question}`);
    lines.push(`   Supporting : ${card.supporting.replace(/\n/g, ' ')}`);
    lines.push(`   His Answer : ${ans}`);
    lines.push('');
  });

  const answeredCount = Object.keys(answers).length;
  lines.push('------------------------------------------------------------');
  lines.push(`SUMMARY STATS : ${answeredCount} of ${MATTER_CARDS.length} questions answered`);
  lines.push('INTEGRITY     : Verified & logged directly in Ishu’s private vault');
  lines.push('============================================================\n');

  return lines.join('\n');
};

export const saveConfessionLog = (answers: AnswersMap, exactMoment: string) => {
  try {
    const data: ConfessionLogData = {
      timestamp: new Date().toISOString(),
      exactMoment,
      answers,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to persist confession log:', err);
  }
};

export const loadConfessionLog = (): ConfessionLogData | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConfessionLogData;
  } catch {
    return null;
  }
};

export const downloadFile = (filename: string, content: string, mimeType: string = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
