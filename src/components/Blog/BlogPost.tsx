import { useState, useEffect } from 'react';
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
  const [modalImg, setModalImg] = useState<string | null>(null);

  useEffect(() => {
    if (!modalImg) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalImg(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalImg]);

  if (!article) return <Navigate to="/articles" replace />;

  return (
    <div className="blog-page" dir="rtl">
      {modalImg && (
        <div className="blog-modal-overlay" onClick={() => setModalImg(null)}>
          <img src={modalImg} alt="" className="blog-modal-img" onClick={(e) => e.stopPropagation()} />
          <button className="blog-modal-close" onClick={() => setModalImg(null)}>✕</button>
        </div>
      )}
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
                <div className="blog-img-wrap blog-img-clickable" onClick={() => setModalImg(section.image!)}>
                  <img src={section.image} alt={section.heading ?? ''} className="blog-img" loading="lazy" />
                </div>
              )}
              {section.images && section.images.length > 0 && (
                <div className={`blog-img-gallery${section.images.length > 1 && section.imageStyle !== 'contain' ? ' blog-img-gallery--grid' : ''}`}>
                  {section.images.map((img, j) => (
                    <div
                      className={`blog-img-wrap blog-img-clickable${section.imageStyle === 'contain' ? ' blog-img-wrap--contain' : ''}`}
                      key={j}
                      onClick={() => setModalImg(img)}
                    >
                      <img src={img} alt={section.heading ?? ''} className="blog-img" loading="lazy" />
                    </div>
                  ))}
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
