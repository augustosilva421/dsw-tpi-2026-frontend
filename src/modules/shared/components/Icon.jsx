function Icon({ path, title, className = 'h-4 w-4', ...props }) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      aria-label={title}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {title && <title>{title}</title>}
      <path d={path} />
    </svg>
  );
}

export default Icon;
