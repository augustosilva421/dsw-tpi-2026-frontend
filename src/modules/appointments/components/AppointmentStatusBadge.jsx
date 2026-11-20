import StatusBadge from '../../shared/components/StatusBadge';
import { APPOINTMENT_STATUS_META } from '../constants/appointmentStatus';

function AppointmentStatusBadge({ status }) {
  const meta = APPOINTMENT_STATUS_META[status];

  return (
    <StatusBadge tone={meta?.tone ?? 'neutral'} dot>
      {meta?.label ?? status ?? '-'}
    </StatusBadge>
  );
}

export default AppointmentStatusBadge;