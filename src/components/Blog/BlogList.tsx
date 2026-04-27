import { useNavigate } from 'react-router-dom';
import ARTICLES from '../../data/articles';
import BackgroundCanvas from '../BackgroundCanvas';
import './Blog.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogList() {
  const navigate = useNavigate();

  return (
    <div className="blog-page" dir="rtl">
      <BackgroundCanvas />
      <button className="blog-back" onClick={() => navigate('/')}>← חזרה לאתר</button>

      <div className="blog-header">
        <div className="blog-header-tag">// מאמרים</div>
        <h1 className="blog-title">מדריכים וטיפים להכנה</h1>
        <p className="blog-subtitle">מאמרים מקצועיים על הכנה למיונים,<br /> שאלות טכניות ותהליכי קבלה ליחידות טכנולוגיות.</p>
      </div>

      <div className="blog-grid">
        {ARTICLES.map((article, i) => (
          <article
            key={article.slug}
            className="blog-card"
            style={{ '--i': i } as React.CSSProperties}
            onClick={() => navigate(`/articles/${article.slug}`)}
          >
            <div className="blog-card-tags">
              {article.tags.map((tag) => (
                <span className="blog-tag" key={tag}>{tag}</span>
              ))}
            </div>
            <h2 className="blog-card-title">{article.title}</h2>
            <p className="blog-card-excerpt">{article.excerpt}</p>
            <div className="blog-card-footer">
              <span className="blog-card-date">{formatDate(article.date)}</span>
              <span className="blog-card-read">{article.readTime}</span>
            </div>
          </article>
        ))}
      </div>

      <section className="blog-bottom-cta" aria-label="יצירת קשר">
        <img
          src={`${import.meta.env.BASE_URL}img/YaronBiton.gif`}
          alt="ירון ביטון"
          className="blog-bottom-cta-gif"
          loading="lazy"
        />
        <div className="blog-bottom-cta-content">
          <h3>למידע נוסף, ייעוץ חינם וכל שאלה</h3>
          <a
            href="https://www.coding-academy.org/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="blog-bottom-cta-link"
          >
            צור קשר
          </a>
        </div>
      </section>
    </div>
  );
}
