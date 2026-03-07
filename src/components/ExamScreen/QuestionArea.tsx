import { useState } from 'react';
import { useExam } from '../../context/ExamContext';
import { t } from '../../i18n';
import SingleChoice from './questions/SingleChoice';
import CodeQuestion from './questions/CodeQuestion';
import OrderQuestion from './questions/OrderQuestion';
import TrueFalseQuestion from './questions/TrueFalseQuestion';
import StoryModal from '../ui/StoryModal';
import type { SingleQuestion, CodeQuestion as CQType, OrderQuestion as OQType, TrueFalseQuestion as TFType, PersonalityQuestion as PQType } from '../../types/exam';

export default function QuestionArea() {
  const { state, dispatch, currentQuestion, totalQuestions } = useExam();
  const [storyOpen, setStoryOpen] = useState(false);

  if (!currentQuestion || !state.exam) return null;

  const { currentIndex, answers, flags, shuffledOrders, exam } = state;
  const q = currentQuestion;
  const qNum = currentIndex + 1;
  const dir = exam.direction;
  const isFlagged = flags.has(q.id);
  const rawAnswer = answers[q.id];
  const ui = t(exam.lang);

  function handleSelect(idx: number) {
    dispatch({ type: 'SET_ANSWER', qId: q.id, answer: idx });
    if (currentIndex + 1 < totalQuestions) {
      setTimeout(() => dispatch({ type: 'GO_TO', index: currentIndex + 1 }), 700);
    }
  }

  function handleOrderChange(newOrder: number[]) {
    dispatch({ type: 'SET_ORDER', qId: q.id, order: newOrder });
  }

  return (
    <main className="exam-main" dir={dir}>
      <div className="q-area" key={q.id}>
        {/* Header */}
        <div className="q-header">
          <span className="q-badge">{ui.questionBadge(qNum, totalQuestions)}</span>
          {q.type !== 'personality' && <span className="q-points-badge">{q.points} pts</span>}
          {exam.story && (
            <button className="q-story-btn" onClick={() => setStoryOpen(true)}>
              <span>📖</span>
               הוראות וסיפור המבחן
            </button>
          )}
          {q.type !== 'personality' && (
            <button
              className={`q-flag-btn${isFlagged ? ' active' : ''}`}
              onClick={() => dispatch({ type: 'TOGGLE_FLAG', qId: q.id })}
            >
              <span>⚑</span>
              {isFlagged ? ui.flaggedBtn : ui.flag}
            </button>
          )}
        </div>

        {/* Question text */}
        <p className="q-text">{q.text}</p>

        {/* Question image (above options) */}
        {'image' in q && q.image && q.image.position !== 'below' && (
          <img
            className="q-image"
            src={q.image.url.startsWith('http') ? q.image.url : `${import.meta.env.BASE_URL}${q.image.url}`}
            alt={q.image.alt}
          />
        )}

        {/* Question type */}
        {(q.type === 'single' || q.type === 'personality') && (
          <SingleChoice
            question={q as SingleQuestion | PQType}
            selected={typeof rawAnswer === 'number' ? rawAnswer : null}
            onSelect={handleSelect}
            noCorrect={q.type === 'personality'}
          />
        )}

        {q.type === 'code' && (
          <CodeQuestion
            question={q as CQType}
            selected={typeof rawAnswer === 'number' ? rawAnswer : null}
            onSelect={handleSelect}
          />
        )}

        {q.type === 'order' && (
          <OrderQuestion
            question={q as OQType}
            order={shuffledOrders[q.id] ?? []}
            onOrderChange={handleOrderChange}
          />
        )}

        {q.type === 'truefalse' && (
          <TrueFalseQuestion
            question={q as TFType}
            selected={typeof rawAnswer === 'number' ? rawAnswer : null}
            onSelect={handleSelect}
            lang={exam.lang}
          />
        )}
      </div>

      {storyOpen && exam.story && (
        <StoryModal story={exam.story} onClose={() => setStoryOpen(false)} />
      )}
    </main>
  );
}
