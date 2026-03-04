import type { CodeQuestion as CQ } from '../../../types/exam';
import SingleChoice from './SingleChoice';
import './CodeQuestion.css';

function highlight(code: string, lang: string): string {
  // Escape HTML first
  let s = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (lang === 'javascript' || lang === 'js' || lang === 'typescript' || lang === 'ts') {
    s = s.replace(
      /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|class|new|import|export|from|default|async|await|try|catch|throw|typeof|instanceof|null|undefined|true|false|void|this|super)\b|(\d+(?:\.\d+)?)/g,
      (_, cmt, str, kw, num) => {
        if (cmt !== undefined) return `<span class="hl-cmt">${cmt}</span>`;
        if (str !== undefined) return `<span class="hl-str">${str}</span>`;
        if (kw !== undefined) return `<span class="hl-kw">${kw}</span>`;
        return `<span class="hl-num">${num}</span>`;
      }
    );
  } else if (lang === 'python' || lang === 'py') {
    s = s.replace(
      /(#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(def|class|return|if|elif|else|for|while|import|from|as|try|except|raise|with|in|is|not|and|or|None|True|False|lambda|pass|break|continue)\b|(\d+(?:\.\d+)?)/g,
      (_, cmt, str, kw, num) => {
        if (cmt !== undefined) return `<span class="hl-cmt">${cmt}</span>`;
        if (str !== undefined) return `<span class="hl-str">${str}</span>`;
        if (kw !== undefined) return `<span class="hl-kw">${kw}</span>`;
        return `<span class="hl-num">${num}</span>`;
      }
    );
  } else if (lang === 'bash' || lang === 'sh') {
    s = s.replace(
      /(#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
      (_, cmt, str) => {
        if (cmt !== undefined) return `<span class="hl-cmt">${cmt}</span>`;
        return `<span class="hl-str">${str}</span>`;
      }
    );
  }

  return s;
}

interface Props {
  question: CQ;
  selected: number | null;
  onSelect: (idx: number) => void;
  reviewMode?: boolean;
}

export default function CodeQuestion({ question, selected, onSelect, reviewMode = false }: Props) {
  const highlighted = highlight(question.code, question.language);

  return (
    <div>
      <div className="code-block">
        <div className="code-block-header">
          <div className="code-dot red" />
          <div className="code-dot yellow" />
          <div className="code-dot green" />
          <span className="code-lang-label">{question.language}</span>
        </div>
        <pre dangerouslySetInnerHTML={{ __html: highlighted }} />
      </div>

      <SingleChoice
        question={question}
        selected={selected}
        onSelect={onSelect}
        reviewMode={reviewMode}
      />
    </div>
  );
}
