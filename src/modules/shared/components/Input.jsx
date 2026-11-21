import { useId } from 'react';

function Input({
  label,
  error = '',
  className = '',
  icon,
  id,
  size = 'default',
  ...restProps
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-med-text-main"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-med-text-muted">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`w-full border ${size === 'compact' ? 'rounded-none! px-2 py-1.5 text-xs' : 'rounded-lg px-3.5 py-2.5 text-sm'} bg-white text-med-text-main placeholder-med-text-muted transition focus:outline-none focus:ring-2 focus:ring-med-primary-600 focus:border-transparent ${
            error ? 'border-red-400 bg-red-50/20' : 'border-med-border'
          } ${icon ? 'pl-9' : ''} ${className}`}
          {...restProps}
        />
      </div>
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
