import './Modal.css';

interface Props {
  icon?: string;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export default function Modal({
  icon = '?',
  title,
  message,
  confirmLabel = 'OK',
  cancelLabel = 'CANCEL',
  onConfirm,
  onCancel,
  danger = false,
}: Props) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">{icon}</div>
        <div className="modal-title">{title}</div>
        <p className={`modal-message${danger ? ' danger' : ''}`}>{message}</p>
        <div className="modal-actions">
          <button className="modal-btn cancel" onClick={onCancel}>{cancelLabel}</button>
          <button
            className={`modal-btn confirm${danger ? ' danger-confirm' : ''}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
