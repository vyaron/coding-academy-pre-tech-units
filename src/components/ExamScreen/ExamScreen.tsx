import { useState } from 'react';
import { useExam } from '../../context/ExamContext';
import { useKeyboard } from '../../hooks/useKeyboard';
import { t } from '../../i18n';
import Sidebar from './Sidebar';
import QuestionArea from './QuestionArea';
import Modal from '../ui/Modal';
import './ExamScreen.css';

export default function ExamScreen() {
  const { state, dispatch, totalQuestions, answeredCount } = useExam();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { currentIndex } = state;
  const ui = t(state.exam?.lang ?? 'en');

  function next() {
    if (currentIndex < totalQuestions - 1) dispatch({ type: 'GO_TO', index: currentIndex + 1 });
  }

  function prev() {
    if (currentIndex > 0) dispatch({ type: 'GO_TO', index: currentIndex - 1 });
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
      </div>

      {confirmOpen && (
        <Modal
          icon="⚠"
          title={ui.finishTitle}
          message={unanswered > 0 ? ui.unanswered(unanswered) : ui.allAnswered}
          confirmLabel={ui.submit}
          cancelLabel={ui.cancel}
          onConfirm={() => { setConfirmOpen(false); dispatch({ type: 'FINISH' }); }}
          onCancel={() => setConfirmOpen(false)}
          danger={unanswered > 0}
        />
      )}
    </>
  );
}
