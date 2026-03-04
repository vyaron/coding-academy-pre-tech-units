import { useExam } from '../../context/ExamContext';
import SingleChoice from './questions/SingleChoice';
import CodeQuestion from './questions/CodeQuestion';
import OrderQuestion from './questions/OrderQuestion';
import type { SingleQuestion, CodeQuestion as CQType, OrderQuestion as OQType } from '../../types/exam';

export default function QuestionArea() {
  const { state, dispatch, currentQuestion, totalQuestions } = useExam();
  if (!currentQuestion || !state.exam) return null;

  const { currentIndex, answers, flags, shuffledOrders, exam } = state;
  const q = currentQuestion;
  const qNum = currentIndex + 1;
  const dir = exam.direction;
  const isFlagged = flags.has(q.id);
  const rawAnswer = answers[q.id];

  function handleSelect(idx: number) {
    dispatch({ type: 'SET_ANSWER', qId: q.id, answer: idx });
    if (currentIndex + 1 < totalQuestions) {
      setTimeout(() => dispatch({ type: 'GO_TO', index: currentIndex + 1 }), 300);
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
          <span className="q-badge">Q{qNum} / {totalQuestions}</span>
          <span className="q-points-badge">{q.points} pts</span>
          <button
            className={`q-flag-btn${isFlagged ? ' active' : ''}`}
            onClick={() => dispatch({ type: 'TOGGLE_FLAG', qId: q.id })}
          >
            <span>⚑</span>
            {isFlagged ? 'FLAGGED' : 'FLAG'}
          </button>
        </div>

        {/* Question text */}
        <p className="q-text">{q.text}</p>

        {/* Question type */}
        {q.type === 'single' && (
          <SingleChoice
            question={q as SingleQuestion}
            selected={typeof rawAnswer === 'number' ? rawAnswer : null}
            onSelect={handleSelect}
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
      </div>
    </main>
  );
}
