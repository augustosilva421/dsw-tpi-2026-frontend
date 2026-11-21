import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { getErrorMessage } from '../../shared/helpers/apiError';
import {
  buildAvailabilityRows,
  toAvailabilityDays,
} from '../helpers/doctorAvailability';
import { doctorAvailabilityResolver } from '../helpers/doctorAvailabilityResolver';

function useDoctorAvailabilityForm({ existingDays, onSubmit, onBusyChange }) {
  const {
    control,
    getValues,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { rows: buildAvailabilityRows(existingDays) },
    resolver: doctorAvailabilityResolver,
  });
  const rows = useWatch({ control, name: 'rows' });

  useEffect(() => {
    onBusyChange?.(isSubmitting);

    return () => onBusyChange?.(false);
  }, [isSubmitting, onBusyChange]);

  const updateRow = (day, changes) => {
    const index = getValues('rows').findIndex((row) => row.day === day);

    for (const [field, value] of Object.entries(changes)) {
      setValue(`rows.${index}.${field}`, value, { shouldDirty: true });
    }
  };

  const handleSave = async (values) => {
    try {
      await onSubmit(toAvailabilityDays(values.rows));
    } catch (error) {
      setError('root.server', {
        type: 'server',
        message: getErrorMessage(error),
      });
    }
  };

  return {
    rows,
    submitting: isSubmitting,
    formError: errors.rows?.root?.message || errors.root?.server?.message,
    updateRow,
    handleSubmit: handleSubmit(handleSave),
  };
}

export default useDoctorAvailabilityForm;
