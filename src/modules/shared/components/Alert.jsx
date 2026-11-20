const toneClasses = {
  success: 'bg-med-active-bg text-med-active-text',
  error: 'bg-med-danger-bg text-med-danger-text',
};

function Alert({ type = 'error', children, onClose }) {
  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`flex items-start justify-between gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
        toneClasses[type] || toneClasses.error
      }`}
    >
      <span>{children}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar mensaje"
          className="opacity-70 hover:opacity-100 transition"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default Alert;