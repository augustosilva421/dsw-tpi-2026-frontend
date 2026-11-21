import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../shared/constants/routes';
import { createSpecialty } from '../api/specialtiesApi';

function useCreateSpecialty() {
  const navigate = useNavigate();

  const handleSave = async (values) => {
    await createSpecialty(values);
    navigate(ROUTES.ADMIN_SPECIALTIES, {
      replace: true,
      state: {
        feedback: {
          type: 'success',
          text: 'Especialidad creada correctamente.',
        },
      },
    });
  };

  return {
    handleSave,
    handleCancel: () => navigate(ROUTES.ADMIN_SPECIALTIES),
  };
}

export default useCreateSpecialty;
