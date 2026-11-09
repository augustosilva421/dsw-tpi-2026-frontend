import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import PageHeader from '../../shared/components/PageHeader';
import StatusBadge from '../../shared/components/StatusBadge';
import Table from '../../shared/components/Table';
import TablePagination from '../../shared/components/TablePagination';

const previewDoctors = [
  {
    id: 'MED-4920',
    name: 'Dr. Alejandro Rivera',
    specialty: 'Cardiología Clínica',
    status: 'Activo',
    statusType: 'active',
  },
  {
    id: 'MED-2104',
    name: 'Dra. Elena Martínez',
    specialty: 'Pediatría Avanzada',
    status: 'De licencia',
    statusType: 'leave',
  },
  {
    id: 'MED-8831',
    name: 'Dr. Marcos Torres',
    specialty: 'Neurocirugía',
    status: 'Activo',
    statusType: 'active',
  },
];

function OverviewPage() {
  const navigate = useNavigate();

  const columns = [
    {
      key: 'name',
      header: 'Nombre del doctor',
      render: (doctor) => (
        <div>
          <p className="font-semibold text-med-primary-900">{doctor.name}</p>
          <p className="text-xs text-med-text-muted">ID: {doctor.id}</p>
        </div>
      ),
    },
    {
      key: 'specialty',
      header: 'Especialidad',
      render: (doctor) => (
        <StatusBadge tone="info">{doctor.specialty}</StatusBadge>
      ),
    },
    {
      key: 'status',
      header: 'Estado de disponibilidad',
      render: (doctor) => (
        <StatusBadge
          tone={doctor.statusType === 'active' ? 'success' : 'warning'}
          dot
        >
          {doctor.status}
        </StatusBadge>
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
          onClick={() => navigate('/admin/doctors')}
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
            <Button onClick={() => navigate('/admin/doctors')}>
              + Nuevo doctor
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/admin/specialties')}
            >
              + Nueva especialidad
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
            {previewDoctors.length}
          </p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wider text-med-text-sub">
            Doctores activos
          </p>
          <p className="text-3xl font-extrabold text-med-primary-900 mt-2">
            {
              previewDoctors.filter((doctor) => doctor.statusType === 'active')
                .length
            }
          </p>
        </Card>
        <Card>
          <p className="text-xs font-semibold uppercase tracking-wider text-med-text-sub">
            Acciones disponibles
          </p>
          <p className="text-sm font-semibold text-med-primary-900 mt-3">
            Gestión de médicos y especialidades
          </p>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden border-med-border">
        <div className="p-5 border-b border-med-border flex items-center justify-between gap-4">
          <h2 className="text-base font-bold text-med-primary-900">
            Directorio de profesionales médicos
          </h2>
          <Button
            variant="ghost"
            className="px-2 py-1 text-xs"
            onClick={() => navigate('/admin/doctors')}
          >
            Ver todos
          </Button>
        </div>
        <Table
          columns={columns}
          data={previewDoctors}
          rowKey={(doctor) => doctor.id}
        />
        <TablePagination
          currentPage={1}
          totalPages={1}
          totalItems={previewDoctors.length}
          pageSize={Math.max(previewDoctors.length, 1)}
        />
      </Card>
    </div>
  );
}

export default OverviewPage;
