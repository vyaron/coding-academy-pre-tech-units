import { useRef, useState } from 'react';
import { useExam } from '../../context/ExamContext';
import type { Exam } from '../../types/exam';
import './HomeScreen.css';

const EXAMPLE_EXAMS = [
  { key: 'cyber-rtl',   icon: '🔒', name: 'גאמא סייבר',        meta: '11 שאלות · 60 דק · RTL' },
  { key: 'network-ltr', icon: '🌐', name: 'Network Security', meta: '11Q · 30min · LTR' },
];

function validateExam(data: unknown): Exam {
  const d = data as Record<string, unknown>;
  if (!d || typeof d !== 'object') throw new Error('Not a valid JSON object');
  if (!Array.isArray(d.questions)) throw new Error('Missing "questions" array');
  if (typeof d.title !== 'string') throw new Error('Missing "title" string');
  d.questions.forEach((q: unknown, i: number) => {
    const qObj = q as Record<string, unknown>;
    if (!['single', 'code', 'order', 'truefalse'].includes(qObj.type as string))
      throw new Error(`Question ${i + 1}: unknown type "${qObj.type}"`);
    if ((qObj.type === 'single' || qObj.type === 'code') && !Array.isArray(qObj.options))
      throw new Error(`Question ${i + 1}: missing options array`);
    if (qObj.type === 'order' && !Array.isArray(qObj.items))
      throw new Error(`Question ${i + 1}: order type requires items array`);
    if (qObj.type === 'truefalse' && typeof qObj.correct !== 'boolean')
      throw new Error(`Question ${i + 1}: truefalse type requires a boolean "correct" field`);
  });
  return data as Exam;
}

export default function HomeScreen() {
  const { dispatch } = useExam();
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  async function loadExamData(data: unknown) {
    try {
      const exam = validateExam(data);
      dispatch({ type: 'LOAD_EXAM', exam });
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  }

  async function loadExample(key: string) {
    setLoading(key);
    setError(null);
    try {
      const res = await fetch(`/exams/${key}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      await loadExamData(data);
    } catch (e: unknown) {
      setError(`Failed to load example: ${(e as Error).message}`);
    } finally {
      setLoading(null);
    }
  }

  async function handleFile(file: File) {
    setError(null);
    if (!file.name.endsWith('.json')) {
      setError('Please select a .json file');
      return;
    }
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      await loadExamData(data);
    } catch (e: unknown) {
      setError(`Parse error: ${(e as Error).message}`);
    }
  }

  return (
    <div className="home">
      {/* Logo */}
      <div className="home-logo">
        <h1>
          <span className="logo-cyber">CYBER</span>
          <span className="logo-bracket">[</span>
          <span className="logo-exam">EXAM</span>
          <span className="logo-bracket">]</span>
        </h1>
        <p className="home-logo-sub">
          // secure assessment terminal v1.0
          <span className="home-logo-cursor" />
        </p>
      </div>

      {/* Main content */}
      <div className="home-content">
        <div>
          <p className="home-section-label">// PRELOADED EXAMS</p>
          <div className="home-exam-cards">
            {EXAMPLE_EXAMS.map((ex) => (
              <button
                key={ex.key}
                className="home-exam-card"
                onClick={() => loadExample(ex.key)}
                disabled={loading !== null}
              >
                <span className="home-exam-card-icon">{ex.icon}</span>
                <div>
                  <div className="home-exam-card-name">
                    {loading === ex.key ? '...' : ex.name}
                  </div>
                  <div className="home-exam-card-meta">{ex.meta}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="home-divider">
          <div className="home-divider-line" />
          <span className="home-divider-text">OR</span>
          <div className="home-divider-line" />
        </div>

        <div>
          <p className="home-section-label">// LOAD CUSTOM JSON</p>
          <div
            className={`home-file-zone${dragOver ? ' drag-over' : ''}`}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              const f = e.dataTransfer.files[0];
              if (f) handleFile(f);
            }}
          >
            <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>📂</span>
            <span className="home-file-prompt">
              &gt; load_exam --file{' '}
              <span>[drop .json here or click to browse]</span>
            </span>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            style={{ display: 'none' }}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
        </div>

        {error && <div className="home-error">! ERROR: {error}</div>}
      </div>
    </div>
  );
}
