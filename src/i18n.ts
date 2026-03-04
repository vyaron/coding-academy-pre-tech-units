interface UIStrings {
  timeRemaining: string;
  progress: string;
  questions: string;
  done: string;
  flagged: string;
  active: string;
  todo: string;
  finishExam: string;
  prev: string;
  next: string;
  flag: string;
  flaggedBtn: string;
  finishTitle: string;
  unanswered: (n: number) => string;
  allAnswered: string;
  submit: string;
  cancel: string;
}

const en: UIStrings = {
  timeRemaining: '// TIME REMAINING',
  progress:    'PROGRESS',
  questions:   '// QUESTIONS',
  done:        'DONE',
  flagged:     'FLAGGED',
  active:      'ACTIVE',
  todo:        'TODO',
  finishExam:  '■ FINISH EXAM',
  prev:        '← PREV',
  next:        'NEXT →',
  flag:        'FLAG',
  flaggedBtn:  'FLAGGED',
  finishTitle: 'FINISH EXAM?',
  unanswered:  (n) => `${n} question${n !== 1 ? 's' : ''} still unanswered.`,
  allAnswered: 'All questions answered.',
  submit:      'SUBMIT',
  cancel:      'CANCEL',
};

const he: UIStrings = {
  timeRemaining: '// זמן נותר',
  progress:    'התקדמות',
  questions:   '// שאלות',
  done:        'נענה',
  flagged:     'מסומן',
  active:      'פעיל',
  todo:        'ממתין',
  finishExam:  '■ סיים מבחן',
  prev:        'הקודם →',
  next:        '← הבא',
  flag:        'סמן',
  flaggedBtn:  'מסומן',
  finishTitle: 'לסיים את המבחן?',
  unanswered:  (n) => `${n} שאלות עדיין לא נענו.`,
  allAnswered: 'כל השאלות נענו.',
  submit:      'הגש',
  cancel:      'ביטול',
};

const strings: Record<string, UIStrings> = { en, he };

export function t(lang: string): UIStrings {
  return strings[lang] ?? en;
}
