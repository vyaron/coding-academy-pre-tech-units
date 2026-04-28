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
    d: 'היכרות עם הסגל (בוגרי ממר"ם, 8200 והיחידות הטכנולוגיות), התפקידים השונים בהן ושלבי המיון. מבנה המחשב, ייצוג בבסיסים שונים, חומרה, רכיבי זכרון, מסדי נתונים, מערכות ענן, מערכות הפעלה, Threads, Processes. תקשורת ופרוטוקולים, מבנה האינטרנט, בניית אתר בסיסי עם HTML ו-CSS. מבוא ל-AI ושימוש בו בעולמות התוכנה והסייבר.',
    tag: "🧩 פרויקט — פיתוח אתר אינטרנט",
  },
  {
    n: "02",
    t: "יסודות התכנות",
    d: 'בניית יסודות החשיבה האלגוריתמית והבנה לוגית עם שפת JavaScript. "שבעת הכלים של המתכנת" — תנאים, לולאות, פונקציות, אובייקטים ומבנים שכל מפתח חייב לשלוט בהם. בניית אפליקציות ומשחקים המעודדים חשיבה לוגית ויצירתית.',
    tag: "🧩 פרויקט — פיתוח משחק",
  },
  {
    n: "03",
    t: "תכנות מתקדם ויצירת משחקים",
    d: "הוספת ממשקי משתמש ובניית אפליקציות מלאות ומשחקים. השלבים בהם נדרשים לאתגרים בעולם התכנות ובמיונים ליחידות. עבודה עם GIT ו-GitHub לניהול גרסאות ועבודה בצוות. חיבור הכל בפרויקט מעשי והעלאת האפליקציות לענן.",
    tag: "🧩 פרויקט — אפליקציה מורכבת",
  },
  {
    n: "04",
    t: "צד השרת ומערכת פולסטאק",
    d: 'פיתוח צד השרת האחראי על עיבוד נתונים, הגנה על מידע והנגשתו למשתמשים מורשים. כתיבת לוגיקות נפוצות ו-APIs בצד שרת עם Node.js. REST API וזיהוי התחברות וניהול משתמשים. Authentication, הצפנות, Authorization, Roles והרשאות. עקרונות אבטחת מידע והבנת "מאחורי הקלעים" של כל אפליקציה מודרנית. היכרות עם מסדי נתונים ו-SQL. בניית מערכת מלאה הכוללת שרת וקליינט.',
    tag: "🧩 פרויקט - הקמת שרת",
  },
  {
    n: "05",
    t: "תכנות בפייתון",
    d: "היכרות עם כלי התכנות בפייתון, מבני נתונים, עבודה עם קבצים (FileIO), Exceptions, Networking, Map, List Comprehension, Lambda, תכנות מונחה עצמים (OOP), מודולים, טיפול בשגיאות, בניית API Socket Encoding ושימוש מתקדם בשפה.",
    tag: "🧩 פרויקט - שימוש בפייתון",
  },
  {
    n: "06",
    t: "שפת C# ותכנות מונחה עצמים",
    d: "שפות תכנות שונות וההבדלים ביניהן. קומפילציה והשלכות על זכרון המחשב: SWAP, HEAP, STACK. DELEGATES, GENERICS, ATTRIBUTES. תכנות מונחה עצמים (OOP): ירושה ופולימורפיזם.",
    tag: "🧩 פרויקט - OOP",
  },
  {
    n: "07",
    t: "סימולציות אמצע קורס",
    d: "מעבר על הנושאים שנלמדו עד כה. פתרון מבחני מיון רלוונטים ליחידות הטכנולוגיות השונות.",
    tag: "🎯 סימולציה",
  },
  {
    n: "08",
    t: "רשתות תקשורת",
    d: "מודל 7 השכבות ורכיבי החומרה ברשת. ניתוח תעבורת רשת ב-Wireshark וכלים נוספים. פרוטוקולי תקשורת חשובים (טקסטואלים ובינאריים), MultiPlexing, יכולות והגדרות של חומות אש (Firewall) למניעה של התקפות סייבר. הצפנות TLS וביצוע התקפות ManInTheMiddle. ניתוח תעבורה ופענוח רכיבי תקשורת ויישויות ברשת.",
    tag: "🧩 פרויקט - ניתוח רשתות",
  },
  {
    n: "09",
    t: "סייבר",
    d: "הגנה והתקפה בעולם הסייבר. איך מגינים על מערכת, איך מוצאים חולשות, איך מייצרים וירוסים ומהו קוד זדוני. סוגי התקיפות הנפוצות: Phishing, Malware, DDoS, Injections, Brute-Force, Man-in-the-Middle, Zero-Day, XSS, CSRF ועוד.",
    tag: "🧩 פרויקט - האקינג",
  },
  {
    n: "10",
    t: "סימולציות הכנה למבחני המיון",
    d: 'כל חלקי הקורס מכינים אותך לראיונות קבלה בצה"ל ובהייטק. לקראת סיום הקורס עיסוק ממוקד בנושא זה: סימולציות וחיתוך אתגרים מתהליכי המיון בהם תפגשו.',
    tag: "🎯 סימולציה",
  },
  {
    n: "11",
    t: "סימולציות BlackBox ומבחני להב",
    d: 'התאמון על פתרון אתגרים קשים כדי לפרוץ לשרתים וגנוב מידע כדי למצוא את ה"דגל". רמזים מתחבאים בטקסט, בתמונות ובקבצים בשרת. מבחנים מעשיים המשלבים סייבר, מחקר ורשתות.',
    tag: "🧩 פרויקט - BlackBox",
  },
  {
    n: "12",
    t: "הראיון האישי וסימולציות סיכום",
    d: "דגשים למעבר סוגי הראיונות השונים. סימולציות מעבר ראיון אישי. מעבר על הנושאים שנלמדו בקורס ודרכים להמשך התאמנות. סימולציית סיכום הקורס.",
    tag: "🗝️ כרטיס הכניסה שלך",
  },
];

const WORKSHOP_PILLS = [
  "שימוש מתקדם בכלי AI ו-LLMs",
  "כתיבת קוד מאובטח",
  "React, Angular & Vue",
  "Python מתקדם",
  "DevOps KickStart Workshop",
  "Flying up with Firebase",
  "Testing & Automation",
  "Backend Mastering",
];

const PARTNER_LOGOS = [
  { src: "img/partners/alia.png", alt: "משרד העלייה והקליטה" },
  { src: "img/partners/labor.png", alt: "משרד העבודה" },
  { src: "img/partners/cupon.png", alt: "תוכנית השוברים" },
  { src: "img/partners/security.png", alt: "משרד הביטחון" },
  { src: "img/partners/soldiers.png", alt: "פיקדון חיילים משוחררים" },
];

const SOCIAL_PROOF_REVIEWS = [
  {
    name: "נועה ברק",
    avatar: "נב",
    quote:
      "חיפשתי הכנה אמיתית לעולמות הסייבר, ובקורס קיבלתי בדיוק את זה: תרגול hands-on, חשיבה התקפית והגנתית, וסימולציות שנתנו לי ביטחון להגיע מוכנה למיונים.",
    highlight: "נתן לי כיוון ברור לסייבר",
  },
  {
    name: "עידו שחם",
    avatar: "עש",
    quote:
      "ההכנה למיונים היתה מדויקת. עבדנו על רשתות, אבטחת מידע ופתרון אתגרים ברמה גבוהה, וזה עזר לי להגיע לתפקיד הטכנולוגי שבאמת רציתי.",
    highlight: "הכנה מדויקת לתפקיד שרציתי",
  },
  {
    name: "מאיה קדם",
    avatar: "מק",
    quote:
      "הגעתי בלי רקע משמעותי בסייבר, ובמהלך הקורס בניתי בסיס חזק מאוד. השילוב בין מדריכים חזקים לתרגולים מעשיים נתן לי יתרון אמיתי בתהליך הקבלה.",
    highlight: "יתרון אמיתי במיונים",
  },
  {
    name: "יואב תמר",
    avatar: "גם",
    quote:
      "מה שהיה חזק במיוחד זו ההבנה איך נראים המיונים באמת. התאמנו על אתגרי סייבר, חשיבה מהירה וראיונות, ובסוף הרגשתי שאני מגיע חד ומוכן.",
    highlight: "הרגשתי מוכן ליום האמת",
  },
  {
    name: "תמר נבון",
    avatar: "תנ",
    quote:
      "הקורס חיבר בין תכנות, רשתות וסייבר בצורה שעשתה לי סדר. מעבר לידע, קיבלתי גם הכוונה אמיתית איך לכוון ליחידה הנכונה ואיך לבלוט במיונים.",
    highlight: "עזר לי לכוון ליחידה הנכונה",
  },
  {
    name: "רועי הדר",
    avatar: "רה",
    quote:
      "זו לא רק למידה תאורטית. יש כאן הכנה ממוקדת למי שרוצה להשתלב ביחידה טכנולוגית, עם דגש חזק על סייבר, פתרון בעיות והיכרות עם סוגי האתגרים שפוגשים בדרך.",
    highlight: "ממוקד ליעד של יחידה טכנולוגית",
  },
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
  {
    q: "האם נדרש רקע טכנולוגי כלשהו לפני תחילת הקורס?",
    a: "לא נדרש רקע קודם בתכנות או בטכנולוגיה. הקורס בנוי כך שמתחילים מאפס ומתקדמים בהדרגה. מה שחשוב הוא סקרנות, מוטיבציה ורצון ללמוד — את השאר נלמד יחד.",
  },
  {
    q: "מה קורה אחרי הקורס — האם יש ליווי לאחר סיום?",
    a: "בהחלט! הסטודנטים שלנו ממשיכים לקבל ליווי ותמיכה גם לאחר סיום הקורס — בין אם במהלך תהליכי המיון, ובין אם בהמשך הדרך בשירות הצבאי. אנחנו גאים בקהילה החזקה שנבנית סביב הקורס.",
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
            <Link to="/articles">מאמרים</Link>
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
                קורס הכנה למיוני
                <br /><span>היחידות הטכנולוגיות</span>
          </h1>
          <p className="lp-hero-p">
            <span className="lp-hero-subtitle">
              ממר"ם · 8200 · שחקים · גאמא · חבצלות
            </span>
            בהובלת <strong>ירון ביטון</strong> - לשעבר מוביל קורסי ההכשרה
            הצבאיים, המדריך המוערך בישראל להכשרת מתכנתים ואנשי סייבר
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
          <div className="lp-hero-start-date">יוצאים לדרך ב: 1.7.2026</div>
          <div className="lp-hero-offer" aria-label="הצעת רכישה">
            <div className="lp-hero-offer-line">
              מומלץ לרכוש את ערכת ההכנה ולתפוס מקום במחזור הקרוב
            </div>
            <div className="lp-hero-offer-note">
              המחיר מתייחס לערכת ההכנה בלבד ואינו כולל את הקורס המלא
            </div>
            <div className="lp-hero-offer-tier lp-hero-offer-tier--soldout">
              <span className="lp-hero-offer-label">מקדימי רישום</span>
              <span className="lp-hero-offer-price">280 ש"ח</span>
              <span className="lp-hero-offer-soldout">SOLD OUT</span>
            </div>
            <div className="lp-hero-offer-tier lp-hero-offer-tier--active">
              <span className="lp-hero-offer-label">רישום בהנחה לזמן מוגבל</span>
              <span className="lp-hero-offer-price">320 ש"ח</span>
            </div>
            <div className="lp-hero-offer-tier">
              <span className="lp-hero-offer-label">מצטרפים אחרונים</span>
              <span className="lp-hero-offer-price">460 ש"ח</span>
            </div>
            <a href="#contact" className="lp-btn-primary lp-hero-offer-btn">
              לרכוש כעת
            </a>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="lp-stats">
        {[
          { v: "20+", l: "שנות ניסיון" },
          { v: "אלפי", l: "בוגרים מוצלחים" },
          { v: "12", l: "שבועות מרתקים" },
          { v: "4", l: "מקצועות בקורס אחד" },
          { v: "1:1", l: "ליווי אישי" },
        ].map((s) => (
          <div className="lp-stat" key={s.l}>
            <div className="lp-stat-v">{s.v}</div>
            <div className="lp-stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      <section className="lp-social-proof" aria-labelledby="social-proof-title">
        <div className="lp-social-proof-head">
          <h2 className="lp-section-title" id="social-proof-title">
            מה בוגרים מספרים עלינו
          </h2>
          <p className="lp-section-sub">
            משובים וחוות דעת של בוגרי קודינג אקדמי
          </p>
        </div>
        <div className="lp-social-proof-strip" role="list" aria-label="חוות דעת בוגרים">
          {SOCIAL_PROOF_REVIEWS.map((review) => (
            <article className="lp-review-card" key={review.name} role="listitem">
              <div className="lp-review-top">
                <div className="lp-review-avatar" aria-hidden="true">
                  {review.avatar}
                </div>
                <div>
                  <h3>{review.name}</h3>
                  <div className="lp-review-stars" aria-label="5 מתוך 5 כוכבים">
                    ★★★★★
                  </div>
                </div>
              </div>
              <div className="lp-review-highlight">{review.highlight}</div>
              <p>{review.quote}</p>
            </article>
          ))}
        </div>
      </section>

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
          ההכשרה מחולקת ל-12 פרקים, בכל פרק 2 מפגשים בני 3 שעות (24 מפגשים בסה"כ). כל פרק מקנה לך את הידע הנדרש בנושאים ספציפיים. בכל פרק יש תיאוריה ותרגול. לרשותך מתרגלים זמינים לפגישות אישיות 1:1. בסיומו של כל פרק תתבצע סימולציה של שאלות ממבחני היחידות הטכנולוגיות. בסיום ההכשרה יבוצעו סימולציות חזרה וסימולציית הכנה לראיון אישי.
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

      {/* ── PARTNERS ── */}
      <section className="lp-section lp-partners" id="partners">
        <div className="lp-section-tag">// מוסדות ממלכתיים</div>
        <h2 className="lp-section-title">קודינג אקדמי - מוכר על ידי מוסדות המדינה</h2>
        <p className="lp-section-sub">
          בית ספר מוכר ע"י מוסדות המדינה
        </p>
        <div className="lp-partners-stamp-wrap">
          <img
            src={`${import.meta.env.BASE_URL}img/partners/approved.png`}
            alt="אישור מוסדות המדינה"
            className="lp-partners-stamp"
            loading="lazy"
          />
        </div>
        <div className="lp-partners-grid">
          {PARTNER_LOGOS.map((partner) => (
            <div className="lp-partner-card" key={partner.src}>
              <img
                src={`${import.meta.env.BASE_URL}${partner.src}`}
                alt={partner.alt}
                className="lp-partner-logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

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
              <div className={`lp-faq-a${openFaq === i ? " open" : ""}`}>{item.a}</div>
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
