import { useState } from 'react';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import Alert from '../../shared/components/Alert';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import ConfirmDialog from '../../shared/components/ConfirmDialog';
import Icon from '../../shared/components/Icon';
import IconButton from '../../shared/components/IconButton';
import Modal from '../../shared/components/Modal';
import PageHeader from '../../shared/components/PageHeader';
import StatusBadge from '../../shared/components/StatusBadge';
import Table from '../../shared/components/Table';
import TablePagination from '../../shared/components/TablePagination';
import { ROUTES } from '../../shared/constants/routes';
import { ICON_PATHS } from '../../shared/constants/iconPaths';
import { getErrorMessage } from '../../shared/helpers/apiError';
import { normalizeNameFilter } from '../../shared/helpers/nameFilter';
import { PAGE_SIZE, getTotalPages } from '../../shared/helpers/pagination';
import useDebouncedValue from '../../shared/hooks/useDebouncedValue';
import useSpecialties from '../../specialties/hooks/useSpecialties';
import { deleteDoctor, updateDoctor } from '../api/doctorsApi';
import DoctorForm from '../components/DoctorForm';
import useDoctors from '../hooks/useDoctors';

const SPECIALTY_OPTIONS_LIMIT = 100;

function DoctorsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [formState, setFormState] = useState(null);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(location.state?.feedback ?? null);

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

  const openForm = (doctor) => {
    setFormState({ doctor });
  };

  const closeForm = () => setFormState(null);

  const handleSave = async (values) => {
    await updateDoctor(formState.doctor.id, values);
    setFormState(null);
    setFeedback({ type: 'success', text: 'Doctor actualizado correctamente.' });
    reload();
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
          <IconButton
            label={`Disponibilidad horaria de ${doctor.name}`}
            path={ICON_PATHS.clock}
            onClick={() =>
              navigate(
                generatePath(ROUTES.ADMIN_DOCTOR_AVAILABILITY, {
                  doctorId: doctor.id,
                })
              )
            }
          />
          <IconButton
            label={`Editar a ${doctor.name}`}
            path={ICON_PATHS.edit}
            disabled={specialtiesLoading}
            onClick={() => openForm(doctor)}
          />
          <IconButton
            label={`Eliminar a ${doctor.name}`}
            path={ICON_PATHS.trash}
            danger
            onClick={() => setDoctorToDelete(doctor)}
          />
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
            <Button
              className="inline-flex items-center gap-2 text-sm"
              onClick={() => navigate(ROUTES.ADMIN_AVAILABILITY)}
            >
              <Icon path={ICON_PATHS.clock} />
              Agregar Disponibilidad Horaria
            </Button>
            <Button
              className="text-sm"
              onClick={() => navigate(ROUTES.ADMIN_DOCTOR_CREATE)}
            >
              + Nuevo Doctor
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
          title="Editar doctor"
          description="Complete todos los campos obligatorios."
          onClose={closeForm}
        >
          <DoctorForm
            doctor={formState.doctor}
            specialties={specialties}
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
    </div>
  );
}

export default DoctorsPage;
