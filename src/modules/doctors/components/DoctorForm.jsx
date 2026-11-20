import { useForm } from 'react-hook-form';
import Alert from '../../shared/components/Alert';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';
import Select from '../../shared/components/Select';

function DoctorForm({
  doctor,
  specialties,
  submitting,
  serverError,
  onSubmit,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: doctor?.name ?? '',
      licenseNumber: doctor?.licenseNumber ?? '',
      specialtyId: doctor?.specialty?.id ?? doctor?.specialtyId ?? '',
    },
  });

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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Nombre completo del doctor"
        placeholder="Ej. Dr. Alejandro Martínez"
        error={errors.name?.message}
        {...register('name', {
          required: 'El nombre es obligatorio.',
          minLength: { value: 3, message: 'Mínimo 3 caracteres.' },
          maxLength: { value: 100, message: 'Máximo 100 caracteres.' },
        })}
      />
      <Input
        label="Número de matrícula"
        placeholder="Ej. MP-45920"
        error={errors.licenseNumber?.message}
        {...register('licenseNumber', {
          required: 'La matrícula es obligatoria.',
          maxLength: { value: 50, message: 'Máximo 50 caracteres.' },
        })}
      />
      <Select
        label="Especialidad"
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

      {serverError && <Alert>{serverError}</Alert>}

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel} disabled={submitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Guardando...' : 'Guardar doctor'}
        </Button>
      </div>
    </form>
  );
}

export default DoctorForm;