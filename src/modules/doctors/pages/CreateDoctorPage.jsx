import AdminFormPage from '../../shared/components/AdminFormPage';
import Alert from '../../shared/components/Alert';
import Breadcrumb from '../../shared/components/Breadcrumb';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import Icon from '../../shared/components/Icon';
import { ICON_PATHS } from '../../shared/constants/iconPaths';
import { ROUTES } from '../../shared/constants/routes';
import DoctorForm from '../components/DoctorForm';
import useCreateDoctor from '../hooks/useCreateDoctor';

function CreateDoctorPage() {
  const { specialties, loading, error, reload, handleSave, handleCancel } =
    useCreateDoctor();

  return (
    <AdminFormPage className="gap-5">
      <Breadcrumb
        items={[
          { label: 'Doctores', to: ROUTES.ADMIN_DOCTORS },
          { label: 'Agregar Nuevo Doctor' },
        ]}
      />
      <Card className="w-full overflow-hidden p-0 [&_label]:text-[11px] [&_label]:tracking-[0.04em]">
        <header className="border-b border-med-border bg-slate-50/70 px-6 py-5">
          <h1 className="flex items-center gap-2 text-base font-semibold text-med-primary-900">
            <Icon path={ICON_PATHS.doctor} className="h-5 w-5" />
            Registrar Nuevo Doctor
          </h1>
          <p className="mt-1 text-xs text-med-text-sub">
            Complete todos los campos obligatorios para integrar al nuevo
            facultativo al sistema del centro médico.
          </p>
        </header>
        <div className="p-6">
          {loading ? (
            <p role="status" className="text-sm text-med-text-sub">
              Cargando especialidades...
            </p>
          ) : error ? (
            <div className="flex flex-col gap-4">
              <Alert>{error}</Alert>
              <Button variant="outline" onClick={reload}>
                Reintentar
              </Button>
            </div>
          ) : (
            <DoctorForm
              specialties={specialties}
              onSubmit={handleSave}
              onCancel={handleCancel}
            />
          )}
        </div>
      </Card>
    </AdminFormPage>
  );
}

export default CreateDoctorPage;
