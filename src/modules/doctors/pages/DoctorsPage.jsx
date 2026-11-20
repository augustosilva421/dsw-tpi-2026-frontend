import { useState } from 'react';
import Alert from '../../shared/components/Alert';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import ConfirmDialog from '../../shared/components/ConfirmDialog';
import Modal from '../../shared/components/Modal';
import PageHeader from '../../shared/components/PageHeader';
import StatusBadge from '../../shared/components/StatusBadge';
import Table from '../../shared/components/Table';
import TablePagination from '../../shared/components/TablePagination';
import { getErrorMessage } from '../../shared/helpers/apiError';
import { normalizeNameFilter } from '../../shared/helpers/nameFilter';
import { PAGE_SIZE, getTotalPages } from '../../shared/helpers/pagination';
import useDebouncedValue from '../../shared/hooks/useDebouncedValue';
import useSpecialties from '../../specialties/hooks/useSpecialties';
import { createDoctor, deleteDoctor, updateDoctor } from '../api/doctorsApi';
import DoctorAvailabilityModal from '../components/DoctorAvailabilityModal';
import DoctorForm from '../components/DoctorForm';
import useDoctors from '../hooks/useDoctors';

const SPECIALTY_OPTIONS_LIMIT = 100;

function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [formState, setFormState] = useState(null); // { doctor } | null
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [availabilityDoctor, setAvailabilityDoctor] = useState(null);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const debouncedSearch = useDebouncedValue(searchTerm);
  const name = normalizeNameFilter(debouncedSearch);

  const { data, total, loading, error, reload } = useDoctors({
    page,
    pageSize: PAGE_SIZE,
    name,
  });

  const { data: specialties, loading: specialtiesLoading } = useSpecialties({
    pageSize: SPECIALTY_OPTIONS_LIMIT,
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const openForm = (doctor = null) => {
    setFormError('');
    setFormState({ doctor });
  };

  const closeForm = () => setFormState(null);

  const handleSave = async (values) => {
    const { doctor } = formState;

    setSubmitting(true);
    setFormError('');

    try {
      if (doctor) {
        await updateDoctor(doctor.id, values);
      } else {
        await createDoctor(values);
      }

      setFormState(null);
      setFeedback({
        type: 'success',
        text: doctor
          ? 'Doctor actualizado correctamente.'
          : 'Doctor creado correctamente.',
      });
      reload();
    } catch (requestError) {
      setFormError(getErrorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);

    try {
      await deleteDoctor(doctorToDelete.id);
      setFeedback({ type: 'success', text: 'Doctor eliminado.' });

      if (data.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        reload();
      }
    } catch (requestError) {
      setFeedback({ type: 'error', text: getErrorMessage(requestError) });
    } finally {
      setDoctorToDelete(null);
      setSubmitting(false);
    }
  };

  const handleAvailabilitySaved = () => {
    setAvailabilityDoctor(null);
    setFeedback({
      type: 'success',
      text: 'Disponibilidad horaria guardada correctamente.',
    });
  };

  const columns = [
    {
      key: 'name',
      header: 'Nombre del doctor',
      render: (doctor) => (
        <div>
          <p className="font-semibold text-med-primary-900 leading-tight">
            {doctor.name}
          </p>
          {doctor.licenseNumber && (
            <p className="text-xs text-med-text-muted mt-0.5">
              Matrícula: {doctor.licenseNumber}
            </p>
          )}
        </div>
      ),
    },
    {
      key: 'specialty',
      header: 'Especialidad',
      render: (doctor) =>
        doctor.specialty?.name ? (
          <StatusBadge tone="info">{doctor.specialty.name}</StatusBadge>
        ) : (
          '-'
        ),
    },
    {
      key: 'actions',
      header: 'Acciones',
      align: 'right',
      render: (doctor) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            className="px-2 py-1 text-xs"
            onClick={() => setAvailabilityDoctor(doctor)}
          >
            Disponibilidad
          </Button>
          <Button
            variant="ghost"
            className="px-2 py-1 text-xs"
            disabled={specialtiesLoading}
            onClick={() => openForm(doctor)}
          >
            Editar
          </Button>
          <Button
            variant="ghost"
            className="px-2 py-1 text-xs text-med-danger-text"
            onClick={() => setDoctorToDelete(doctor)}
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Directorio de Doctores"
        description="Gestione el personal médico y su disponibilidad horaria."
        actions={
          <>
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar doctor (mín. 3 letras)..."
              className="min-w-[220px] px-3 py-2 text-xs bg-white border border-med-border rounded-lg text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-1 focus:ring-med-primary-600"
            />
            <Button disabled={specialtiesLoading} onClick={() => openForm()}>
              + Nuevo doctor
            </Button>
          </>
        }
      />

      {feedback && (
        <Alert type={feedback.type} onClose={() => setFeedback(null)}>
          {feedback.text}
        </Alert>
      )}
      {error && <Alert>{error}</Alert>}

      <Card className="p-0 overflow-hidden border-med-border">
        <div className="p-5 border-b border-med-border">
          <h2 className="text-base font-bold text-med-primary-900">
            Registros de doctores
          </h2>
        </div>
        <Table
          columns={columns}
          data={data}
          rowKey={(doctor) => doctor.id}
          loading={loading}
          emptyMessage="No hay doctores para mostrar"
        />
        <TablePagination
          currentPage={page}
          totalPages={getTotalPages(total)}
          totalItems={total}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
          disabled={loading}
        />
      </Card>

      {formState && (
        <Modal
          title={formState.doctor ? 'Editar doctor' : 'Registrar nuevo doctor'}
          description="Complete todos los campos obligatorios."
          onClose={closeForm}
        >
          <DoctorForm
            doctor={formState.doctor}
            specialties={specialties}
            submitting={submitting}
            serverError={formError}
            onSubmit={handleSave}
            onCancel={closeForm}
          />
        </Modal>
      )}

      {doctorToDelete && (
        <ConfirmDialog
          title="Eliminar doctor"
          message={`¿Seguro que querés eliminar a "${doctorToDelete.name}"?`}
          confirmLabel="Eliminar"
          loading={submitting}
          onConfirm={handleDelete}
          onCancel={() => setDoctorToDelete(null)}
        />
      )}

      {availabilityDoctor && (
        <DoctorAvailabilityModal
          doctor={availabilityDoctor}
          onClose={() => setAvailabilityDoctor(null)}
          onSaved={handleAvailabilitySaved}
        />
      )}
    </div>
  );
}

export default DoctorsPage;