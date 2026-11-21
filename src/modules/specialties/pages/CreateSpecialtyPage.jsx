import AdminFormPage from '../../shared/components/AdminFormPage';
import Breadcrumb from '../../shared/components/Breadcrumb';
import Card from '../../shared/components/Card';
import { ROUTES } from '../../shared/constants/routes';
import SpecialtyForm from '../components/SpecialtyForm';
import useCreateSpecialty from '../hooks/useCreateSpecialty';

function CreateSpecialtyPage() {
  const { handleSave, handleCancel } = useCreateSpecialty();

  return (
    <AdminFormPage className="gap-5 [&_label]:text-sm [&_label]:font-normal [&_textarea]:min-h-[150px]">
      <Breadcrumb
        items={[
          { label: 'Especialidades', to: ROUTES.ADMIN_SPECIALTIES },
          { label: 'Agregar Nueva Especialidad' },
        ]}
      />
      <header>
        <h1 className="text-base font-medium text-med-primary-900">
          Registrar Nueva Especialidad
        </h1>
        <p className="mt-1 text-sm text-med-text-sub">
          Complete la información técnica y administrativa para dar de alta una
          especialidad médica en el sistema hospitalario.
        </p>
      </header>
      <Card className="w-full rounded-none">
        <SpecialtyForm
          showInitialStatus
          onSubmit={handleSave}
          onCancel={handleCancel}
        />
      </Card>
    </AdminFormPage>
  );
}

export default CreateSpecialtyPage;
