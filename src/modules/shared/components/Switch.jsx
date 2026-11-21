import Button from './Button';

function Switch({
  checked,
  onChange,
  label,
  disabled = false,
  checkedLabel = 'Activo',
  uncheckedLabel = 'Inactivo',
}) {
  return (
    <Button
      variant="unstyled"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 text-xs"
    >
      <span
        className={`relative h-4 w-8 shrink-0 rounded-full transition-colors ${checked ? 'bg-med-primary-600' : 'bg-slate-200'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-4' : ''}`}
        />
      </span>
      <span className={checked ? 'text-med-primary-600' : ''}>
        {checked ? checkedLabel : uncheckedLabel}
      </span>
    </Button>
  );
}

export default Switch;
