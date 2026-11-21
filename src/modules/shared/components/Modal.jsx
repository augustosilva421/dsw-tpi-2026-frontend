import { useEffect } from 'react';

function Modal({ title, description, onClose, children }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-med-border p-6"
      >
        <h2 className="text-lg font-bold text-med-primary-900">{title}</h2>
        {description && (
          <p className="text-xs text-med-text-sub mt-1">{description}</p>
        )}
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
