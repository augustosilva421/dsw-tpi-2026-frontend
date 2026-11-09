import { useState } from 'react';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import PageHeader from '../../shared/components/PageHeader';
import StatusBadge from '../../shared/components/StatusBadge';
import Table from '../../shared/components/Table';
import TablePagination from '../../shared/components/TablePagination';

const specialtiesList = [
  {
    id: 1,
    name: 'Cardiología',
    description:
      'Estudio y tratamiento del corazón y del sistema circulatorio.',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Neurología',
    description:
      'Diagnóstico y tratamiento de afecciones del sistema nervioso.',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Dermatología',
    description:
      'Atención integral de enfermedades de la piel, uñas y cabello.',
    status: 'Inactive',
  },
  {
    id: 4,
    name: 'Pediatría',
    description: 'Atención médica integral para niños y adolescentes.',
    status: 'Active',
  },
];

function SpecialtiesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSpecialties = specialtiesList.filter((specialty) => {
    const query = searchTerm.toLowerCase();

    return (
      specialty.name.toLowerCase().includes(query) ||
      specialty.description.toLowerCase().includes(query)
    );
  });

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
      key: 'status',
      header: 'Estado',
      align: 'center',
      render: (specialty) => (
        <StatusBadge
          tone={specialty.status === 'Active' ? 'success' : 'neutral'}
        >
          {specialty.status === 'Active' ? 'Activa' : 'Inactiva'}
        </StatusBadge>
      ),
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
            onClick={() => alert(`Editar especialidad ${specialty.name}`)}
          >
            Editar
          </Button>
          <Button
            variant="ghost"
            className="px-2 py-1 text-xs text-med-danger-text"
            onClick={() => alert(`Eliminar especialidad ${specialty.name}`)}
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
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar especialidad..."
              className="min-w-[220px] px-3 py-2 text-xs bg-white border border-med-border rounded-lg text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-1 focus:ring-med-primary-600"
            />
            <Button onClick={() => alert('Abrir formulario de especialidad')}>
              + Nueva especialidad
            </Button>
          </>
        }
      />

      <Card className="p-0 overflow-hidden border-med-border">
        <div className="p-5 border-b border-med-border">
          <h2 className="text-base font-bold text-med-primary-900">
            Registros de especialidades
          </h2>
        </div>
        <Table
          columns={columns}
          data={filteredSpecialties}
          rowKey={(specialty) => specialty.id}
        />
        <TablePagination
          currentPage={1}
          totalPages={1}
          totalItems={filteredSpecialties.length}
          pageSize={Math.max(filteredSpecialties.length, 1)}
        />
      </Card>
    </div>
  );
}

export default SpecialtiesPage;
