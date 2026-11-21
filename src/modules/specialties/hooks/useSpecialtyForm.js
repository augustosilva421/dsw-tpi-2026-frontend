import { useForm } from 'react-hook-form';
import { getErrorMessage } from '../../shared/helpers/apiError';

function useSpecialtyForm({ specialty, onSubmit }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: specialty?.name ?? '',
      description: specialty?.description ?? '',
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

export default useSpecialtyForm;
