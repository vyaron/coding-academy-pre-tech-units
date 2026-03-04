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

  return (
    <div className="results-screen">
      <header className="results-header">
        <div>
          <div className="results-header-title">// EXAM RESULTS</div>
          <div className="results-header-sub">{exam.title.toUpperCase()}</div>
        </div>
        <button className="btn-restart" onClick={() => { dispatch({ type: 'RESTART' }); navigate('/'); }}>
          ↩ NEW EXAM
        </button>
      </header>

      <div className="results-body">
        {/* Score */}
        <div className="results-score-section">
          <ScoreCircle score={score} passed={passed} />
          <div className={`score-verdict ${passed ? 'pass' : 'fail'}`}>
            {passed ? '✓ EXAM PASSED' : '✗ EXAM FAILED'}
          </div>
          <div className="score-detail">
            PASSING SCORE: {exam.passingScore}% &nbsp;|&nbsp; YOUR SCORE: {score}%
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value" style={{ color: 'var(--green)' }}>{correct}</span>
            <span className="stat-label">Correct</span>
          </div>
          <div className="stat-card">
            <span className="stat-value" style={{ color: 'var(--red)' }}>{wrong}</span>
            <span className="stat-label">Wrong</span>
          </div>
          <div className="stat-card">
            <span className="stat-value" style={{ color: 'var(--text-dim)' }}>{unanswered}</span>
            <span className="stat-label">Skipped</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{earned}/{total}</span>
            <span className="stat-label">Points</span>
          </div>
        </div>

        {/* Review */}
        <ReviewAccordion perQuestion={results.perQuestion} />
      </div>
    </div>
  );
}
