import { useState } from 'react';
import Alert from '../../shared/components/Alert';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import ConfirmDialog from '../../shared/components/ConfirmDialog';
import Modal from '../../shared/components/Modal';
import PageHeader from '../../shared/components/PageHeader';
import Table from '../../shared/components/Table';
import TablePagination from '../../shared/components/TablePagination';
import { getErrorMessage } from '../../shared/helpers/apiError';
import { normalizeNameFilter } from '../../shared/helpers/nameFilter';
import { PAGE_SIZE, getTotalPages } from '../../shared/helpers/pagination';
import useDebouncedValue from '../../shared/hooks/useDebouncedValue';
import {
  createSpecialty,
  deleteSpecialty,
  updateSpecialty,
} from '../api/specialtiesApi';
import SpecialtyForm from '../components/SpecialtyForm';
import useSpecialties from '../hooks/useSpecialties';

function SpecialtiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [formState, setFormState] = useState(null); // { specialty } | null
  const [specialtyToDelete, setSpecialtyToDelete] = useState(null);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const debouncedSearch = useDebouncedValue(searchTerm);
  const name = normalizeNameFilter(debouncedSearch);

  const { data, total, loading, error, reload } = useSpecialties({
    page,
    pageSize: PAGE_SIZE,
    name,
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const openForm = (specialty = null) => {
    setFormError('');
    setFormState({ specialty });
  };

  const closeForm = () => setFormState(null);

  const handleSave = async (values) => {
    const { specialty } = formState;

    setSubmitting(true);
    setFormError('');

    try {
      if (specialty) {
        await updateSpecialty(specialty.id, values);
      } else {
        await createSpecialty(values);
      }

      setFormState(null);
      setFeedback({
        type: 'success',
        text: specialty
          ? 'Especialidad actualizada correctamente.'
          : 'Especialidad creada correctamente.',
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
      await deleteSpecialty(specialtyToDelete.id);
      setFeedback({ type: 'success', text: 'Especialidad eliminada.' });

      // Si se borró el último registro de la página, volver a la anterior.
      if (data.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        reload();
      }
    } catch (requestError) {
      setFeedback({ type: 'error', text: getErrorMessage(requestError) });
    } finally {
      setSpecialtyToDelete(null);
      setSubmitting(false);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Nombre de la especialidad',
      render: (specialty) => (
        <span className="font-semibold text-med-primary-900">
          {specialty.name}
        </span>
      ),
    },
    {
      key: 'description',
      header: 'Descripción',
      cellClassName: 'text-med-text-sub max-w-md',
    },
    {
      key: 'actions',
      header: 'Acciones',
      align: 'right',
      render: (specialty) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            className="px-2 py-1 text-xs"
            onClick={() => openForm(specialty)}
          >
            Editar
          </Button>
          <Button
            variant="ghost"
            className="px-2 py-1 text-xs text-med-danger-text"
            onClick={() => setSpecialtyToDelete(specialty)}
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
        title="Directorio de Especialidades"
        description="Administre las especialidades médicas disponibles."
        actions={
          <>
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar especialidad (mín. 3 letras)..."
              className="min-w-[220px] px-3 py-2 text-xs bg-white border border-med-border rounded-lg text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-1 focus:ring-med-primary-600"
            />
            <Button onClick={() => openForm()}>+ Nueva especialidad</Button>
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
            Registros de especialidades
          </h2>
        </div>
        <Table
          columns={columns}
          data={data}
          rowKey={(specialty) => specialty.id}
          loading={loading}
          emptyMessage="No hay especialidades para mostrar"
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
          title={
            formState.specialty ? 'Editar especialidad' : 'Nueva especialidad'
          }
          description="Complete los datos de la especialidad médica."
          onClose={closeForm}
        >
          <SpecialtyForm
            specialty={formState.specialty}
            submitting={submitting}
            serverError={formError}
            onSubmit={handleSave}
            onCancel={closeForm}
          />
        </Modal>
      )}

      {specialtyToDelete && (
        <ConfirmDialog
          title="Eliminar especialidad"
          message={`¿Seguro que querés eliminar "${specialtyToDelete.name}"?`}
          confirmLabel="Eliminar"
          loading={submitting}
          onConfirm={handleDelete}
          onCancel={() => setSpecialtyToDelete(null)}
        />
      )}
    </div>
  );
}

export default SpecialtiesPage;
