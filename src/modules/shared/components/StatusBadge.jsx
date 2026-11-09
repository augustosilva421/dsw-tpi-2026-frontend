const toneClasses = {
  success: 'bg-med-active-bg text-med-active-text',
  warning: 'bg-med-leave-bg text-med-leave-text',
  danger: 'bg-med-danger-bg text-med-danger-text',
  neutral: 'bg-gray-100 text-gray-600',
  info: 'bg-med-primary-100 text-med-primary-700',
};

function StatusBadge({
  children,
  tone = 'neutral',
  dot = false,
  className = '',
}) {
  const appliedTone = toneClasses[tone] || toneClasses.neutral;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${appliedTone} ${className}`}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export default StatusBadge;
