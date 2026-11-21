import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDoctors from '../../doctors/hooks/useDoctors';
import Alert from '../../shared/components/Alert';
import Button from '../../shared/components/Button';
import Icon from '../../shared/components/Icon';
import Table from '../../shared/components/Table';
import TablePagination from '../../shared/components/TablePagination';
import { ICON_PATHS } from '../../shared/constants/iconPaths';
import { ROUTES } from '../../shared/constants/routes';
import { normalizeNameFilter } from '../../shared/helpers/nameFilter';
import { getTotalPages } from '../../shared/helpers/pagination';
import useDebouncedValue from '../../shared/hooks/useDebouncedValue';

const DIRECTORY_PAGE_SIZE = 3;

function OverviewDoctorDirectory() {
  const navigate = useNavigate();
  const [query, setQuery] = useState({ search: '', page: 1 });
  const debouncedQuery = useDebouncedValue(query);
  const { search, page } = debouncedQuery;
  const name = normalizeNameFilter(search);

  const {
    data: doctors,
    total: doctorsTotal,
    loading: doctorsLoading,
    error: doctorsError,
  } = useDoctors({ page, pageSize: DIRECTORY_PAGE_SIZE, name });
  const directoryLoading = doctorsLoading || query !== debouncedQuery;
  const totalPages = getTotalPages(doctorsTotal, DIRECTORY_PAGE_SIZE);
  const columns = [
    {
      key: 'name',
      header: 'Nombre del doctor',
      cellClassName: 'w-[48%]',
      render: (doctor) => (
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-med-primary-100 text-base"
          >
            🧑‍⚕️
          </span>
          <span className="font-semibold text-med-primary-900">
            {doctor.name}
          </span>
        </div>
      ),
    },
    {
      key: 'specialty',
      header: 'Especialidad',
      cellClassName: 'text-med-text-sub',
      render: (doctor) => doctor.specialty?.name || '—',
    },
    {
      key: 'actions',
      header: 'Acciones',
      align: 'right',
      render: () => (
        <Button
          variant="unstyled"
          className="whitespace-nowrap rounded px-1 py-2 text-xs font-semibold text-med-primary-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={() => navigate(ROUTES.ADMIN_DOCTORS)}
        >
          Ver Detalle
        </Button>
      ),
    },
  ];

  return (
    <>
      {doctorsError && (
        <Alert>No se pudo cargar el directorio: {doctorsError}</Alert>
      )}
      <section
        aria-labelledby="doctor-directory-title"
        className="overflow-hidden rounded-xl border border-med-border bg-white p-4 shadow-xs sm:p-5"
      >
        <div className="flex flex-col justify-between gap-4 px-4 py-4 sm:flex-row sm:items-center sm:pb-5">
          <h2
            id="doctor-directory-title"
            className="text-base font-bold text-med-primary-900"
          >
            Directorio de Profesionales Médicos
          </h2>
          <label className="relative block w-full sm:w-64">
            <span className="sr-only">Buscar por nombre</span>
            <Icon
              path={ICON_PATHS.search}
              className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-med-text-muted"
            />
            <input
              type="search"
              value={query.search}
              onChange={(event) =>
                setQuery({ search: event.target.value, page: 1 })
              }
              placeholder="Buscar por nombre..."
              aria-describedby="doctor-search-help"
              className="w-full rounded-lg border border-med-border bg-med-primary-50/80 py-1.5 pr-3 pl-9 text-xs text-med-text-main placeholder:text-med-text-muted focus:outline-none focus:ring-2 focus:ring-med-primary-600"
            />
          </label>
        </div>
        <p id="doctor-search-help" className="sr-only">
          Ingrese al menos 3 letras para buscar por nombre.
        </p>
        {query.search.trim().length > 0 && query.search.trim().length < 3 && (
          <p className="px-4 pb-3 text-xs text-med-text-sub">
            Ingrese al menos 3 letras para buscar por nombre.
          </p>
        )}
        <Table
          columns={columns}
          data={doctors}
          rowKey={(doctor) => doctor.id}
          loading={directoryLoading}
          emptyMessage={
            doctorsError
              ? 'No se pudo cargar el directorio'
              : name
                ? 'No se encontraron médicos con ese nombre'
                : 'Todavía no hay doctores registrados'
          }
        />
        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={doctorsTotal}
          pageSize={DIRECTORY_PAGE_SIZE}
          disabled={directoryLoading || Boolean(doctorsError)}
          onPageChange={(nextPage) =>
            setQuery((previous) => ({ ...previous, page: nextPage }))
          }
          summary={
            directoryLoading
              ? 'Cargando registros...'
              : doctorsError
                ? 'Registros no disponibles'
                : `Mostrando ${doctors.length} de ${doctorsTotal} registros`
          }
        />
      </section>
    </>
  );
}

export default OverviewDoctorDirectory;
