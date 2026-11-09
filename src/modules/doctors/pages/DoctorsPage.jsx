import { useState } from 'react';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import PageHeader from '../../shared/components/PageHeader';
import StatusBadge from '../../shared/components/StatusBadge';
import Table from '../../shared/components/Table';
import TablePagination from '../../shared/components/TablePagination';

const doctorsList = [
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
  {
    id: 'MED-1192',
    name: 'Dra. Lucía Soria',
    specialty: 'Ginecología',
    status: 'Activo',
    statusType: 'active',
  },
];

function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctorsList.filter((doctor) => {
    const query = searchTerm.toLowerCase();

    return (
      doctor.name.toLowerCase().includes(query) ||
      doctor.specialty.toLowerCase().includes(query) ||
      doctor.id.toLowerCase().includes(query)
    );
  });

  const columns = [
    {
      key: 'name',
      header: 'Nombre del doctor',
      render: (doctor) => (
        <div>
          <p className="font-semibold text-med-primary-900 leading-tight">
            {doctor.name}
          </p>
          <p className="text-xs text-med-text-muted mt-0.5">ID: {doctor.id}</p>
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
      align: 'center',
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
      render: (doctor) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            className="px-2 py-1 text-xs"
            onClick={() => alert(`Ver detalle de ${doctor.name}`)}
          >
            Ver
          </Button>
          <Button
            variant="ghost"
            className="px-2 py-1 text-xs"
            onClick={() => alert(`Editar profesional ${doctor.name}`)}
          >
            Editar
          </Button>
          <Button
            variant="ghost"
            className="px-2 py-1 text-xs text-med-danger-text"
            onClick={() => alert(`Eliminar profesional ${doctor.name}`)}
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
        description="Gestione el personal médico y su disponibilidad actual."
        actions={
          <>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar doctor..."
              className="min-w-[220px] px-3 py-2 text-xs bg-white border border-med-border rounded-lg text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-1 focus:ring-med-primary-600"
            />
            <Button onClick={() => alert('Abrir formulario de disponibilidad')}>
              + Disponibilidad
            </Button>
            <Button onClick={() => alert('Abrir formulario de doctor')}>
              + Nuevo doctor
            </Button>
          </>
        }
      />

      <Card className="p-0 overflow-hidden border-med-border">
        <div className="p-5 border-b border-med-border">
          <h2 className="text-base font-bold text-med-primary-900">
            Registros de doctores
          </h2>
        </div>
        <Table
          columns={columns}
          data={filteredDoctors}
          rowKey={(doctor) => doctor.id}
        />
        <TablePagination
          currentPage={1}
          totalPages={1}
          totalItems={filteredDoctors.length}
          pageSize={Math.max(filteredDoctors.length, 1)}
        />
      </Card>
    </div>
  );
}

export default DoctorsPage;
