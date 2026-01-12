/**
 * The Manifesto sequence
 * Arabic → Korean → Hindi → Russian → S00K
 * 
 * Now includes narrative sentences with embedded foreign scripts
 * using conversational "In [Language]..." structure
 */

export interface SookStep {
  id: string;
  script: string;
  phonetic: string;
  meaning: string;
  narrativeHTML?: string; // New: HTML narrative with embedded script
  color: string;
  font: string;
  isFinal: boolean;
}

export const sookSteps: SookStep[] = [
  {
    id: 'arabic',
    script: 'سوق',
    phonetic: 'SOUQ',
    meaning: 'MARKETPLACE',
    narrativeHTML: 'In the Arabic world, the <span class="embedded-script" style="font-family: \'Noto Naskh Arabic\', serif; color: #C05621;">سوق</span> is where culture trades.',
    color: '#3a3a3a',
    font: "'Noto Naskh Arabic', serif",
    isFinal: false,
  },
  {
    id: 'korean',
    script: '숙',
    phonetic: 'SUK',
    meaning: 'VIRTUE & CHARACTER',
    narrativeHTML: 'In Korean, <span class="embedded-script" style="font-family: \'Noto Sans KR\', sans-serif; color: #5C7A7C;">숙</span> means virtue and purity.',
    color: '#3a3a3a',
    font: "'Noto Sans KR', sans-serif",
    isFinal: false,
  },
  {
    id: 'hindi',
    script: 'सुख',
    phonetic: 'SUKH',
    meaning: 'HAPPINESS & EASE',
    narrativeHTML: 'In Hindi, <span class="embedded-script" style="font-family: \'Noto Sans Devanagari\', sans-serif; color: #D69E2E;">सुख</span> is the state of happiness.',
    color: '#3a3a3a',
    font: "'Noto Sans Devanagari', sans-serif",
    isFinal: false,
  },
  {
    id: 'russian',
    script: 'сук',
    phonetic: 'SUK',
    meaning: 'GROWTH & ROOTS',
    narrativeHTML: 'In Russian, <span class="embedded-script" style="font-family: \'Roboto\', sans-serif; color: #1B3B36;">сук</span> is the branch that connects us.',
    color: '#3a3a3a',
    font: "'Roboto', sans-serif",
    isFinal: false,
  },
  {
    id: 'final',
    script: 'S00K',
    phonetic: '',
    meaning: 'WELCOME TO THE MARKETPLACE',
    color: '#ffffff',
    font: "'Montserrat', sans-serif",
    isFinal: true,
  },
];
