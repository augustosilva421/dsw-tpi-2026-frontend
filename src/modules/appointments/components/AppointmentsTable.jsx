import Table from '../../shared/components/Table';
import { formatDate, formatTime } from '../../shared/helpers/dateFormat';
import AppointmentStatusBadge from './AppointmentStatusBadge';

const columns = [
  {
    key: 'date',
    header: 'Fecha',
    render: (appointment) => (
      <div>
        <p className="font-bold text-med-primary-900">
          {formatDate(appointment.date)}
        </p>
        <p className="text-xs text-med-text-muted mt-0.5">
          {formatTime(appointment.startTime)}
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
          {appointment.specialtyName || '-'}
        </p>
        <p className="text-xs text-med-text-muted">{appointment.doctorName}</p>
      </div>
    ),
  },
  {
    key: 'patient',
    header: 'Paciente',
    render: (appointment) => (
      <div>
        <p className="font-semibold text-med-text-main">
          {appointment.patientName || '-'}
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
      <AppointmentStatusBadge status={appointment.status} />
    ),
  },
];

function AppointmentsTable({ appointments, loading }) {
  return (
    <Table
      columns={columns}
      data={appointments}
      rowKey={(appointment) => appointment.id}
      loading={loading}
      emptyMessage="No se encontraron turnos con los filtros aplicados"
    />
  );
}

export default AppointmentsTable;
