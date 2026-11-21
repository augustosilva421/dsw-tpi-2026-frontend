import { useState } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../shared/constants/routes';
import usePaginatedQuery from '../../shared/hooks/usePaginatedQuery';
import { getDoctorOptions } from '../services/doctorCatalogService';

function useDoctorAvailabilityPage() {
  const [submitting, setSubmitting] = useState(false);
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const {
    data: doctors,
    loading,
    error,
    reload,
  } = usePaginatedQuery(getDoctorOptions, {});
  const doctor = doctors.find((item) => String(item.id) === doctorId);

  const selectDoctor = (selectedId) =>
    navigate(
      generatePath(ROUTES.ADMIN_DOCTOR_AVAILABILITY, { doctorId: selectedId })
    );
  const handleCancel = () => navigate(ROUTES.ADMIN_DOCTORS);
  const handleSaved = () =>
    navigate(ROUTES.ADMIN_DOCTORS, {
      replace: true,
      state: {
        feedback: {
          type: 'success',
          text: 'Disponibilidad horaria guardada correctamente.',
        },
      },
    });

  return {
    doctors,
    doctorId,
    doctor,
    loading,
    error,
    reload,
    submitting,
    setSubmitting,
    selectDoctor,
    handleCancel,
    handleSaved,
  };
}

export default useDoctorAvailabilityPage;
