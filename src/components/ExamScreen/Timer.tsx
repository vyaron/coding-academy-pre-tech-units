import { useExam } from '../../context/ExamContext';
import { useTimer } from '../../hooks/useTimer';
import { t } from '../../i18n';

function formatTime(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
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
      <div className={cls}>{formatTime(state.timeLeft)}</div>
    </div>
  );
}
