import type { ExamStory } from '../../types/exam';
import './StoryModal.css';

interface Props {
  story: ExamStory;
  onClose: () => void;
}

export default function StoryModal({ story, onClose }: Props) {
  return (
    <div className="story-overlay" onClick={onClose}>
      <div className="story-box" dir="rtl" onClick={(e) => e.stopPropagation()}>
        <div className="story-header">
          <span className="story-title">📖 {story.title}</span>
          <button className="story-close" onClick={onClose}>✕</button>
        </div>

        <div className="story-content">
          {story.sections.map((section, i) => (
            <div key={i} className="story-section">
              {section.heading && (
                <div className="story-heading">{section.heading}</div>
              )}
              {section.text && section.text.split('\n\n').map((para, j) => (
                <p key={j} className="story-text">{para}</p>
              ))}
              {section.items && (
                <ul className="story-list">
                  {section.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="story-footer">
          <button className="story-close-btn" onClick={onClose}>סגור</button>
        </div>
      </div>
    </div>
  );
}
