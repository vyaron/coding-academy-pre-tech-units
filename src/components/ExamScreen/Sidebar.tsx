import { useExam } from '../../context/ExamContext';
import { t } from '../../i18n';
import Timer from './Timer';
import './ExamScreen.css';

export default function Sidebar({ onFinish }: { onFinish: () => void }) {
  const { state, dispatch, answeredCount, totalQuestions } = useExam();
  const { exam, currentIndex, answers, flags } = state;
  if (!exam) return null;

  const pct = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;
  const ui = t(exam.lang);

  return (
    <aside className="exam-sidebar" dir={exam.direction}>
      <Timer />

      {/* Progress */}
      <div>
        <div className="sidebar-progress-text">
          <span className="sidebar-section-label">{ui.progress}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>
            {answeredCount}/{totalQuestions}
          </span>
        </div>
        <div className="sidebar-progress-bar">
          <div className="sidebar-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Grid */}
      <div>
        <div className="sidebar-section-label">{ui.questions}</div>
        <div className="q-grid">
          {exam.questions.map((q, i) => {
            const answered = answers[q.id] !== undefined;
            const flagged  = flags.has(q.id);
            const current  = i === currentIndex;
            const cls = [
              'q-grid-btn',
              current  ? 'current'  : '',
              flagged  ? 'flagged'  : '',
              answered ? 'answered' : '',
            ].filter(Boolean).join(' ');

            return (
              <button
                key={q.id}
                className={cls}
                onClick={() => dispatch({ type: 'GO_TO', index: i })}
                title={`Q${i + 1}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="sidebar-legend">
        <div className="legend-item">
          <div className="legend-dot answered" />
          <span>{ui.done}</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot flagged" />
          <span>{ui.flagged}</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot current" />
          <span>{ui.active}</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot todo" />
          <span>{ui.todo}</span>
        </div>
      </div>

      <div className="sidebar-spacer" />

      <button className="btn-finish-sidebar" onClick={onFinish}>
        {ui.finishExam}
      </button>
    </aside>
  );
}
