import { useExam } from '../../context/ExamContext';
import { useTimer } from '../../hooks/useTimer';
import { t } from '../../i18n';

function formatTime(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export default function Timer() {
  const { state, dispatch } = useExam();
  const hasDuration = (state.exam?.duration ?? 0) > 0;

  useTimer(
    hasDuration && state.screen === 'exam',
    () => dispatch({ type: 'TICK' }),
    () => dispatch({ type: 'FINISH' }),
    state.timeLeft
  );

  if (!hasDuration) return null;

  const cls =
    state.timeLeft <= 30 ? 'sidebar-timer-value crit' :
    state.timeLeft <= 120 ? 'sidebar-timer-value warn' :
    'sidebar-timer-value';

  const ui = t(state.exam?.lang ?? 'en');

  return (
    <div className="sidebar-timer">
      <div className="sidebar-section-label">{ui.timeRemaining}</div>
      <div className={cls}>
        {formatTime(state.timeLeft)}
        <svg className="sidebar-timer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>
    </div>
  );
}
