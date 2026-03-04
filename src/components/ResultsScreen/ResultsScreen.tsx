import { useNavigate } from 'react-router-dom';
import { useExam } from '../../context/ExamContext';
import ScoreCircle from './ScoreCircle';
import ReviewAccordion from './ReviewAccordion';
import './ResultsScreen.css';

export default function ResultsScreen() {
  const navigate = useNavigate();
  const { state, dispatch } = useExam();
  const { results, exam } = state;
  if (!results || !exam) return null;

  const { score, passed, correct, wrong, unanswered, earned, total } = results;
  const answeredCount = total - unanswered;

  if (exam.isPersonality) {
    return (
      <div className="results-screen">
        <header className="results-header">
          <div>
            <div className="results-header-title">// השאלון הושלם</div>
            <div className="results-header-sub">{exam.title}</div>
          </div>
          <button className="btn-restart" onClick={() => { dispatch({ type: 'RESTART' }); navigate('/quiz'); }}>
            ↩ חזרה לרשימה
          </button>
        </header>

        <div className="results-body">
          <div className="results-score-section">
            <div className="score-verdict pass" style={{ fontSize: '2rem' }}>✓ הושלם</div>
            <div className="score-detail">
              ענית על {answeredCount} מתוך {total} שאלות
              {unanswered > 0 && ` · ${unanswered} לא נענו`}
            </div>
          </div>

          <ReviewAccordion perQuestion={results.perQuestion} />
        </div>
      </div>
    );
  }

  return (
    <div className="results-screen">
      <header className="results-header">
        <div>
          <div className="results-header-title">// תוצאות המבחן</div>
          <div className="results-header-sub">{exam.title}</div>
        </div>
        <button className="btn-restart" onClick={() => { dispatch({ type: 'RESTART' }); navigate('/quiz'); }}>
          ↩ חזרה לרשימה
        </button>
      </header>

      <div className="results-body">
        {/* Score */}
        <div className="results-score-section">
          <ScoreCircle score={score} passed={passed} />
          <div className={`score-verdict ${passed ? 'pass' : 'fail'}`}>
            {passed ? '✓ עברת את המבחן' : '✗ לא עברת את המבחן'}
          </div>
          <div className="score-detail">
            ציון עובר: {exam.passingScore}% &nbsp;|&nbsp; הציון שלך: {score}%
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value" style={{ color: 'var(--green)' }}>{correct}</span>
            <span className="stat-label">נכון</span>
          </div>
          <div className="stat-card">
            <span className="stat-value" style={{ color: 'var(--red)' }}>{wrong}</span>
            <span className="stat-label">שגוי</span>
          </div>
          <div className="stat-card">
            <span className="stat-value" style={{ color: 'var(--text-dim)' }}>{unanswered}</span>
            <span className="stat-label">דולג</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{earned}/{total}</span>
            <span className="stat-label">נקודות</span>
          </div>
        </div>

        {/* Review */}
        <ReviewAccordion perQuestion={results.perQuestion} />
      </div>
    </div>
  );
}
