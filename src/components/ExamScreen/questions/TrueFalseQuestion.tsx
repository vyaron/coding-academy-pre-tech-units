import type { TrueFalseQuestion as TFQ } from '../../../types/exam';

// selected: 1 = right (true), 0 = wrong (false), null = unanswered

interface Props {
  question: TFQ;
  selected: number | null;
  onSelect: (val: number) => void;
  reviewMode?: boolean;
  lang?: string;
}

const LABELS: Record<string, [string, string]> = {
  he: ['נכון', 'לא נכון'],
};
const DEFAULT_LABELS: [string, string] = ['RIGHT', 'WRONG'];

export default function TrueFalseQuestion({ question, selected, onSelect, reviewMode = false, lang }: Props) {
  const correctVal = question.correct ? 1 : 0;
  const [labelRight, labelWrong] = (lang && LABELS[lang]) ?? DEFAULT_LABELS;

  function cls(val: number) {
    let c = 'tf-btn';
    if (reviewMode) {
      if (val === correctVal) c += ' correct';
      else if (val === selected && selected !== correctVal) c += ' wrong';
    } else {
      if (val === selected) c += ' selected';
    }
    return c;
  }

  return (
    <div className="tf-row">
      <button className={cls(1)} onClick={() => !reviewMode && onSelect(1)} disabled={reviewMode}>
        <span className="tf-icon">✓</span>
        <span className="tf-label">{labelRight}</span>
      </button>

      <button className={cls(0)} onClick={() => !reviewMode && onSelect(0)} disabled={reviewMode}>
        <span className="tf-icon">✗</span>
        <span className="tf-label">{labelWrong}</span>
      </button>
    </div>
  );
}
