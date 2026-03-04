import { useRef, useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useExam } from '../../context/ExamContext';
import type { Exam } from '../../types/exam';
import './QuizIntroScreen.css';

interface QuizConfig {
  fileKey: string;
  title: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  about: string[];
  instructions: string[];
  password: string;
}

const QUIZ_CONFIGS: Record<string, QuizConfig> = {
  'tzav-rishon': {
    fileKey: 'tzav-rishon',
    title: 'מבחן לדוגמה - צו ראשון',
    subtitle: 'מבחן סימולציה מלא להכנה לצו ראשון – אנלוגיות מילוליות, צורנים, הבנת הוראות ומתמטיקה. המבחן מדמה את אופי השאלות במבחן האמיתי.',
    stats: [
      { value: '15', label: 'שאלות' },
      { value: '45', label: 'דקות זמן מבחן' },
      { value: '70%', label: 'ציון עובר' },
      { value: 'בינוני', label: 'רמת קושי' },
    ],
    about: [
      'מבחן סימולציה מלא להכנה לצו ראשון – כולל מגוון סוגי שאלות.',
      'אנלוגיות מילוליות – זיהוי קשרים לוגיים בין מילים ומושגים.',
      'שאלות מילון – הבנת משמעות מילים ויחסי הפוך/נרדף.',
      'יחסים בין מושגים: חלק–כלל, כלי–שימוש, מקצוע–פעולה.',
      'המבחן מדמה את אופי ורמת הקושי של צו ראשון האמיתי.',
    ],
    instructions: [
      'לאחר מענה על שאלה לא ניתן לחזור אליה.',
      'קראו כל שאלה בעיון לפני שאתם עונים.',
      'הזמן מתחיל מרגע תחילת המבחן ואינו ניתן לעצירה.',
      'נקודות לכל שאלה מצוינות לצידה.',
    ],
    password: '4747',
  },

  'shalon-300': {
    fileKey: 'shalon-300',
    title: 'שאלון 300',
    subtitle: 'שאלון אישיות ממוחשב לתהליכי מיון ליחידות טכנולוגיות – 300 שאלות אישיות שמטרתן להעריך התאמה אישיותית לשירות ביחידות.',
    stats: [
      { value: '300', label: 'שאלות' },
      { value: '25', label: 'דקות זמן מבחן' },
      { value: 'אישיות', label: 'סוג המבחן' },
      { value: 'קל', label: 'רמת קושי' },
    ],
    about: [
      'שאלון 300 הוא מבחן אישיות ממוחשב המשמש בתהליכי מיון ליחידות טכנולוגיות.',
      'השאלון כולל 300 היגדים שעליך לדרג לפי מידת ההתאמה לאישיותך.',
      'אין תשובות נכונות או לא נכונות – חשוב לענות בכנות.',
      'השאלון מודד מאפייני אישיות כמו עבודת צוות, התמדה ויציבות רגשית.',
      'מטרת השאלון לבחון התאמה אישיותית לשירות ביחידות טכנולוגיות.',
      'חשוב: יש לענות ספונטנית ולא לחשוב יותר מדי על כל שאלה.',
    ],
    instructions: [
      'יש לענות על כל 300 השאלות.',
      'אין תשובות נכונות או שגויות – ענה בכנות.',
      'עדיף לענות ספונטנית – אל תחשוב יותר מדי.',
      'הזמן מתחיל מרגע תחילת המבחן ואינו ניתן לעצירה.',
    ],
    password: '4747',
  },

  'gama-cyber': {
    fileKey: 'cyber-rtl',
    title: 'מבחן לדוגמה גאמא סייבר',
    subtitle: 'מבחן לדוגמה גאמא סייבר – שאלות על הצפנה, זיהוי חולשות קוד ופרוטוקולי רשת. הכנה למיונים ליחידה טכנולוגית.',
    stats: [
      { value: '11', label: 'שאלות' },
      { value: '60', label: 'דקות זמן מבחן' },
      { value: '75%', label: 'ציון עובר' },
      { value: 'מאתגר', label: 'רמת קושי' },
    ],
    about: [
      'מבחן לדוגמה גאמא סייבר – כולל שאלות על הצפנה, אבטחת מידע, זיהוי חולשות קוד ופרוטוקולי רשת.',
      'הצפנה ופרוטוקולי TLS/SSL לאבטחת תעבורת רשת.',
      'עקרונות אבטחת מידע: CIA Triad ומתקפות Man-in-the-Middle.',
      'זיהוי חולשות אבטחה בקוד Python ו-JavaScript.',
      'מודל OSI ושכבות הרשת.',
      'סדרי פעולות: TCP 3-Way Handshake ומחזור הוראה במעבד.',
    ],
    instructions: [
      'יש לענות על כל השאלות במבחן. אין אפשרות לדלג על שאלות.',
      'הזמן מתחיל מרגע תחילת המבחן ואינו ניתן לעצירה.',
      'יש לוודא חיבור אינטרנט יציב לאורך כל המבחן.',
      'לאחר סיום המבחן ניתן לסקור את התשובות.',
    ],
    password: '4747',
  },

  'child-8200': {
    fileKey: 'child-8200',
    title: 'האם הילד/ה שלי מתאים/ה ליחידה טכנולוגית?',
    subtitle: 'שאלון הערכה להורים – בדקו את הפוטנציאל של הילד/ה שלכם להתקבל ליחידה טכנולוגית על בסיס נטיות, כישורים והישגים.',
    stats: [
      { value: '10', label: 'שאלות' },
      { value: '20', label: 'דקות זמן מבחן' },
      { value: '60%', label: 'ציון מתאים' },
      { value: 'קל', label: 'רמת קושי' },
    ],
    about: [
      'שאלון הערכה להורים – האם הילד/ה שלי מתאים/ה ליחידה טכנולוגית? השאלון כולל 10 שאלות על:',
      'תחום עניין וחשיבה טכנולוגית.',
      'הישגים לימודיים ויכולת אנליטית.',
      'יכולת אישיות ועבודה בצוות.',
      'התמדה ויוזמה.',
      'המבחן יעזור לכם להעריך את הפוטנציאל של הילד/ה להתקבל ליחידה טכנולוגית.',
    ],
    instructions: [
      'יש לענות על כל השאלות במבחן. אין אפשרות לדלג על שאלות.',
      'הזמן מתחיל מרגע תחילת המבחן ואינו ניתן לעצירה.',
      'יש לוודא חיבור אינטרנט יציב לאורך כל המבחן.',
      'לאחר סיום המבחן ניתן לסקור את התשובות.',
    ],
    password: '4747',
  },

  'tech-fit': {
    fileKey: 'tech-fit',
    title: 'מבחן התאמה ליחידות טכנולוגיות',
    subtitle: 'מבחן התאמה ראשוני שבודק פוטנציאל להתקבל ליחידות טכנולוגיות. מעבר המבחן אינו מבטיח קבלה ליחידות, אך מצביע על פוטנציאל שניתן לפתח.',
    stats: [
      { value: '10', label: 'שאלות' },
      { value: '40', label: 'דקות זמן מבחן' },
      { value: '60%', label: 'ציון עובר' },
      { value: 'בינוני', label: 'רמת קושי' },
    ],
    about: [
      'מבחן התאמה ראשוני שבודק פוטנציאל להתקבל ליחידות טכנולוגיות.',
      'יסודות חומרה: זיכרון RAM ו-ROM, ייצוג בינארי.',
      'רשתות תקשורת: DNS, כתובות IP, פרוטוקולי HTTP.',
      'תכנות Python: רשימות, לולאות ופונקציות.',
      'מושגי תכנות כלליים: Stack, פרוטוקולים ועוד.',
      'חשוב: מבחן זה הוא הערכה בלבד ואינו מבטיח קבלה ליחידות.',
    ],
    instructions: [
      'יש לענות על כל השאלות במבחן. אין אפשרות לדלג על שאלות.',
      'הזמן מתחיל מרגע תחילת המבחן ואינו ניתן לעצירה.',
      'יש לוודא חיבור אינטרנט יציב לאורך כל המבחן.',
      'לאחר סיום המבחן ניתן לסקור את התשובות.',
    ],
    password: '4747',
  },

  'klal-haman': {
    fileKey: 'klal-haman',
    title: 'מבחן לדוגמה כלל חמן',
    subtitle: 'מבחן חשיבה אנליטית של כלל חמן – יחסי גומלין ושיבוצים. תקבלו סיפור ונתונים אודות דיירים בבניין ועליכם להסיק את המסקנות הרלוונטיות.',
    stats: [
      { value: '15', label: 'שאלות' },
      { value: '60', label: 'דקות זמן מבחן' },
      { value: '80%', label: 'ציון עובר' },
      { value: 'מאתגר', label: 'רמת קושי' },
    ],
    about: [
      'מבחן חשיבה אנליטית של כלל חמן – בוחן יכולת הסקת מסקנות מנתונים.',
      'תקבלו סיפור על בניין דירות עם דיירים שונים ודרישות מגורים.',
      'עליכם להסיק מסקנות לגבי מיקום הדיירים בקומות ובדירות.',
      'שאלות נכון/לא נכון ושאלות בחירה מרובה על סמך המידע.',
      'המבחן בוחן חשיבה לוגית, יכולת ניתוח מידע ודיוק.',
    ],
    instructions: [
      'קראו את סיפור הבניין בעיון לפני שאתם מתחילים לענות.',
      'כל שאלה מבוססת על המידע שניתן בתחילת המבחן.',
      'הזמן מתחיל מרגע תחילת המבחן ואינו ניתן לעצירה.',
      'לאחר סיום המבחן ניתן לסקור את התשובות.',
    ],
    password: '4747',
  },

  'network': {
    fileKey: 'network-ltr',
    title: 'מבחן לדוגמה אבטחת רשתות',
    subtitle: 'מבחן לדוגמה באבטחת רשתות – שכבות OSI, מתקפות SYN Flood, DNS Resolution וזיהוי חולשות קוד.',
    stats: [
      { value: '11', label: 'שאלות' },
      { value: '30', label: 'דקות זמן מבחן' },
      { value: '75%', label: 'ציון עובר' },
      { value: 'בינוני', label: 'רמת קושי' },
    ],
    about: [
      'מבחן לדוגמה באבטחת רשתות – כולל שאלות על מודל OSI, מתקפות רשת, עקרונות אבטחה וזיהוי חולשות קוד.',
      'שכבות מודל OSI ופרוטוקולי רשת: TCP, UDP ו-HTTPS.',
      'מתקפות רשת: SYN Flood ועקרון Least Privilege.',
      'זיהוי חולשות אבטחה בקוד Python ו-Node.js.',
      'תהליך DNS Resolution וסדר שכבות מודל OSI.',
      'הבדלים בין TCP ל-UDP ואמינות העברת נתונים.',
    ],
    instructions: [
      'יש לענות על כל השאלות במבחן. אין אפשרות לדלג על שאלות.',
      'הזמן מתחיל מרגע תחילת המבחן ואינו ניתן לעצירה.',
      'יש לוודא חיבור אינטרנט יציב לאורך כל המבחן.',
      'לאחר סיום המבחן ניתן לסקור את התשובות.',
    ],
    password: '4747',
  },
};

function validateExam(data: unknown): Exam {
  const d = data as Record<string, unknown>;
  if (!d || typeof d !== 'object') throw new Error('Not a valid JSON object');
  if (!Array.isArray(d.questions)) throw new Error('Missing "questions" array');
  if (typeof d.title !== 'string') throw new Error('Missing "title" string');
  return data as Exam;
}

export default function QuizIntroScreen() {
  const { quizId } = useParams<{ quizId: string }>();
  const config = quizId ? QUIZ_CONFIGS[quizId] : undefined;

  if (!config) return <Navigate to="/" replace />;

  return <QuizIntro quizId={quizId!} config={config} />;
}

function QuizIntro({ quizId, config }: { quizId: string; config: QuizConfig }) {
  const navigate = useNavigate();
  const { dispatch } = useExam();
  const [modalOpen, setModalOpen] = useState(false);
  const [digits, setDigits] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  function openModal() {
    setDigits(['', '', '', '']);
    setError(false);
    setModalOpen(true);
    setTimeout(() => inputRefs[0].current?.focus(), 50);
  }

  function handleDigit(idx: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[idx] = val.slice(-1);
    setDigits(next);
    setError(false);
    if (val && idx < 3) inputRefs[idx + 1].current?.focus();
    if (val && idx === 3) validate(next.slice(0, 3).join('') + val.slice(-1));
  }

  function handleKeyDown(idx: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputRefs[idx - 1].current?.focus();
    }
  }

  async function validate(code: string) {
    if (code !== config.password) {
      setError(true);
      setDigits(['', '', '', '']);
      setTimeout(() => inputRefs[0].current?.focus(), 50);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/exams/${config.fileKey}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const exam = validateExam(data);
      dispatch({ type: 'LOAD_EXAM', exam });
      navigate(`/quiz/${quizId}/test`);
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="intro-page" dir="rtl">
      <button className="intro-back" onClick={() => navigate('/quiz')}>
        → חזרה לרשימה
      </button>

      <div className="intro-header">
        <h1 className="intro-title">{config.title}</h1>
        <p className="intro-subtitle">{config.subtitle}</p>
      </div>

      <div className="intro-stats">
        {config.stats.map((s) => (
          <div className="intro-stat" key={s.label}>
            <span className="intro-stat-value">{s.value}</span>
            <span className="intro-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="intro-card">
        <div className="intro-card-title">אודות המבחן</div>
        <p className="intro-card-text">{config.about[0]}</p>
        <ul className="intro-list">
          {config.about.slice(1).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="intro-card intro-card-instructions">
        <div className="intro-card-title">הוראות חשובות למבחן</div>
        <ul className="intro-list">
          {config.instructions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <button className="intro-cta" onClick={openModal}>
        התחל את המבחן 
      </button>

      {modalOpen && (
        <div className="pin-overlay" onClick={() => !loading && setModalOpen(false)}>
          <div
            className={`pin-box${error ? ' pin-shake' : ''}`}
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <div className="pin-title">// אימות גישה</div>
            <p className="pin-subtitle">הזן קוד גישה (4 ספרות)</p>

            <div className="pin-inputs" dir="ltr">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={inputRefs[i]}
                  className={`pin-input${error ? ' pin-error' : ''}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleDigit(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  disabled={loading}
                />
              ))}
            </div>

            {error && <div className="pin-error-msg">✗ קוד שגוי, נסה שנית</div>}
            {loading && <div className="pin-loading">טוען מבחן...</div>}

            <button className="pin-cancel" onClick={() => setModalOpen(false)} disabled={loading}>
              ביטול
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
