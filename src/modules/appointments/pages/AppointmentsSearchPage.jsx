import { useState } from 'react';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import PageHeader from '../../shared/components/PageHeader';
import StatusBadge from '../../shared/components/StatusBadge';
import Table from '../../shared/components/Table';
import TablePagination from '../../shared/components/TablePagination';

const appointmentsData = [
  {
    id: 1,
    date: '24/10/2023',
    time: '10:30',
    specialty: 'Cardiología',
    doctor: 'Dr. Robert Smith',
    patient: 'Johnathan Doe',
    dni: '40.123.456',
    status: 'Confirmado',
    statusType: 'confirmed',
  },
  {
    id: 2,
    date: '15/10/2023',
    time: '09:15',
    specialty: 'Neurología',
    doctor: 'Dra. García',
    patient: 'Johnathan Doe',
    dni: '40.123.456',
    status: 'Completado',
    statusType: 'completed',
  },
  {
    id: 3,
    date: '05/10/2023',
    time: '11:00',
    specialty: 'Clínica médica',
    doctor: 'Dr. Miller',
    patient: 'Johnathan Doe',
    dni: '40.123.456',
    status: 'Cancelado',
    statusType: 'cancelled',
  },
];

const statusTones = {
  confirmed: 'success',
  completed: 'neutral',
  cancelled: 'danger',
};

function AppointmentsSearchPage() {
  const [patientQuery, setPatientQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('Todas');
  const [doctorFilter, setDoctorFilter] = useState('Todos');
  const [dateFilter, setDateFilter] = useState('');

  const columns = [
    {
      key: 'date',
      header: 'Fecha',
      render: (appointment) => (
        <div>
          <p className="font-bold text-med-primary-900">{appointment.date}</p>
          <p className="text-xs text-med-text-muted mt-0.5">
            {appointment.time}
          </p>
        </div>
      ),
    },
    {
      key: 'specialty',
      header: 'Especialidad',
      render: (appointment) => (
        <div>
          <p className="font-semibold text-med-primary-900">
            {appointment.specialty}
          </p>
          <p className="text-xs text-med-text-muted">{appointment.doctor}</p>
        </div>
      ),
    },
    {
      key: 'patient',
      header: 'Paciente',
      render: (appointment) => (
        <div>
          <p className="font-semibold text-med-text-main">
            {appointment.patient}
          </p>
          <p className="text-xs text-med-text-muted mt-0.5">
            DNI: {appointment.dni}
          </p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Estado',
      align: 'center',
      render: (appointment) => (
        <StatusBadge tone={statusTones[appointment.statusType]} dot>
          {appointment.status}
        </StatusBadge>
      ),
    },
    {
      key: 'actions',
      header: 'Acciones',
      align: 'right',
      render: (appointment) => (
        <Button
          variant="ghost"
          className="px-2 py-1 text-xs"
          onClick={() => alert(`Ver detalle de ${appointment.patient}`)}
        >
          Ver detalle
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Búsqueda y filtrado de citas"
        description="Gestione y supervise el flujo de pacientes del departamento."
      />

      <Card className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-med-text-sub">
            Paciente o DNI
            <input
              type="search"
              value={patientQuery}
              onChange={(event) => setPatientQuery(event.target.value)}
              placeholder="Nombre o DNI..."
              className="w-full px-3 py-2 text-xs bg-white border border-med-border rounded-lg text-med-text-main placeholder-med-text-muted focus:outline-none focus:ring-1 focus:ring-med-primary-600"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-med-text-sub">
            Especialidad
            <select
              value={specialtyFilter}
              onChange={(event) => setSpecialtyFilter(event.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-med-border rounded-lg text-med-text-main"
            >
              <option>Todas</option>
              <option>Cardiología</option>
              <option>Neurología</option>
              <option>Clínica médica</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-med-text-sub">
            Doctor
            <select
              value={doctorFilter}
              onChange={(event) => setDoctorFilter(event.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-med-border rounded-lg text-med-text-main"
            >
              <option>Todos</option>
              <option>Dr. Robert Smith</option>
              <option>Dra. García</option>
              <option>Dr. Miller</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-med-text-sub">
            Fecha
            <input
              type="date"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-med-border rounded-lg text-med-text-main"
            />
          </label>
          <Button onClick={() => alert('Aplicar filtros')}>
            Aplicar filtros
          </Button>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden border-med-border">
        <div className="p-5 border-b border-med-border">
          <h2 className="text-base font-bold text-med-primary-900">
            Registros de citas
          </h2>
        </div>
        <Table
          columns={columns}
          data={appointmentsData}
          rowKey={(item) => item.id}
        />
        <TablePagination
          currentPage={1}
          totalPages={1}
          totalItems={appointmentsData.length}
          pageSize={Math.max(appointmentsData.length, 1)}
        />
      </Card>
    </div>
  );
}

export default AppointmentsSearchPage;
