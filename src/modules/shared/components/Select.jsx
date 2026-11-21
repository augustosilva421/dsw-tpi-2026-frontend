import { useId } from 'react';

function Select({
  label,
  labelClassName = 'text-xs font-semibold text-med-text-main',
  error = '',
  className = '',
  children,
  icon,
  id,
  ...restProps
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className={labelClassName}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-med-text-muted">
            {icon}
          </span>
        )}
        <select
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`w-full border rounded-lg px-3.5 py-2.5 text-sm bg-white text-med-text-main transition focus:outline-none focus:ring-2 focus:ring-med-primary-600 focus:border-transparent disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-med-text-muted disabled:opacity-70 ${
            error ? 'border-red-400 bg-red-50/20' : 'border-med-border'
          } ${icon ? 'pl-9' : ''} ${className}`}
          {...restProps}
        >
          {children}
        </select>
      </div>
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-red-500 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}

export default Select;
