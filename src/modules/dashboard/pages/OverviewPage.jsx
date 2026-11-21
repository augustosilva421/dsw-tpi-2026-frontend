import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDoctors from '../../doctors/hooks/useDoctors';
import Alert from '../../shared/components/Alert';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import PageHeader from '../../shared/components/PageHeader';
import StatusBadge from '../../shared/components/StatusBadge';
import Table from '../../shared/components/Table';
import TablePagination from '../../shared/components/TablePagination';
import { ROUTES } from '../../shared/constants/routes';
import { PAGE_SIZE, getTotalPages } from '../../shared/helpers/pagination';
import useSpecialties from '../../specialties/hooks/useSpecialties';

function OverviewPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const {
    data: doctors,
    total: doctorsTotal,
    loading: doctorsLoading,
    error: doctorsError,
  } = useDoctors({ page, pageSize: PAGE_SIZE });

  const { total: specialtiesTotal, loading: specialtiesLoading } =
    useSpecialties({ pageSize: 1 });

  const columns = [
    {
      key: 'name',
      header: 'Nombre del doctor',
      render: (doctor) => (
        <div>
          <p className="font-semibold text-med-primary-900">{doctor.name}</p>
          {doctor.licenseNumber && (
            <p className="text-xs text-med-text-muted">
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
      render: () => (
        <Button
          variant="ghost"
          className="px-2 py-1 text-xs"
          onClick={() => navigate(ROUTES.ADMIN_DOCTORS)}
        >
          Ver detalle
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Resumen general"
        description="Accesos rápidos a la gestión del portal médico."
        actions={
          <>
            <Button onClick={() => navigate(ROUTES.ADMIN_DOCTORS)}>
              Gestionar doctores
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate(ROUTES.ADMIN_SPECIALTIES)}
            >
              Gestionar especialidades
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wider text-med-text-sub">
            Doctores registrados
          </p>
          <p className="text-3xl font-extrabold text-med-primary-900 mt-2">
            {doctorsLoading ? '...' : doctorsTotal}
          </p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wider text-med-text-sub">
            Especialidades registradas
          </p>
          <p className="text-3xl font-extrabold text-med-primary-900 mt-2">
            {specialtiesLoading ? '...' : specialtiesTotal}
          </p>
        </Card>
        <Card className="flex flex-col justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-med-text-sub">
            Turnos
          </p>
          <Button
            variant="secondary"
            onClick={() => navigate(ROUTES.ADMIN_APPOINTMENTS)}
          >
            Buscar turnos
          </Button>
        </Card>
      </div>

      {doctorsError && <Alert>{doctorsError}</Alert>}

      <Card className="p-0 overflow-hidden border-med-border">
        <div className="p-5 border-b border-med-border flex items-center justify-between gap-4">
          <h2 className="text-base font-bold text-med-primary-900">
            Directorio de profesionales médicos
          </h2>
          <Button
            variant="ghost"
            className="px-2 py-1 text-xs"
            onClick={() => navigate(ROUTES.ADMIN_DOCTORS)}
          >
            Ver todos
          </Button>
        </div>
        <Table
          columns={columns}
          data={doctors}
          rowKey={(doctor) => doctor.id}
          loading={doctorsLoading}
          emptyMessage="Todavía no hay doctores registrados"
        />
        <TablePagination
          currentPage={page}
          totalPages={getTotalPages(doctorsTotal)}
          totalItems={doctorsTotal}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
          disabled={doctorsLoading}
        />
      </Card>
    </div>
  );
}

export default OverviewPage;