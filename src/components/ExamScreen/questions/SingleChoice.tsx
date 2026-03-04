import type { SingleQuestion, CodeQuestion, PersonalityQuestion } from '../../../types/exam';

interface Props {
  question: SingleQuestion | CodeQuestion | PersonalityQuestion;
  selected: number | null;
  onSelect: (idx: number) => void;
  reviewMode?: boolean;
  noCorrect?: boolean;
}

export default function SingleChoice({ question, selected, onSelect, reviewMode = false, noCorrect = false }: Props) {
  const correct = 'correct' in question ? question.correct : undefined;

  return (
    <div className="options-list">
      {question.options.map((opt, i) => {
        let cls = 'option-btn';
        if (reviewMode && !noCorrect && correct !== undefined) {
          if (i === correct) cls += ' correct';
          else if (i === selected && selected !== correct) cls += ' wrong';
        } else if (i === selected) {
          cls += ' selected';
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
            {reviewMode && !noCorrect && correct !== undefined && i === correct && (
              <span className="option-marker correct-mark">✓</span>
            )}
            {reviewMode && !noCorrect && correct !== undefined && i === selected && selected !== correct && (
              <span className="option-marker wrong-mark">✗</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
