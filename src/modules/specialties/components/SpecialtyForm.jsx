import { useForm } from 'react-hook-form';
import Alert from '../../shared/components/Alert';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';
import Textarea from '../../shared/components/Textarea';

function SpecialtyForm({
  specialty,
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
      name: specialty?.name ?? '',
      description: specialty?.description ?? '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        label="Nombre de la especialidad"
        placeholder="Ej. Cardiología"
        error={errors.name?.message}
        {...register('name', {
          required: 'El nombre es obligatorio.',
          minLength: { value: 3, message: 'Mínimo 3 caracteres.' },
          maxLength: { value: 100, message: 'Máximo 100 caracteres.' },
        })}
      />
      <Textarea
        label="Descripción"
        placeholder="Detalle el alcance de la especialidad..."
        error={errors.description?.message}
        {...register('description', {
          required: 'La descripción es obligatoria.',
          minLength: { value: 10, message: 'Mínimo 10 caracteres.' },
          maxLength: { value: 100, message: 'Máximo 100 caracteres.' },
        })}
      />

      {serverError && <Alert>{serverError}</Alert>}

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel} disabled={submitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Guardando...' : 'Guardar especialidad'}
        </Button>
      </div>
    </form>
  );
}

export default SpecialtyForm;