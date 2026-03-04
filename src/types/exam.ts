export type QuestionType = 'single' | 'code' | 'order';

interface BaseQuestion {
  id: number;
  type: QuestionType;
  text: string;
  points: number;
}

export interface SingleQuestion extends BaseQuestion {
  type: 'single';
  options: string[];
  correct: number;
}

export interface CodeQuestion extends BaseQuestion {
  type: 'code';
  code: string;
  language: string;
  options: string[];
  correct: number;
}

export interface OrderQuestion extends BaseQuestion {
  type: 'order';
  items: string[];
}

export type Question = SingleQuestion | CodeQuestion | OrderQuestion;

export interface Exam {
  title: string;
  subtitle?: string;
  direction: 'ltr' | 'rtl';
  lang: string;
  duration: number;     // seconds; 0 = no timer
  passingScore: number; // 0–100
  questions: Question[];
}

export type Answers = Record<number, number | number[]>;

export interface PerQuestionResult {
  q: Question;
  correct: boolean;
  earned: number;
}

export interface Results {
  score: number;
  passed: boolean;
  earned: number;
  total: number;
  correct: number;
  wrong: number;
  unanswered: number;
  timeTaken: number; // ms
  perQuestion: PerQuestionResult[];
}
