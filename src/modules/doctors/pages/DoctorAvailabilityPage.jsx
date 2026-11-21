import AdminFormPage from '../../shared/components/AdminFormPage';
import Alert from '../../shared/components/Alert';
import Breadcrumb from '../../shared/components/Breadcrumb';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import { ROUTES } from '../../shared/constants/routes';
import DoctorAvailabilityEditor from '../components/DoctorAvailabilityEditor';
import DoctorAvailabilitySidebar from '../components/DoctorAvailabilitySidebar';
import useDoctorAvailabilityPage from '../hooks/useDoctorAvailabilityPage';

function DoctorAvailabilityPage() {
  const {
    doctors,
    doctor,
    loading,
    error,
    reload,
    submitting,
    setSubmitting,
    selectDoctor,
    handleCancel,
    handleSaved,
  } = useDoctorAvailabilityPage();

  return (
    <AdminFormPage className="gap-6">
      <Breadcrumb
        items={[
          { label: 'Doctores', to: ROUTES.ADMIN_DOCTORS },
          { label: 'Disponibilidad Horaria' },
        ]}
      />
      <header>
        <h1 className="text-base font-medium">
          Gestionar Disponibilidad Horaria
        </h1>
        <p className="mt-2 text-sm text-med-text-sub">
          Defina los días y rangos horarios de atención para el profesional
          seleccionado.
        </p>
      </header>
      {loading ? (
        <p role="status">Cargando profesionales...</p>
      ) : error ? (
        <Card>
          <Alert>{error}</Alert>
          <Button onClick={reload}>Reintentar</Button>
        </Card>
      ) : (
        <div className="grid items-start gap-5 lg:grid-cols-[235px_minmax(0,1fr)]">
          <DoctorAvailabilitySidebar
            doctors={doctors}
            doctor={doctor}
            disabled={submitting}
            onSelect={selectDoctor}
          />
          <div className="min-w-0">
            {doctor ? (
              <DoctorAvailabilityEditor
                key={doctor.id}
                doctor={doctor}
                onBusyChange={setSubmitting}
                onCancel={handleCancel}
                onSaved={handleSaved}
              />
            ) : (
              <Alert>No se encontró el profesional seleccionado.</Alert>
            )}
          </div>
        </div>
      )}
    </AdminFormPage>
  );
}

export default DoctorAvailabilityPage;
