import type { SingleQuestion, CodeQuestion } from '../../../types/exam';

interface Props {
  question: SingleQuestion | CodeQuestion;
  selected: number | null;
  onSelect: (idx: number) => void;
  reviewMode?: boolean;
}

export default function SingleChoice({ question, selected, onSelect, reviewMode = false }: Props) {
  return (
    <div className="options-list">
      {question.options.map((opt, i) => {
        let cls = 'option-btn';
        if (reviewMode) {
          if (i === question.correct) cls += ' correct';
          else if (i === selected && selected !== question.correct) cls += ' wrong';
        } else {
          if (i === selected) cls += ' selected';
        }

        const letter = String.fromCharCode(65 + i); // A, B, C, D

        return (
          <button
            key={i}
            className={cls}
            onClick={() => !reviewMode && onSelect(i)}
            disabled={reviewMode}
          >
            <span className="option-letter">{letter}</span>
            <span className="option-text">{opt}</span>
            {reviewMode && i === question.correct && (
              <span className="option-marker correct-mark">✓</span>
            )}
            {reviewMode && i === selected && selected !== question.correct && (
              <span className="option-marker wrong-mark">✗</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
