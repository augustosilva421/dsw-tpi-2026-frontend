import Button from './Button';
import Icon from './Icon';
import { ICON_PATHS } from '../constants/iconPaths';

function FormActions({
  onCancel,
  submitting = false,
  submitLabel,
  cancelLabel = 'Cancelar',
  submittingLabel = 'Guardando...',
  className = '',
  tone = 'default',
}) {
  return (
    <div
      className={`flex flex-wrap justify-end gap-3 border-t border-med-border-subtle pt-6 [&_button]:min-h-[38px] [&_button]:rounded-[3px] [&_button]:px-5 [&_button]:text-xs [&_button[type=button]]:border-[#8da9c1] [&_button[type=button]]:text-[#254f80] [&_button[type=submit]:hover]:bg-[#183d68] ${tone === 'strong' ? '[&_button[type=submit]]:bg-[#12365a]' : '[&_button[type=submit]]:bg-[#254f80]'} ${className}`}
    >
      <Button variant="outline" onClick={onCancel} disabled={submitting}>
        {cancelLabel}
      </Button>
      <Button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2"
      >
        <Icon path={ICON_PATHS.save} />
        {submitting ? submittingLabel : submitLabel}
      </Button>
    </div>
  );
}

export default FormActions;
