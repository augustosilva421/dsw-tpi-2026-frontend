import Button from './Button';
import Icon from './Icon';

function IconButton({ label, path, danger = false, className = '', ...props }) {
  return (
    <Button
      {...props}
      variant="unstyled"
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${
        danger
          ? 'text-med-danger-text hover:bg-med-danger-bg'
          : 'text-med-primary-600 hover:bg-med-primary-50'
      } ${className}`}
    >
      <Icon path={path} className="h-4 w-4" />
    </Button>
  );
}

export default IconButton;
