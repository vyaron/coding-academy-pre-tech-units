import { useState } from 'react';
import type { PerQuestionResult } from '../../types/exam';
import type { SingleQuestion, CodeQuestion as CQType, OrderQuestion as OQType } from '../../types/exam';
import SingleChoice from '../ExamScreen/questions/SingleChoice';
import CodeQuestion from '../ExamScreen/questions/CodeQuestion';
import OrderQuestion from '../ExamScreen/questions/OrderQuestion';
import { useExam } from '../../context/ExamContext';

interface Props {
  perQuestion: PerQuestionResult[];
}

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}m ${String(s).padStart(2, '0')}s`;
}

export default function ReviewAccordion({ perQuestion }: Props) {
  const { state } = useExam();
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const [allOpen, setAllOpen] = useState(false);

  function toggleAll() {
    const next = !allOpen;
    setAllOpen(next);
    const map: Record<number, boolean> = {};
    perQuestion.forEach((_, i) => { map[i] = next; });
    setOpen(map);
  }

  function toggle(i: number) {
    setOpen((prev) => ({ ...prev, [i]: !prev[i] }));
  }

  return (
    <div className="review-section">
      <div className="review-section-header">
        <span className="review-section-title">// ANSWER REVIEW</span>
        <button className="review-toggle-all" onClick={toggleAll}>
          {allOpen ? 'COLLAPSE ALL' : 'EXPAND ALL'}
        </button>
      </div>

      <div className="review-list" dir={state.exam?.direction}>
        {perQuestion.map((pq, i) => {
          const { q, correct, earned } = pq;
          const isOpen = open[i] ?? false;
          const rawAnswer = state.answers[q.id];
          const status = correct ? 'correct' : rawAnswer !== undefined ? 'wrong' : 'skip';

          return (
            <div key={q.id} className="review-item">
              <div
                className={`review-item-bar ${status}`}
                onClick={() => toggle(i)}
              >
                <span className="review-item-num">Q{i + 1}</span>
                <span className={`review-item-status ${status}`}>
                  {status === 'correct' ? '✓ CORRECT' : status === 'wrong' ? '✗ WRONG' : '— SKIPPED'}
                </span>
                <span className="review-item-text">{q.text}</span>
                <span className="review-item-pts">{earned}/{q.points}pts</span>
                <span className={`review-item-chevron${isOpen ? ' open' : ''}`}>▶</span>
              </div>

              {isOpen && (
                <div className="review-item-body">
                  <p className="q-text" style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>
                    {q.text}
                  </p>

                  {(q.type === 'single') && (
                    <SingleChoice
                      question={q as SingleQuestion}
                      selected={typeof rawAnswer === 'number' ? rawAnswer : null}
                      onSelect={() => {}}
                      reviewMode
                    />
                  )}

                  {q.type === 'code' && (
                    <CodeQuestion
                      question={q as CQType}
                      selected={typeof rawAnswer === 'number' ? rawAnswer : null}
                      onSelect={() => {}}
                      reviewMode
                    />
                  )}

                  {q.type === 'order' && (
                    <OrderQuestion
                      question={q as OQType}
                      order={Array.isArray(rawAnswer) ? rawAnswer : (q as OQType).items.map((_, idx) => idx)}
                      onOrderChange={() => {}}
                      reviewMode
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {state.results && (
        <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>
            // EXAM DURATION: {formatTime(state.results.timeTaken)}
          </span>
        </div>
      )}
    </div>
  );
}
