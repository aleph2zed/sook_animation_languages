/**
 * The Manifesto sequence
 * Arabic → Korean → Hindi → Russian → S00K
 */

export interface SookStep {
  id: string;
  script: string;
  phonetic: string;
  meaning: string;
  color: string;
  font: string;
  isFinal: boolean;
}

export const sookSteps: SookStep[] = [
  {
    id: 'arabic',
    script: 'سوق',
    phonetic: 'SOUQ',
    meaning: 'MARKET & COMMERCE',
    color: '#C05621',
    font: "'Noto Naskh Arabic', serif",
    isFinal: false,
  },
  {
    id: 'korean',
    script: '숙',
    phonetic: 'SUK',
    meaning: 'VIRTUE & CHARACTER',
    color: '#5C7A7C',
    font: "'Noto Sans KR', sans-serif",
    isFinal: false,
  },
  {
    id: 'hindi',
    script: 'सुख',
    phonetic: 'SUKH',
    meaning: 'HAPPINESS & EASE',
    color: '#D69E2E',
    font: "'Noto Sans Devanagari', sans-serif",
    isFinal: false,
  },
  {
    id: 'russian',
    script: 'сук',
    phonetic: 'SUK',
    meaning: 'GROWTH & ROOTS',
    color: '#1B3B36',
    font: "'Roboto', sans-serif",
    isFinal: false,
  },
  {
    id: 'final',
    script: 'S00K',
    phonetic: '',
    meaning: 'WELCOME TO THE MARKETPLACE',
    color: '#0a0a0f',
    font: "'Montserrat', sans-serif",
    isFinal: true,
  },
];
