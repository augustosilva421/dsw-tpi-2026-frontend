import { useForm } from 'react-hook-form';
import { getErrorMessage } from '../../shared/helpers/apiError';

function useDoctorForm({ doctor, onSubmit }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: doctor?.name ?? '',
      licenseNumber: doctor?.licenseNumber ?? '',
      specialtyId: doctor?.specialty?.id ?? doctor?.specialtyId ?? '',
    },
  });

  const handleSave = async (values) => {
    try {
      await onSubmit(values);
    } catch (error) {
      setError('root.server', {
        type: 'server',
        message: getErrorMessage(error),
      });
    }
  };

  return {
    register,
    errors,
    submitting: isSubmitting,
    handleSubmit: handleSubmit(handleSave),
  };
}

export default useDoctorForm;
