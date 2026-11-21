import Card from '../../shared/components/Card';
import Icon from '../../shared/components/Icon';
import { ICON_PATHS } from '../../shared/constants/iconPaths';
import Select from '../../shared/components/Select';
import { getInitials } from '../../shared/helpers/userDisplay';

function DoctorAvailabilitySidebar({ doctors, doctor, disabled, onSelect }) {
  return (
    <aside className="flex flex-col gap-5">
      <Card>
        <Select
          label="Seleccionar Profesional"
          labelClassName="text-sm font-medium text-med-primary-900"
          id="availability-doctor"
          disabled={disabled}
          value={doctor?.id ?? ''}
          onChange={(event) => onSelect(event.target.value)}
        >
          {!doctor && (
            <option value="" disabled>
              Seleccione profesional
            </option>
          )}
          {doctors.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
              {item.specialty?.name ? ` - ${item.specialty.name}` : ''}
            </option>
          ))}
        </Select>
        {doctor && (
          <div className="mt-5 flex items-center gap-3 rounded bg-med-primary-100/70 p-3">
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-med-primary-200 font-semibold text-med-primary-900"
            >
              {getInitials(doctor.name)}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-med-primary-900">
                {doctor.name}
              </p>
              <p className="mt-1 break-words text-xs text-med-text-sub">
                Matrícula: {doctor.licenseNumber || 'Sin matrícula'}
              </p>
              <p className="text-xs text-med-primary-600">
                {doctor.specialty?.name}
              </p>
            </div>
          </div>
        )}
      </Card>
      <Card>
        <div className="flex gap-3">
          <Icon
            path={ICON_PATHS.info}
            className="h-5 w-5 shrink-0 text-med-primary-600"
          />
          <p className="text-xs leading-relaxed text-med-text-sub">
            Los cambios se aplican a los horarios disponibles del mes actual.
            Las citas ya reservadas se conservan.
          </p>
        </div>
      </Card>
    </aside>
  );
}

export default DoctorAvailabilitySidebar;
