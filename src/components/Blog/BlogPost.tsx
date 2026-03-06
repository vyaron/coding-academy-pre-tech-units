import { useParams, useNavigate, Navigate } from 'react-router-dom';
import ARTICLES from '../../data/articles';
import './Blog.css';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/articles" replace />;

  return (
    <div className="blog-page" dir="rtl">
      <button className="blog-back" onClick={() => navigate('/articles')}>← חזרה למאמרים</button>

      <article className="blog-post">
        <div className="blog-card-tags">
          {article.tags.map((tag) => (
            <span className="blog-tag" key={tag}>{tag}</span>
          ))}
        </div>

        <h1 className="blog-post-title">{article.title}</h1>

        <div className="blog-post-meta">
          <span>{formatDate(article.date)}</span>
          <span className="blog-meta-dot">·</span>
          <span>{article.readTime}</span>
        </div>

        <p className="blog-post-excerpt">{article.excerpt}</p>

        <div className="blog-post-divider" />

        <div className="blog-post-body">
          {article.sections.map((section, i) => (
            <div className="blog-post-section" key={i}>
              {section.heading && <h2 className="blog-post-heading">{section.heading}</h2>}
              <p className="blog-post-text">{section.body}</p>
              {section.image && (
                <div className="blog-img-wrap">
                  <img
                    src={section.image}
                    alt={section.heading ?? ''}
                    className="blog-img"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="blog-post-divider" />

        <div className="blog-post-nav">
          <button className="blog-back-btn" onClick={() => navigate('/articles')}>
            ← חזרה לכל המאמרים
          </button>
          <button className="blog-quiz-btn" onClick={() => navigate('/quiz')}>
            מבחני הדמיה →
          </button>
        </div>
      </article>
    </div>
  );
}
