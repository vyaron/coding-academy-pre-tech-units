import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExam } from '../../context/ExamContext';
import type { Exam } from '../../types/exam';
import './HomeScreen.css';

const EXAMPLE_EXAMS = [
  {
    key: 'tech-fit',
    icon: '⚡',
    name: 'מבחן התאמה ליחידות טכנולוגיות',
    desc: 'מבחן התאמה ראשוני שבודק פוטנציאל להתקבל ליחידות טכנולוגיות – חומרה, רשתות, תכנות Python ומושגי מחשוב.',
    time: '40 דק',
    questions: 10,
  },
  {
    key: 'child-8200',
    icon: '🎯',
    name: 'האם הילד/ה שלי מתאים/ה ליחידה טכנולוגית?',
    desc: 'שאלון הערכה להורים – בדקו את הפוטנציאל של הילד/ה שלכם להתקבל ליחידה טכנולוגית על בסיס נטיות, כישורים והישגים.',
    time: '20 דק',
    questions: 10,
  },
  {
    key: 'cyber-rtl',
    icon: '🔒',
    name: 'מבחן גאמא סייבר',
    desc: 'מבחן לדוגמה גאמא סייבר – שאלון גאמא סייבר להכנה למיונים ליחידה טכנולוגית. מבחן 300 לדוגמה בסייבר ואבטחת מידע.',
    time: '60 דק',
    questions: 11,
  },
  {
    key: 'network-ltr',
    icon: '🌐',
    name: 'מבחן אבטחת רשתות',
    desc: 'מבחן לדוגמה באבטחת רשתות – פרוטוקולים, פגיעויות ושיטות הגנה. מתאים להכנה למיונים טכנולוגיים.',
    time: '30 דק',
    questions: 11,
  },
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

const ROUTED_EXAMS: Record<string, string> = {
  'cyber-rtl':   '/quiz/gama-cyber',
  'network-ltr': '/quiz/network',
  'child-8200':  '/quiz/child-8200',
  'tech-fit':    '/quiz/tech-fit',
};

export default function HomeScreen() {
  const navigate = useNavigate();
  const { dispatch } = useExam();
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  async function loadExamData(data: unknown) {
    try {
      const exam = validateExam(data);
      dispatch({ type: 'LOAD_EXAM', exam });
      navigate('/exam');
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  }

  async function loadExample(key: string) {
    if (ROUTED_EXAMS[key]) {
      navigate(ROUTED_EXAMS[key]);
      return;
    }
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
    <div className="home" dir="rtl">
      {/* Header */}
      <div className="home-header">
        <h1 className="home-title">מבחנים לדוגמה למיונים ליחידה טכנולוגית</h1>
        <h2 className="home-subtitle">מבחן גאמא סייבר | מבחני 8200 / ממרם | הכנה טכנולוגית למיונים</h2>
      </div>

      {/* Cards */}
      <div className="home-cards-section">
        <p className="home-section-label">// מבחנים זמינים</p>
        <div className="home-cards-grid">
          {EXAMPLE_EXAMS.map((ex, i) => (
            <button
              key={ex.key}
              className="home-exam-card"
              onClick={() => loadExample(ex.key)}
              disabled={loading !== null}
            >
              <div className="home-card-header">
                <div className="home-card-name">
                  {loading === ex.key ? '...' : ex.name}
                </div>
                <span className="home-card-badge">[{String(i + 1).padStart(2, '0')}]</span>
              </div>
              <div className="home-card-body">
                <p className="home-card-desc">{ex.desc}</p>
              </div>
              <div className="home-card-divider" />
              <div className="home-card-footer">
                <div className="home-card-meta">
                  <span className="home-card-meta-item">
                    <svg className="home-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {ex.time}
                  </span>
                  <span className="home-card-meta-item">
                    <svg className="home-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    {ex.questions} שאלות
                  </span>
                </div>
                <span className="home-card-start">התחל ←</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="home-divider">
        <div className="home-divider-line" />
        <span className="home-divider-text">או</span>
        <div className="home-divider-line" />
      </div>

      {/* File upload */}
      <div className="home-cards-section">
        <p className="home-section-label">// טען מבחן מותאם אישית</p>
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
          <span className="home-file-prompt" dir="ltr">
            &gt; load_exam --file{' '}
            <span>[גרור קובץ .json לכאן או לחץ לבחירה]</span>
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

      {error && <div className="home-error">! שגיאה: {error}</div>}
    </div>
  );
}
