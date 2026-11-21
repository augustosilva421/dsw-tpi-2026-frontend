import { saveDoctorAvailabilities } from '../api/availabilitiesApi';
import useDoctorAvailability from './useDoctorAvailability';

function useDoctorAvailabilityEditor({ doctorId, onSaved }) {
  const { days, loading, error } = useDoctorAvailability(doctorId);

  const handleSave = async (selectedDays) => {
    await saveDoctorAvailabilities({
      doctorId,
      isUpdate: days.length > 0,
      days: selectedDays,
    });
    onSaved();
  };

  return { days, loading, error, handleSave };
}

export default useDoctorAvailabilityEditor;
