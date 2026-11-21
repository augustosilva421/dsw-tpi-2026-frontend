import FormActions from '../../shared/components/FormActions';
import Alert from '../../shared/components/Alert';
import Icon from '../../shared/components/Icon';
import { ICON_PATHS } from '../../shared/constants/iconPaths';
import useDoctorAvailabilityForm from '../hooks/useDoctorAvailabilityForm';
import DoctorAvailabilityTable from './DoctorAvailabilityTable';

function DoctorAvailabilityForm({
  existingDays,
  onBusyChange,
  onCancel,
  onSubmit,
}) {
  const { rows, submitting, formError, updateRow, handleSubmit } =
    useDoctorAvailabilityForm({ existingDays, onSubmit, onBusyChange });

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-lg border border-med-border bg-white"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 px-5 py-6">
        <h2 className="text-sm font-medium text-med-primary-900">
          Configuración de Horarios
        </h2>
        <span className="flex items-center gap-1 text-[11px] text-med-text-sub">
          <Icon path={ICON_PATHS.clock} className="h-3 w-3" /> Intervalos
          automáticos de 30 minutos
        </span>
      </header>
      <fieldset disabled={submitting} className="min-w-0">
        <legend className="sr-only">Días y horarios de atención</legend>
        <DoctorAvailabilityTable rows={rows} updateRow={updateRow} />
      </fieldset>

      {formError && (
        <div className="px-5 pt-4">
          <Alert>{formError}</Alert>
        </div>
      )}

      <FormActions
        className="px-5 pb-5"
        onCancel={onCancel}
        submitting={submitting}
        submitLabel="Guardar Disponibilidad"
      />
    </form>
  );
}

export default DoctorAvailabilityForm;
