import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const ABOUT_CARDS = [
  { icon: '🎯', title: 'ייעוץ מקצועי ממוקד', desc: 'ממוקדים בצרכים שלך ומוצאים את הנתיב הנכון – צעד אחר צעד, בלי להתבלבל ולאבד את הדרך.' },
  { icon: '🤝', title: 'ייעוץ 1:1 עם מומחים', desc: 'פגישות אישיות, משוב על קוד, ניתוח ראיונות עבודה ותמיכה מלאה לאורך כל הדרך.' },
  { icon: '🏆', title: 'ספרייה דיגיטלית עשירה', desc: 'גישה 24/7 לחומרי לימוד מעודכנים – ה-IDE, מאגרים, כל מה שצריך מהמחשב שלכם.' },
  { icon: '🎥', title: 'הכשרה ממוקדת', desc: 'תרגול פרקטי, פרויקטים אמיתיים וייעוץ 1:1 עם מרצה בכל שעה שהיא במהלך הקורס.' },
  { icon: '🛡', title: 'מוכר ומאושר ע"י המדינה', desc: 'coding-academy מוכר ע"י משרד הכלכלה ומסגרות מוכרות לזכאות עם 20+ שנות ניסיון.' },
  { icon: '🤖', title: 'תכנות עם עזרת AI', desc: 'שלבו AI בתהליך הפיתוח שלכם – מציאת שגיאות בקוד, כתיבת תיעוד ופתרון בעיות מהירות.' },
];

const PROFESSIONS = [
  { emoji: '💻', title: 'פיתוח פולסטאק', desc: 'פיתוח צד שרת וצד לקוח – עם ערכות כלים מתקדמות ואפליקציות שמשמשות בפועל.' },
  { emoji: '🤖', title: 'תכנות AI', desc: 'בניית מודלים אוטומטיים שמניעים את עולם ה-AI עם שימוש בטכנולוגיות עדכניות.' },
  { emoji: '🛡', title: 'אבטחת סייבר', desc: 'אבטחת מתקפות סייבר – הגנה, ניתוח ופתרון חולשות בסביבות מגוונות.' },
  { emoji: '📊', title: 'אנליטיקה ובינה עסקית', desc: 'פרשנות נתונים, ניתוח עסקי והמלצות מקצועיות שמשמשות ביחידות מובחרות.' },
];

const STEPS = [
  { n: '01', t: 'יסודות הפיתוח והאינטרנט', d: 'מבוא לרשת, HTTP/HTTPS, HTML/CSS בסיסי, Git ומערכות בקרת גרסאות. בנייה ראשונה של אתר.', tag: '🧩 פרויקט – פיתוח אתר ראשון' },
  { n: '02', t: 'JavaScript – יסודות התכנות', d: '"שעת הקסם שלנו בתכנות" – לוגיקה, משתנים, פונקציות, אירועים, DOM. פיתוח אפליקציות פשוטות ואינטראקטיביות.', tag: '🧩 פרויקט – פיתוח משחק דיגיטלי' },
  { n: '03', t: 'React – ספריית קוד מודרנית', d: 'בניית ממשקי משתמש, Component, State, Hooks ופיתוח אפליקציות ריאקטיביות מלאות.', tag: '🧩 פרויקט – אפליקציה ריאקטיבית' },
  { n: '04', t: 'צד שרת עם Node.js', d: 'שרתי תקשורת, מסדי נתונים, יצירת REST APIs, אינטגרציה עם לקוחות, Authentication ועבודה עם GIT ו-GitHub.', tag: null },
  { n: '05', t: 'מסדי נתונים', d: 'SQL ו-MongoDB, ניהול בסיסי נתונים, WebSockets ואפליקציות real-time. ביצועים, מדרגיות ותרחישי ייצור.', tag: null },
  { n: '06', t: 'אבטחת סייבר', d: 'אבטחת מתקפות סייבר. הצפנות, הגנה, זיהוי חולשות קוד ועבודה בסביבת עבודה מאובטחת.', tag: null },
  { n: '07', t: 'תכנות Python', d: 'יסודות Python, בסיסי נתונים, עבודה עם קבצים, עיבוד נתונים, ניתוח API ושימוש בטכנולוגיות.', tag: null },
  { n: '08', t: 'פרויקט גמר + הכנה לראיונות', d: 'בניית פרויקט גמר מקצועי ב-GitHub. סימולציות ראיון, פתרון אלגוריתמים ותיק עבודות מלא.', tag: '🏆 תעודת גמר בינלאומית' },
];

const WORKSHOP_PILLS = [
  'שימוש בטכנולוגיית AI ו-LLMs',
  'ביקורות קוד מתקדמות',
  'Angular & Vue',
  'Python מתקדם',
  'DevOps, AWS, Firebase',
  'Backend Mastering',
];

const WORKSHOP_CARDS = [
  { title: '💼 מציאת עבודה ראשונה', desc: 'שותפות פעילה עם חברות הייטק – מציאת ראיונות והכנה מלאה לראיון הטכני הראשון שלך.' },
  { title: '🎯 מכון הכשרות לראיון', desc: 'מכינים אותך מקצועית לראיון עם שאלות שחוזרות – מה שנשאלים בכל מועד בחברות הגדולות.' },
  { title: '🥂 קהילת בוגרים פעילים', desc: 'קהילה של קרוב 300 בוגרים שמשתפים ניסיון, ייעוץ, הצעות עבודה ותמיכה הדדית.' },
  { title: '🤝 הרצאות ומפגשים', desc: 'מפגשים מקצועיים עם אנשי תעשייה, סדנאות ממוקדות ורשת קשרים מקצועית.' },
];

const FAQS = [
  { q: 'מה מתאים לי בדיוק?', a: 'ניתן לקבל ייעוץ אישי חינם עם מנהל לימודים מקצועי – נבדוק יחד את הקורס ונמצא את המסלול הנכון. אין צורך ברקע קודם – כל שאלת רקע תורמת ומסייעת.' },
  { q: 'מהו לוח הזמנים של הקורס?', a: 'הקורס מועבר בפגישות פנים אל פנים פעמיים בשבוע, 3 שעות בכל פגישה, החל מ-17:30. כל המפגשים מוקלטים ונגישים בכל עת. ניתן להשתתף גם בשידור חי מרחוק.' },
  { q: 'האם הקורס מתאים גם ללא ניסיון קודם?', a: 'כן! הקורס בנוי מהבסיס ועד לרמה שמאפשרת קבלה לעבודה בהייטק, עם ייעוץ ואחריות מלאה לאורך הדרך. אם יש לך רקע – ניתן לפנות ולבחון האצת התהליך.' },
  { q: 'האם הקורס כולל תכנות עם עזרת AI?', a: 'בהחלט! אנחנו כוללים שימוש ב-AI כחלק אינטגרלי מהקורס. בוגרי הקורס מדווחים שהשימוש ב-AI מאיץ כתיבת קוד, שיפור תיעוד ופתרון בעיות טכניות בצורה יעילה.' },
  { q: 'מה עלות הקורס?', a: 'עלות הקורס משתנה בהתאם למסלול שנבחר. ניתן לקבל מידע מלא על ידי פנייה ישירה לייעוץ – נציע את הפתרון הכלכלי המתאים ביותר.' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="lp" dir="rtl">

      {/* ── NAV ── */}
      <nav className="lp-nav">
        <a href="#" className="lp-logo">CODING-ACADEMY</a>
        <ul className="lp-nav-links">
          <li><a href="#about">אודות</a></li>
          <li><a href="#curriculum">תוכנית</a></li>
          <li><a href="#workshops">סדנאות</a></li>
          <li><a href="#faq">שאלות</a></li>
        </ul>
        <a href="#contact" className="lp-btn-primary lp-btn-sm">פנייה לייעוץ</a>
      </nav>

      {/* ── HERO ── */}
      <div className="lp-hero">
        <div className="lp-hero-glow" />
        <div className="lp-hero-glow2" />
        <div className="lp-hero-inner">
          <div className="lp-badge">🎓 הכנסה לאקדמיה</div>
          <h1 className="lp-hero-h1">
            הכשרה שלנו<br />
            ל<span>קריירה מוצלחת</span><br />
            בעולם הטכנולוגיה
          </h1>
          <p className="lp-hero-p">
            קורס coding-academy – ישיר, ממוקד ומביא אתכם להצלחה. למידה ריאלית עם ייעוץ אישי – אחרי קורס זה תהיו מוכנים לכל אתגר.
          </p>
          <div className="lp-hero-cta">
            <a href="#contact" className="lp-btn-primary">📝 קבע פנייה לייעוץ</a>
            <button className="lp-btn-outline" onClick={() => navigate('/quiz')}>🎯 לבחינות ההדמייה ←</button>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="lp-stats">
        {[
          { v: '20+', l: 'שנות ניסיון' },
          { v: 'אלפי', l: 'בוגרים מצוינים' },
          { v: '12', l: 'שעות לימוד שבועיות' },
          { v: '4', l: 'התמחויות בקורס אחד' },
          { v: '1:1', l: 'ייעוץ אישי' },
        ].map(s => (
          <div className="lp-stat" key={s.l}>
            <div className="lp-stat-v">{s.v}</div>
            <div className="lp-stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── ABOUT ── */}
      <section className="lp-section" id="about">
        <div className="lp-section-tag">// מה קורה כאן</div>
        <h2 className="lp-section-title">מתרגמים את עולמך לקריירה דיגיטלית</h2>
        <p className="lp-section-sub">הקורס כולל מסלול שהותאם בדיוק לך מבחינה אישית – עם עיניים שרואות מעבר ועם ניתוח ממוקד.</p>
        <div className="lp-cards">
          {ABOUT_CARDS.map(c => (
            <div className="lp-card" key={c.title}>
              <div className="lp-card-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4 PROFESSIONS ── */}
      <div className="lp-bg-alt">
        <section className="lp-section">
          <div className="lp-section-tag">// 4 התמחויות בקורס אחד</div>
          <h2 className="lp-section-title">שפע תפקידים מבוקשים</h2>
          <p className="lp-section-sub">כל בוגרי הקורס רוכשים את הידע לסיים ולהצטרף לעולם ה-AI – לקצועות הכי מבוקשים כיום.</p>
          <div className="lp-professions">
            {PROFESSIONS.map(p => (
              <div className="lp-prof-card" key={p.title}>
                <div className="lp-prof-emoji">{p.emoji}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── CURRICULUM ── */}
      <section className="lp-section" id="curriculum">
        <div className="lp-section-tag">// תוכנית הלימודים</div>
        <h2 className="lp-section-title">מה מכסים – בדיוק ומממוקד</h2>
        <p className="lp-section-sub">כל שלב בנוי על הקודם. אין שלב שמדלגים עליו – הכל נלמד ומתורגל.</p>
        <div className="lp-curriculum">
          {STEPS.map(s => (
            <div className="lp-step" key={s.n}>
              <div className="lp-step-num">{s.n}</div>
              <div className="lp-step-content">
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                {s.tag && <span className="lp-step-tag">{s.tag}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WORKSHOPS ── */}
      <div className="lp-workshops-bg">
        <section className="lp-section" id="workshops">
          <div className="lp-section-tag">// מוקד הקורס</div>
          <h2 className="lp-section-title">🎁 סדנאות מקצועיות ותוספות ייחודיות</h2>
          <p className="lp-section-sub">בוגרי הקורס מקבלים הרחבות ייחודיות – סדנאות מרצות ממוקדות ומועצמות.</p>
          <div className="lp-workshop-pills">
            {WORKSHOP_PILLS.map(w => (
              <div className="lp-workshop-pill" key={w}><span>◆</span> {w}</div>
            ))}
          </div>
          <div className="lp-cards" style={{ marginTop: '3rem' }}>
            {WORKSHOP_CARDS.map(c => (
              <div className="lp-card" key={c.title}>
                <h3 style={{ marginBottom: '0.5rem' }}>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── FAQ ── */}
      <section className="lp-section" id="faq">
        <div className="lp-section-tag">// שאלות שנשאלות</div>
        <h2 className="lp-section-title">שאלות נפוצות</h2>
        <p className="lp-section-sub">לא מצאת תשובה? נשמח לייעץ לך ישירות.</p>
        <div className="lp-faq">
          {FAQS.map((item, i) => (
            <div className="lp-faq-item" key={i}>
              <div className="lp-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {item.q}
                <span className={`lp-faq-icon${openFaq === i ? ' open' : ''}`}>+</span>
              </div>
              {openFaq === i && <div className="lp-faq-a">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="lp-section" id="contact">
        <div className="lp-cta-banner">
          <h2>🤝 פנייה לייעוץ עם מנהל/ת הקורס</h2>
          <p>תקבל ייעוץ חינם, תשמע על המסלולים ותתחיל את המסע הקריירי הראשון שלך.</p>
          <a
            href="https://coding-academy.org"
            target="_blank"
            rel="noopener noreferrer"
            className="lp-btn-primary"
            style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
          >
            📝 קבע/י פנייה עכשיו
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <p><strong>CODING-ACADEMY</strong> – Master the Art of Coding</p>
        <p style={{ marginTop: '0.5rem' }}>coding-academy.org &nbsp;|&nbsp; כל הזכויות שמורות</p>
      </footer>

    </div>
  );
}
