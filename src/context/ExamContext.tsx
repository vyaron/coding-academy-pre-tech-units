import { createContext, useContext, useReducer, ReactNode } from 'react';
import type { Exam, Answers, Results, Question, OrderQuestion, TrueFalseQuestion } from '../types/exam';

// ── State ────────────────────────────────────────────────────────────────────

type Screen = 'home' | 'exam' | 'results';

interface State {
  screen: Screen;
  exam: Exam | null;
  currentIndex: number;
  answers: Answers;
  flags: Set<number>;
  shuffledOrders: Record<number, number[]>;
  timeLeft: number;
  startTime: number | null;
  endTime: number | null;
  results: Results | null;
}

const initialState: State = {
  screen: 'home',
  exam: null,
  currentIndex: 0,
  answers: {},
  flags: new Set(),
  shuffledOrders: {},
  timeLeft: 0,
  startTime: null,
  endTime: null,
  results: null,
};

// ── Actions ──────────────────────────────────────────────────────────────────

type Action =
  | { type: 'LOAD_EXAM'; exam: Exam }
  | { type: 'SET_ANSWER'; qId: number; answer: number | number[] }
  | { type: 'SET_ORDER'; qId: number; order: number[] }
  | { type: 'TOGGLE_FLAG'; qId: number }
  | { type: 'GO_TO'; index: number }
  | { type: 'TICK' }
  | { type: 'FINISH' }
  | { type: 'RESTART' };

// ── Helpers ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function computeResults(exam: Exam, answers: Answers, shuffledOrders: Record<number, number[]>): Results {
  let totalPoints = 0;
  let earned = 0;
  let correct = 0;
  let wrong = 0;
  let unanswered = 0;

  const perQuestion = exam.questions.map((q) => {
    totalPoints += q.points;
    const ans = answers[q.id];

    if (ans === undefined || ans === null) {
      unanswered++;
      return { q, correct: false, earned: 0 };
    }

    let isCorrect = false;

    if (q.type === 'single' || q.type === 'code') {
      isCorrect = ans === q.correct;
    } else if (q.type === 'truefalse') {
      isCorrect = ans === ((q as TrueFalseQuestion).correct ? 1 : 0);
    } else if (q.type === 'order') {
      const order = shuffledOrders[q.id] ?? [];
      const n = (q as OrderQuestion).items.length;
      isCorrect = order.length === n && order.every((v, i) => v === i);
    }

    if (isCorrect) {
      earned += q.points;
      correct++;
    } else {
      wrong++;
    }

    return { q, correct: isCorrect, earned: isCorrect ? q.points : 0 };
  });

  const score = totalPoints > 0 ? Math.round((earned / totalPoints) * 100) : 0;

  return {
    score,
    passed: score >= exam.passingScore,
    earned,
    total: totalPoints,
    correct,
    wrong,
    unanswered,
    timeTaken: 0, // set by reducer
    perQuestion,
  };
}

// ── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOAD_EXAM': {
      const { exam } = action;
      const shuffledOrders: Record<number, number[]> = {};
      exam.questions.forEach((q) => {
        if (q.type === 'order') {
          const n = (q as OrderQuestion).items.length;
          shuffledOrders[q.id] = shuffle(Array.from({ length: n }, (_, i) => i));
        }
      });
      return {
        ...initialState,
        screen: 'exam',
        exam,
        answers: {},
        flags: new Set(),
        shuffledOrders,
        timeLeft: exam.duration,
        startTime: Date.now(),
      };
    }

    case 'SET_ANSWER':
      return {
        ...state,
        answers: { ...state.answers, [action.qId]: action.answer },
      };

    case 'SET_ORDER': {
      const newOrders = { ...state.shuffledOrders, [action.qId]: action.order };
      return {
        ...state,
        shuffledOrders: newOrders,
        answers: { ...state.answers, [action.qId]: action.order },
      };
    }

    case 'TOGGLE_FLAG': {
      const flags = new Set(state.flags);
      if (flags.has(action.qId)) flags.delete(action.qId);
      else flags.add(action.qId);
      return { ...state, flags };
    }

    case 'GO_TO':
      return { ...state, currentIndex: action.index };

    case 'TICK':
      if (state.timeLeft <= 0) return state;
      return { ...state, timeLeft: state.timeLeft - 1 };

    case 'FINISH': {
      if (!state.exam) return state;
      const endTime = Date.now();
      const results = computeResults(state.exam, state.answers, state.shuffledOrders);
      results.timeTaken = endTime - (state.startTime ?? endTime);
      return { ...state, screen: 'results', endTime, results };
    }

    case 'RESTART':
      return { ...initialState };

    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────────────────────

interface ExamContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
  currentQuestion: Question | null;
  answeredCount: number;
  totalQuestions: number;
}

const ExamContext = createContext<ExamContextValue | null>(null);

export function ExamProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const currentQuestion = state.exam?.questions[state.currentIndex] ?? null;
  const answeredCount = Object.keys(state.answers).length;
  const totalQuestions = state.exam?.questions.length ?? 0;

  return (
    <ExamContext.Provider value={{ state, dispatch, currentQuestion, answeredCount, totalQuestions }}>
      {children}
    </ExamContext.Provider>
  );
}

export function useExam() {
  const ctx = useContext(ExamContext);
  if (!ctx) throw new Error('useExam must be used within ExamProvider');
  return ctx;
}
