import Button from './Button';
import Modal from './Modal';

function ConfirmDialog({
  title,
  message,
  confirmLabel = 'Confirmar',
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="text-sm text-med-text-sub">{message}</p>
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading ? 'Procesando...' : confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;