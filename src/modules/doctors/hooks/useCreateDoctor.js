import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../shared/constants/routes';
import useSpecialties from '../../specialties/hooks/useSpecialties';
import { createDoctor } from '../api/doctorsApi';

function useCreateDoctor() {
  const navigate = useNavigate();
  const specialtiesQuery = useSpecialties({ pageSize: 100 });

  const handleSave = async (values) => {
    await createDoctor(values);
    navigate(ROUTES.ADMIN_DOCTORS, {
      replace: true,
      state: {
        feedback: { type: 'success', text: 'Doctor creado correctamente.' },
      },
    });
  };

  return {
    specialties: specialtiesQuery.data,
    loading: specialtiesQuery.loading,
    error: specialtiesQuery.error,
    reload: specialtiesQuery.reload,
    handleSave,
    handleCancel: () => navigate(ROUTES.ADMIN_DOCTORS),
  };
}

export default useCreateDoctor;
