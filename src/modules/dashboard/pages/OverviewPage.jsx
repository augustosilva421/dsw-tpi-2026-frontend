import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/Button';
import Icon from '../../shared/components/Icon';
import { ICON_PATHS } from '../../shared/constants/iconPaths';
import { ROUTES } from '../../shared/constants/routes';
import OverviewDoctorDirectory from '../components/OverviewDoctorDirectory';
import OverviewSummary from '../components/OverviewSummary';

function OverviewPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-7">
      <header className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-med-text-main">
            Vista General de Gestión
          </h1>
          <p className="mt-1 text-sm text-med-text-sub">
            Configure el personal médico y las especialidades del departamento.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            className="inline-flex items-center gap-2 text-sm"
            onClick={() => navigate(ROUTES.ADMIN_DOCTOR_CREATE)}
          >
            <Icon path={ICON_PATHS.plus} className="h-3.5 w-3.5" />
            Agregar Nuevo Doctor
          </Button>
          <Button
            variant="secondary"
            className="inline-flex items-center gap-2 text-sm"
            onClick={() => navigate(ROUTES.ADMIN_SPECIALTY_CREATE)}
          >
            <Icon path={ICON_PATHS.plus} className="h-3.5 w-3.5" />
            Agregar Nueva Especialidad
          </Button>
        </div>
      </header>
      <OverviewSummary />
      <OverviewDoctorDirectory />
    </div>
  );
}

export default OverviewPage;
