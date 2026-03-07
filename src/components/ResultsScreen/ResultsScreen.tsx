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
    const tier = score >= 70 ? 'high' : score >= 40 ? 'mid' : 'low';
    const tierLabel   = tier === 'high' ? 'התאמה גבוהה'   : tier === 'mid' ? 'התאמה בינונית' : 'התאמה נמוכה';
    const tierColor   = tier === 'high' ? 'var(--green)'   : tier === 'mid' ? 'var(--cyan)'    : 'var(--text-dim)';
    const ctaText     = tier === 'high'
      ? 'נשמח ללוות אותך בתהליך'
      : tier === 'mid'
      ? 'נשמח לסייע לך לשפר תוצאות וללוות אותך בתהליך'
      : 'סקרנות ורצון פעיל הן התכונות החשובות ביותר, נשמח לתמוך בך בתהליך ההכנה';

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
            <div className="score-verdict" style={{ fontSize: '1.6rem', color: tierColor }}>{tierLabel}</div>
            <div className="score-detail" style={{ marginTop: '0.4rem' }}>
              ענית על {results.perQuestion.length - unanswered} מתוך {results.perQuestion.length} שאלות
              {unanswered > 0 && ` · ${unanswered} לא נענו`}
            </div>
          </div>

          <ReviewAccordion perQuestion={results.perQuestion} />

          <div className="results-cta" dir="rtl">
            <p className="results-cta-text">{ctaText}</p>
            <a className="btn-cta" href="https://www.coding-academy.org/#contact" target="_blank" rel="noopener noreferrer">
              צור קשר
            </a>
          </div>
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
