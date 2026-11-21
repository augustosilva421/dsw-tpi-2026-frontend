import FormActions from '../../shared/components/FormActions';
import useSpecialtyForm from '../hooks/useSpecialtyForm';
import Alert from '../../shared/components/Alert';
import Input from '../../shared/components/Input';
import Textarea from '../../shared/components/Textarea';
import Select from '../../shared/components/Select';

function SpecialtyForm({
  specialty,
  onSubmit,
  onCancel,
  showInitialStatus = false,
}) {
  const { register, errors, submitting, handleSubmit } = useSpecialtyForm({
    specialty,
    onSubmit,
  });
  const serverError = errors.root?.server?.message;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Input
        label="Nombre de la especialidad"
        placeholder="Ej. Cardiología Intervencionista"
        error={errors.name?.message}
        {...register('name', {
          required: 'El nombre es obligatorio.',
          minLength: { value: 3, message: 'Mínimo 3 caracteres.' },
          maxLength: { value: 100, message: 'Máximo 100 caracteres.' },
        })}
      />
      <Textarea
        label="Descripción"
        placeholder="Detalle el alcance de la especialidad, procedimientos principales y requisitos de derivación..."
        rows={6}
        error={errors.description?.message}
        {...register('description', {
          required: 'La descripción es obligatoria.',
          minLength: { value: 10, message: 'Mínimo 10 caracteres.' },
          maxLength: { value: 100, message: 'Máximo 100 caracteres.' },
        })}
      />

      {showInitialStatus && (
        <Select label="Estado inicial" value="active" disabled>
          <option value="active">Activo - Disponible para programación</option>
        </Select>
      )}

      {serverError && <Alert>{serverError}</Alert>}

      <FormActions
        tone={showInitialStatus ? 'strong' : 'default'}
        onCancel={onCancel}
        submitting={submitting}
        submitLabel="Guardar Especialidad"
      />
    </form>
  );
}

export default SpecialtyForm;
