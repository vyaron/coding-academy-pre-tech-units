import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LandingPage.css";

const ABOUT_CARDS = [
  {
    icon: "🎯",
    title: "הכנה מקיפה לראיונות",
    desc: "שאלות טכניות, סימולציות ושיפור מיומנויות רכות — הכל כלול.",
  },
  {
    icon: "🤝",
    title: "אנחנו איתך",
    desc: "ליווי אישי בהכנה לראיונות ובכל שלב של הקבלה — לא נשארים לבד.",
  },
  {
    icon: "📹",
    title: "ספריית הקלטות עשירה",
    desc: "גישה 24/7 להקלטות השיעורים ולחומרי לימוד — לכל החיים, גם אחרי הקורס.",
  },
  {
    icon: "👥",
    title: "מתרגלים אישיים",
    desc: "מתכנתים חזקים הזמינים יום יום ללא הגבלה — כי ליווי 1:1 הוא קריטי להצלחה.",
  },
  {
    icon: "🏴",
    title: 'מוסד מוכר ע"י המדינה',
    desc: 'קודינג-אקדמי מוכר ע"י משרד הביטחון ומוסדות המדינה.',
  },
  {
    icon: "🤖",
    title: "תכנות בעידן ה-AI",
    desc: "לומדים לנצל כלי AI להאצת כתיבת קוד, איתור תקלות ותכנון מערכות.",
  },
];

const PROFESSIONS = [
  {
    emoji: "💻",
    title: "פיתוח פולסטאק",
    desc: "פיתוח צד שרת וצד לקוח — מערכות ואפליקציות שלמות.",
  },
  {
    emoji: "🤖",
    title: "תכנות AI",
    desc: "כלי בינה מלאכותית שנותנים כוחות-על למי שמשתמש בהם נכון.",
  },
  {
    emoji: "🔐",
    title: "אבטחת סייבר",
    desc: "הגנה והתקפה בעולם הסייבר — מיומנויות מבוקשות.",
  },
  {
    emoji: "🌐",
    title: "בניית אתרים",
    desc: "פלטפורמות חכמות לבניית אתרים מקצועיים במהירות.",
  },
];

const STEPS = [
  {
    n: "01",
    t: "מבוא למדעי המחשב והאינטרנט",
    d: 'היכרות עם תפקידים ביחידות הטכנולוגיות (ממר"ם, 8200 ואחרות), מבנה המחשב, חומרה, מערכות הפעלה, תקשורת ופרוטוקולים, מבנה האינטרנט ובניית אתר בסיסי באמצעות HTML ו-CSS.',
    tag: "🧩 פרויקט — פיתוח אתר אינטרנט",
  },
  {
    n: "02",
    t: "יסודות התכנות — JavaScript",
    d: 'בניית יסודות החשיבה האלגוריתמית עם שפת JavaScript. "שבעת הכלים של המתכנת" — תנאים, לולאות, פונקציות, אובייקטים ועוד. בניית אפליקציות ומשחקים מרהיבים.',
    tag: "🧩 פרויקט — פיתוח משחק",
  },
  {
    n: "03",
    t: "React — ספריית הקוד הנפוצה בעולם",
    d: "היכרות עם React ובניית אפליקציות מרשימות ומורכבות בטכנולוגיה המודרנית ביותר.",
    tag: "🧩 פרויקט — אפליקציה מורכבת",
  },
  {
    n: "04",
    t: "צד שרת עם Node.js",
    d: "עיבוד נתונים, הגנה על מידע, כתיבת REST APIs, ניהול משתמשים, Authentication, הצפנות והרשאות.",
    tag: "🧩 פרויקט - הקמת שרת",
  },
  {
    n: "05",
    t: "מסדי נתונים",
    d: "תכנון וניהול מסדי נתונים — תגלו איך לבנות מבנים חכמים, לנהל מידע בצורה יעילה, ולהבין את ההבדלים בין בסיסי נתונים רלציוניים ללא-רלציוניים. זהו הצעד הראשון שלכם להפוך את הנתונים לכלי עבודה אמיתי.",
    tag: "🧩 פרויקט - דטבייסים",
  },
  {
    n: "06",
    t: "זמן אמת",
    d: "איך ליצור צ'אטים חיים, פידים חברתיים מתעדכנים ומערכות שמגיבות ברגע האמת. זהו הבסיס לפיתוח אינטראקציות מהירות, חלקות וממכרות — בדיוק כמו שהמשתמשים מצפים היום.",
    tag: "🧩 פרויקט - זמן אמת",
  },
  {
    n: "07",
    t: "מערכת מקצה לקצה FullStack",
    d: "חיבור פרונטאנד, בקאנד ודאטה לכדי מערכת שלמה — והקמה בסביבת ענן.",
    tag: "🧩 פרויקט - FullStack",
  },
  {
    n: "08",
    t: "GIT ו-GitHub",
    d: "עבודה עם GIT ו-GitHub לניהול גרסאות ועבודת צוות.",
    tag: "🧩 פרויקט - ניהול גרסאות",
  },
  {
    n: "09",
    t: "הגנת סייבר",
    d: "הגנה והתקפה בעולם הסייבר. מציאת חולשות, הבנת קוד זדוני וכיצד מגינים על מערכות.",
    tag: "🧩 פרויקט - האקינג",
  },
  {
    n: "10",
    t: "תכנות Python",
    d: "כלי Python, מבני נתונים, עבודה עם קבצים, מודולים, טיפול בשגיאות, בניית API ושימוש מתקדם בשפה.",
    tag: "🧩 פרויקט - שימוש בפייתון",
  },
  {
    n: "11",
    t: "הכנה לראיונות",
    d: 'סימולציות ראיון, פתרון אתגרים והתנהלות נכונה בתהליך הקבלה לצה"ל ולהייטק.',
    tag: "🧩 פרויקט - פתרון מבחנים אמיתיים",
  },
  {
    n: "12",
    t: "פרויקט גמר",
    d: "חיבור כל החלקים לפרויקט מרשים שמבדיל אותך מהשאר.",
    tag: "🗝️ כרטיס הכניסה שלך",
  },
];

const WORKSHOP_PILLS = [
  "שימוש מתקדם בכלי AI ו-LLMs",
  "כתיבת קוד מאובטח",
  "Angular & Vue",
  "Python מתקדם",
  "DevOps KickStart Workshop",
  "Flying up with Firebase",
  "Testing & Automation",
  "Backend Mastering",
];


const FAQS = [
  {
    q: "איך אדע אם אני מתאימ.ה?",
    a: "ניתן לבדוק את התאמתך באמצעות פגישה (אונליין) עם יועץ לימודים — מדריך מהקורס, במהלכה ניתן לקבל תחושה לגבי מידת המשיכה שלך לתחום. לא נדרש רקע קודם — מה שחשוב זה המוטיבציה והסקרנות.",
  },
  {
    q: "היכן מתקיים הקורס?",
    a: "הקורס מועבר במפגשי זום פעמיים בשבוע, כ-3 שעות כל מפגש, החל מ-17:30. כלל המפגשים מוקלטים על מנת לאפשר חזרה והתעמקות בחומר. ניתן לגשת לחומרים מכל מקום ובכל שעה.",
  },
  {
    q: "הקורס מבטיח קבלה ליחידה טכנולוגית?",
    a: "לא ניתן להבטיח הבטחה שכזו. מה שכן — הקורס יכין אותך בצורה הטובה ביותר וייתן לך את הכלים לעבור את תהליכי המיון בהצלחה, עם אחוזי ההצלחה הגבוהים בארץ.",
  },
  {
    q: "האם הקורס מכין לתכנות בעידן ה-AI?",
    a: "בוודאי! בעידן שבו ה-AI נמצא בשיא התפתחותו, כישורים בתכנות, חשיבה מערכתית ופתרון בעיות הופכים קריטיים מתמיד. לאורך הקורס נלמד להפיק מקסימום מכלי ה-AI — מהאצת כתיבת קוד ועד תכנון מערכות שלמות.",
  },
  {
    q: "למי הקורס מיועד?",
    a: "הקורס מיועד לתלמידות ותלמידים החל מכיתה ט' המעוניינים להעמיק את הידע ולהגיע לרמה הנדרשת להתקבל ליחידות טכנולוגיות. אם יש לך רצון להיכנס לתחומים המובילים בהייטק ומסקרן אותך לפתור בעיות עם חשיבה לוגית — זה בדיוק בשבילך.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current || !lightRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    lightRef.current.style.left = `${e.clientX - rect.left}px`;
    lightRef.current.style.top = `${e.clientY - rect.top}px`;
    lightRef.current.style.opacity = "1";
  };

  const handleHeroMouseLeave = () => {
    if (lightRef.current) lightRef.current.style.opacity = "0";
  };

  return (
    <div className="lp" dir="rtl">
      {/* ── NAV ── */}
      <nav className="lp-nav">
        <a href="#" className="lp-logo">
          CODING-ACADEMY
        </a>
        <ul className="lp-nav-links">
          <li>
            <a href="#about">אודות</a>
          </li>
          <li>
            <a href="#curriculum">תוכנית</a>
          </li>
          <li>
            <a href="#workshops">סדנאות</a>
          </li>
          <li>
            <a href="#faq">שאלות</a>
          </li>
          <li>
            <Link to="/quiz" className="lp-nav-quiz-link">🧪 מבחני הדמיה</Link>
          </li>
        </ul>
        <a href="#contact" className="lp-btn-primary lp-btn-sm">
          פגישת ייעוץ
        </a>
      </nav>

      {/* ── HERO ── */}
      <div
        className="lp-hero"
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        <div ref={lightRef} className="lp-hero-cursor-light" />
        <div className="lp-hero-glow" />
        <div className="lp-hero-glow2" />
        <div className="lp-hero-inner">
          <div className="lp-badge">🏅 המוביל מסוגו בישראל</div>
          <h1 className="lp-hero-h1">
            המסלול שלך
            <br />ל<span>השתלבות מוצלחת</span>
            <br />
            ביחידה טכנולוגית
          </h1>
          <p className="lp-hero-p">
            קודינג-אקדמי הכשיר אלפי אנשים ונחשב למוביל מסוגו.
            <br />
            בהובלת ירון ביטון — מוביל קורס התכנות הצבאי (ממר"ם) עם 20+ שנות
            ניסיון.
          </p>
          <div className="lp-hero-cta">
            <a href="#contact" className="lp-btn-primary">
               קבע פגישת ייעוץ
            </a>
            <button
              className="lp-btn-outline"
              onClick={() => navigate("/quiz")}
            >
              🧪 מבחני הדמייה
            </button>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="lp-stats">
        {[
          { v: "20+", l: "שנות ניסיון" },
          { v: "אלפי", l: "בוגרים מוצלחים" },
          { v: "12", l: "שבועות אינטנסיביים" },
          { v: "4", l: "מקצועות בקורס אחד" },
          { v: "1:1", l: "ליווי אישי" },
        ].map((s) => (
          <div className="lp-stat" key={s.l}>
            <div className="lp-stat-v">{s.v}</div>
            <div className="lp-stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── ABOUT ── */}
      <section className="lp-section" id="about">
        <div className="lp-section-tag">// למה קודינג אקדמי</div>
        <h2 className="lp-section-title">יתרונות שאין בשום מקום אחר</h2>
        <p className="lp-section-sub">
          הקורס בנוי כך שלא תישאר/י מאחור — עם צוות מלא שזמין עבורך יום-יום, בלי
          הגבלה.
        </p>
        <div className="lp-cards">
          {ABOUT_CARDS.map((c) => (
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
          <div className="lp-section-tag">// 4 מקצועות בקורס אחד</div>
          <h2 className="lp-section-title">שפע תפקידים לבחירה</h2>
          <p className="lp-section-sub">
            אנו מכינים אותך ליחידות הטכנולוגיות בתחומי תכנות וסייבר בעידן ה-AI —
            המקצוע הנדרש ביותר כיום בצבא וגם בהייטק.
          </p>
          <div className="lp-professions">
            {PROFESSIONS.map((p) => (
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
        <h2 className="lp-section-title">מבנה ההכשרה — מסלול ממוקד</h2>
        <p className="lp-section-sub">
          כל שלב מקנה שכבת הבנה נוספת. בכל שלב: תיאוריה, תרגול ובניית פרויקטים.
        </p>
        <div className="lp-curriculum">
          {STEPS.map((s) => (
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
          <div className="lp-section-tag">// אחרי הקורס</div>
          <h2 className="lp-section-title">🎓 סדנאות מקצועיות ותמיכה מתמשכת</h2>
          <p className="lp-section-sub">
            בסיום הקורס מוזמנ/ת לקהילת הבוגרים — סדנאות והרצאות ללא עלות.
          </p>
          <div className="lp-workshop-pills">
            {WORKSHOP_PILLS.map((w) => (
              <div className="lp-workshop-pill" key={w}>
                <span>✦</span> {w}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── TEAM BANNER ── */}
      <div className="lp-team-banner">
        <img
          src={`${import.meta.env.BASE_URL}img/We.jpg`}
          alt="הצוות שלנו"
          className="lp-team-banner-img"
        />
        <div className="lp-team-banner-overlay">
          <div className="lp-team-banner-tag">// הסגל שלנו</div>
          <h2 className="lp-team-banner-title">
            הסגל שלנו ילווה אותך לאורך כל הדרך
          </h2>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className="lp-section" id="faq">
        <div className="lp-section-tag">// שאלות שנשאלנו</div>
        <h2 className="lp-section-title">שאלות נפוצות</h2>
        <p className="lp-section-sub">לא מצאת תשובה? נשמח לתאם שיחת ייעוץ.</p>
        <div className="lp-faq">
          {FAQS.map((item, i) => (
            <div className="lp-faq-item" key={i}>
              <div
                className="lp-faq-q"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {item.q}
                <span className={`lp-faq-icon${openFaq === i ? " open" : ""}`}>
                  +
                </span>
              </div>
              {openFaq === i && <div className="lp-faq-a">{item.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* ── COMMUNITY BANNER ── */}
      <div className="lp-team-banner lp-community-banner">
        <img
          src={`${import.meta.env.BASE_URL}img/photo2.jpg`}
          alt="קהילת בוגרים"
          className="lp-team-banner-img"
        />
        <div className="lp-team-banner-overlay">
          <div className="lp-team-banner-tag">// הקהילה שלנו</div>
          <h2 className="lp-team-banner-title">הצטרף לקהילת בוגרים מקצועית שתתמוך בך גם אחרי הקורס</h2>
        </div>
      </div>

      {/* ── CTA ── */}
      <section
        className="lp-section"
        id="contact"
      >
        <div className="lp-yaron-wrap">
          <div className="lp-yaron-portrait">
            <img
              src={`${import.meta.env.BASE_URL}img/YaronBiton.png`}
              alt="ירון ביטון"
            />
          </div>
        </div>
        <div className="lp-cta-banner">
          <h2>🤝 פגישת ייעוץ עם מדריכ/ה מהקורס</h2>
          <p>
            מענה לכל שאלה ע"י יועצי לימוד מקצועיים, בחירת המסלול המתאים לך
            והתנסות ראשונית בקוד.
          </p>
          <a
            href="https://www.coding-academy.org/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="lp-btn-primary"
            style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}
          >
            קבע/י פגישה עכשיו
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div className="lp-footer-grid">
          {/* Right column - Logo & Contact */}
          <div className="lp-footer-col">
            <img
              src={`${import.meta.env.BASE_URL}img/logo.png`}
              alt="Coding Academy"
              className="lp-footer-logo"
            />
            <p className="lp-footer-desc">
              יש רגעים שמגדירים את מי שנהיה.
              <br />
              הבחירה ללכת למסלול טכנולוגי היא אחד מהם.
              <br />
              יחידה טכנולוגית היא לא רק שירות — זו הזדמנות להפוך פוטנציאל לכוח,
              וסקרנות למקצוע.
            </p>
            <p className="lp-footer-desc" style={{ marginTop: "0.5rem" }}>
              הכשרה ברמה הגבוהה ביותר, ניסיון אמיתי, וסביבה שמגדלת מצוינות — זו
              נקודת הזינוק לקריירה שתמיד רצית.
            </p>
            <div className="lp-footer-contact">
              <p>
                טלפון:{" "}
                <a
                  href="tel:0795551155"
                  dir="ltr"
                  style={{ unicodeBidi: "embed" }}
                >
                  079-555-1155
                </a>
              </p>
              <p>
                דוא"ל:{" "}
                <a href="mailto:admin@misterbit.co.il">admin@misterbit.co.il</a>
              </p>
            </div>
          </div>

          {/* Middle column - Hours */}
          <div className="lp-footer-col">
            <h4 className="lp-footer-title">שעות פעילות</h4>
            <div className="lp-footer-hours">
              <p>
                <span>ראשון – חמישי:</span> <span>10:00 – 19:00</span>
              </p>
              <p>
                <span>שישי:</span> <span>10:00 – 14:00</span>
              </p>
            </div>
          </div>

          {/* Left column - Map */}
          <div className="lp-footer-col">
            <h4 className="lp-footer-title">איך מגיעים אלינו</h4>
            <img
              src={`${import.meta.env.BASE_URL}img/map.png`}
              alt="מפה"
              className="lp-footer-map"
            />
            <p className="lp-footer-address">הבונים 4, רמת גן</p>
          </div>
        </div>

        <div className="lp-footer-bottom">
          <p>© כל הזכויות שמורות ל-Coding Academy</p>          
          <p className="lp-footer-disclaimer">
            הקורס אינו מתחייב ואינו אחראי לקבלה לתפקיד הצבאי המבוקש
          </p>
        </div>
      </footer>
    </div>
  );
}
