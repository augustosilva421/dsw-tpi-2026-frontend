import FormActions from '../../shared/components/FormActions';
import useDoctorForm from '../hooks/useDoctorForm';
import Alert from '../../shared/components/Alert';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';
import Select from '../../shared/components/Select';
import Icon from '../../shared/components/Icon';
import { ICON_PATHS } from '../../shared/constants/iconPaths';

function DoctorForm({ doctor, specialties, onSubmit, onCancel }) {
  const { register, errors, submitting, handleSubmit } = useDoctorForm({
    doctor,
    onSubmit,
  });
  const serverError = errors.root?.server?.message;

  if (specialties.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <Alert>
          No hay especialidades cargadas. Creá una especialidad antes de
          registrar un doctor.
        </Alert>
        <div className="flex justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cerrar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
    >
      <div className="sm:col-span-2">
        <Input
          label="Nombre completo del doctor"
          icon={<Icon path={ICON_PATHS.user} />}
          placeholder="Ej. Dr. Alejandro Martínez"
          error={errors.name?.message}
          {...register('name', {
            required: 'El nombre es obligatorio.',
            minLength: { value: 3, message: 'Mínimo 3 caracteres.' },
            maxLength: { value: 100, message: 'Máximo 100 caracteres.' },
          })}
        />
      </div>
      <Select
        label="Especialidad"
        icon={<Icon path={ICON_PATHS.specialty} />}
        error={errors.specialtyId?.message}
        {...register('specialtyId', {
          required: 'Seleccioná una especialidad.',
        })}
      >
        <option value="">Seleccione especialidad</option>
        {specialties.map((specialty) => (
          <option key={specialty.id} value={specialty.id}>
            {specialty.name}
          </option>
        ))}
      </Select>
      <Input
        label="Número de Licencia Médica"
        icon={<Icon path={ICON_PATHS.license} />}
        placeholder="Ej. MP-45920"
        error={errors.licenseNumber?.message}
        {...register('licenseNumber', {
          required: 'La matrícula es obligatoria.',
          maxLength: { value: 50, message: 'Máximo 50 caracteres.' },
        })}
      />

      {serverError && (
        <div className="sm:col-span-2">
          <Alert>{serverError}</Alert>
        </div>
      )}

      <FormActions
        className="sm:col-span-2"
        onCancel={onCancel}
        submitting={submitting}
        submitLabel="Guardar Doctor"
      />
    </form>
  );
}

export default DoctorForm;
