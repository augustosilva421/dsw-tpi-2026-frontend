import { useState } from 'react';
import Alert from '../../shared/components/Alert';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import PageHeader from '../../shared/components/PageHeader';
import Table from '../../shared/components/Table';
import TablePagination from '../../shared/components/TablePagination';
import { getErrorMessage } from '../../shared/helpers/apiError';
import { formatDate, formatTime } from '../../shared/helpers/dateFormat';
import { PAGE_SIZE, getTotalPages } from '../../shared/helpers/pagination';
import {
  markAppointmentAttended,
  markAppointmentNoShow,
} from '../api/appointmentsApi';
import AppointmentFilters from '../components/AppointmentFilters';
import AppointmentStatusBadge from '../components/AppointmentStatusBadge';
import { APPOINTMENT_STATUS } from '../constants/appointmentStatus';
import useAppointmentsSearch from '../hooks/useAppointmentsSearch';

function AppointmentsSearchPage() {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [feedback, setFeedback] = useState(null);
  const [actingId, setActingId] = useState(null);

  const { data, total, loading, error, reload } = useAppointmentsSearch({
    ...filters,
    page,
    pageSize: PAGE_SIZE,
  });

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const changeStatus = async (appointment, request, successText) => {
    setActingId(appointment.id);
    setFeedback(null);

    try {
      await request(appointment.id);
      setFeedback({ type: 'success', text: successText });
      reload();
    } catch (requestError) {
      // Por ejemplo, una transición de estado inválida: se muestra el error real.
      setFeedback({ type: 'error', text: getErrorMessage(requestError) });
    } finally {
      setActingId(null);
    }
  };

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
          <p className="text-xs text-med-text-muted">
            {appointment.doctorName}
          </p>
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
    {
      key: 'actions',
      header: 'Acciones',
      align: 'right',
      render: (appointment) =>
        appointment.status === APPOINTMENT_STATUS.BOOKED ? (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              className="px-2 py-1 text-xs"
              disabled={actingId === appointment.id}
              onClick={() =>
                changeStatus(
                  appointment,
                  markAppointmentAttended,
                  'Turno marcado como atendido.'
                )
              }
            >
              Atendido
            </Button>
            <Button
              variant="ghost"
              className="px-2 py-1 text-xs text-med-danger-text"
              disabled={actingId === appointment.id}
              onClick={() =>
                changeStatus(
                  appointment,
                  markAppointmentNoShow,
                  'Turno marcado como ausente.'
                )
              }
            >
              Ausente
            </Button>
          </div>
        ) : null,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Búsqueda y filtrado de citas"
        description="Gestione y supervise los turnos de los pacientes."
      />

      <AppointmentFilters onApply={handleApplyFilters} />

      {feedback && (
        <Alert type={feedback.type} onClose={() => setFeedback(null)}>
          {feedback.text}
        </Alert>
      )}
      {error && <Alert>{error}</Alert>}

      <Card className="p-0 overflow-hidden border-med-border">
        <div className="p-5 border-b border-med-border">
          <h2 className="text-base font-bold text-med-primary-900">
            Registros de citas
          </h2>
        </div>
        <Table
          columns={columns}
          data={data}
          rowKey={(appointment) => appointment.id}
          loading={loading}
          emptyMessage="No se encontraron turnos con los filtros aplicados"
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
    </div>
  );
}

export default AppointmentsSearchPage;
