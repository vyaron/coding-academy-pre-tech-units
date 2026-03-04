interface Props {
  score: number;
  passed: boolean;
}

const R = 54;
const C = 120;
const CIRCUMFERENCE = 2 * Math.PI * R;

export default function ScoreCircle({ score, passed }: Props) {
  const offset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;
  const cls = passed ? 'pass' : 'fail';

  return (
    <div className="score-circle">
      <svg className="score-circle-svg" width={C} height={C} viewBox={`0 0 ${C} ${C}`}>
        <circle className="score-track" cx={C / 2} cy={C / 2} r={R} />
        <circle
          className={`score-fill ${cls}`}
          cx={C / 2}
          cy={C / 2}
          r={R}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
        />
        <text
          className={`score-circle-text ${cls}`}
          x={C / 2}
          y={C / 2 - 8}
          transform={`rotate(90 ${C / 2} ${C / 2})`}
        >
          {score}%
        </text>
        <text
          className="score-circle-sublabel"
          x={C / 2}
          y={C / 2 + 12}
          transform={`rotate(90 ${C / 2} ${C / 2})`}
        >
          SCORE
        </text>
      </svg>
    </div>
  );
}
