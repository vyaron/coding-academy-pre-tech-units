import { useState } from 'react';
import { useExam } from '../../context/ExamContext';
import { useKeyboard } from '../../hooks/useKeyboard';
import Sidebar from './Sidebar';
import QuestionArea from './QuestionArea';
import Modal from '../ui/Modal';
import './ExamScreen.css';

export default function ExamScreen() {
  const { state, dispatch, totalQuestions, answeredCount } = useExam();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { currentIndex } = state;
  const isFirst = currentIndex === 0;
  const isLast  = currentIndex === totalQuestions - 1;

  function next() {
    if (!isLast) dispatch({ type: 'GO_TO', index: currentIndex + 1 });
  }

  function prev() {
    if (!isFirst) dispatch({ type: 'GO_TO', index: currentIndex - 1 });
  }

  function flagCurrent() {
    const q = state.exam?.questions[currentIndex];
    if (q) dispatch({ type: 'TOGGLE_FLAG', qId: q.id });
  }

  useKeyboard({ onNext: next, onPrev: prev, onFlag: flagCurrent, enabled: true });

  const unanswered = totalQuestions - answeredCount;

  return (
    <>
      <div className="exam-layout">
        <Sidebar onFinish={() => setConfirmOpen(true)} />
        <QuestionArea />

        {/* Navigation bar */}
        <nav className="exam-nav">
          <button className="nav-btn" onClick={prev} disabled={isFirst}>
            ← PREV
          </button>
          <span className="nav-center mono">
            {currentIndex + 1} / {totalQuestions}
          </span>
          <button className="nav-btn" onClick={next} disabled={isLast}>
            NEXT →
          </button>
        </nav>
      </div>

      {confirmOpen && (
        <Modal
          icon="⚠"
          title="FINISH EXAM?"
          message={
            unanswered > 0
              ? `${unanswered} question${unanswered !== 1 ? 's' : ''} still unanswered.`
              : 'All questions answered.'
          }
          confirmLabel="SUBMIT"
          cancelLabel="CANCEL"
          onConfirm={() => { setConfirmOpen(false); dispatch({ type: 'FINISH' }); }}
          onCancel={() => setConfirmOpen(false)}
          danger={unanswered > 0}
        />
      )}
    </>
  );
}
