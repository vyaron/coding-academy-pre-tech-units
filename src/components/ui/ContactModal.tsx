import { useState } from 'react';
import './ContactModal.css';

interface Props {
  onClose: () => void;
}

export default function ContactModal({ onClose }: Props) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', consent: false });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    e.currentTarget.setCustomValidity('');
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function invalidMsg(msg: string) {
    return (e: React.InvalidEvent<HTMLInputElement>) => e.currentTarget.setCustomValidity(msg);
  }

  const SHEET_URL = 'https://script.google.com/macros/s/AKfycby7KTiWjeh9liVmukk-2oug-p9-WzDxBDEdOSfQ5Q6KVsQeCPSFSOP0Sws8gVRmkQnV4w/exec';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email }),
    }).catch(() => {});
    setSubmitted(true);
    setTimeout(() => onClose(), 3500);
  }

  return (
    <div className="cm-overlay" onClick={onClose}>
      <div
        className={`cm-box cm-flipper${submitted ? ' cm-flipped' : ''}`}
        dir="rtl"
        onClick={e => e.stopPropagation()}
      >
        {/* ── FRONT ── */}
        <div className="cm-face cm-front">
          <button className="cm-close" onClick={onClose} aria-label="סגור">✕</button>
          <h2 className="cm-title">דברו איתי</h2>
          <form className="cm-form" onSubmit={handleSubmit}>
            <label className="cm-label">
              שם מלא
              <input
                className="cm-input"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                onInvalid={invalidMsg('שדה חובה – נא למלא שם מלא')}
                required
                placeholder="ישראל ישראלי"
              />
            </label>
            <label className="cm-label">
              טלפון
              <input
                className="cm-input"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onInvalid={invalidMsg('שדה חובה – נא למלא מספר טלפון')}
                required
                placeholder="050-0000000"
              />
            </label>
            <label className="cm-label">
              אימייל
              <input
                className="cm-input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </label>
            <label className="cm-checkbox-label">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
                onInvalid={invalidMsg('יש לאשר את קבלת העדכונים כדי להמשיך')}
                required
              />
              אני מאשר לקבל מכם מיילים עם תכנים, עדכונים והצעות
            </label>
            <button className="cm-submit" type="submit">
              לקבלת פרטים ›
            </button>
          </form>
        </div>

        {/* ── BACK ── */}
        <div className="cm-face cm-back">
          <img src="img/phone.gif" alt="" className="cm-success-gif" />
          <p className="cm-success-msg">נעים להכיר, נהיה בקשר איתך בקרוב</p>
          <p className="cm-access-code-msg">אם ברצונך להתנסות במבחני ההדמיה, קוד הגישה הינו 4747</p>
        </div>
      </div>
    </div>
  );
}
