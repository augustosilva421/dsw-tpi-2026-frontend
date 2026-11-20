import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../auth/hook/useAuth';
import AppointmentStatusBadge from '../../appointments/components/AppointmentStatusBadge';
import { APPOINTMENT_STATUS } from '../../appointments/constants/appointmentStatus';
import { cancelAppointment } from '../../appointments/api/patientAppointmentsApi';
import Alert from '../../shared/components/Alert';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import ConfirmDialog from '../../shared/components/ConfirmDialog';
import { getErrorMessage } from '../../shared/helpers/apiError';
import { formatDate, formatTime } from '../../shared/helpers/dateFormat';
import { usePatientAppointments } from '../hooks/usePatientAppointments';

function AppointmentsPage() {
  const navigate = useNavigate();
  const { dni } = useAuth();
  const { appointments, loading, error, reload } = usePatientAppointments(dni);

  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [actionError, setActionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleConfirmCancel = async () => {
    setCancelling(true);
    setActionError('');
    setSuccessMessage('');

    try {
      await cancelAppointment(appointmentToCancel.id);
      setSuccessMessage('El turno fue cancelado correctamente.');
      reload();
    } catch (err) {
      setActionError(getErrorMessage(err));
    } finally {
      setCancelling(false);
      setAppointmentToCancel(null);
    }
  };

  const isEmpty = !loading && !error && appointments.length === 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-text-main">
            Mis Turnos Médicos
          </h1>
          <p className="text-sm text-med-text-sub mt-1">
            Consultá y gestioná tus citas médicas reservadas.
          </p>
        </div>
        <Button onClick={() => navigate('/')}>+ Solicitar Nuevo Turno</Button>
      </div>

      {successMessage && (
        <Alert type="success" onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      {actionError && (
        <Alert type="error" onClose={() => setActionError('')}>
          {actionError}
        </Alert>
      )}

      {loading && (
        <p className="text-sm text-med-text-sub">Cargando tus turnos...</p>
      )}

      {error && <Alert type="error">{error}</Alert>}

      {isEmpty && (
        <Card className="p-8 text-center">
          <p className="text-sm text-med-text-sub">
            No tenés turnos reservados por el momento.
          </p>
        </Card>
      )}

      {!loading && appointments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {appointments.map((appointment) => (
            <Card
              key={appointment.id}
              className="flex flex-col justify-between gap-4 p-6"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <AppointmentStatusBadge status={appointment.status} />
                </div>

                <h3 className="text-lg font-bold text-med-primary-900">
                  {appointment.doctor.name}
                </h3>

                <p className="text-sm text-med-text-sub mt-2">
                  Fecha:{' '}
                  <strong className="text-med-text-main font-semibold">
                    {formatDate(appointment.slot.date)}
                  </strong>{' '}
                  a las{' '}
                  <strong className="text-med-text-main font-semibold">
                    {formatTime(appointment.slot.startTime)} hs
                  </strong>
                </p>

                <p className="text-sm text-med-text-sub mt-1">
                  Motivo:{' '}
                  <span className="text-med-text-main">
                    {appointment.reason}
                  </span>
                </p>
              </div>

              {appointment.status === APPOINTMENT_STATUS.BOOKED && (
                <div className="flex gap-2 pt-3 border-t border-med-border">
                  <Button
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => setAppointmentToCancel(appointment)}
                  >
                    Cancelar Turno
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {appointmentToCancel && (
        <ConfirmDialog
          title="Cancelar turno"
          message={`¿Seguro que querés cancelar tu turno con ${appointmentToCancel.doctor.name} el ${formatDate(appointmentToCancel.slot.date)} a las ${formatTime(appointmentToCancel.slot.startTime)} hs?`}
          confirmLabel="Sí, cancelar turno"
          loading={cancelling}
          onConfirm={handleConfirmCancel}
          onCancel={() => setAppointmentToCancel(null)}
        />
      )}
    </div>
  );
}

export default AppointmentsPage;