export const APPOINTMENT_STATUS = {
  BOOKED: 'BOOKED',
  CANCELLED: 'CANCELLED',
  ATTENDED: 'ATTENDED',
  NO_SHOW: 'NO_SHOW',
};

export const APPOINTMENT_STATUS_META = {
  [APPOINTMENT_STATUS.BOOKED]: { label: 'Reservado', tone: 'info' },
  [APPOINTMENT_STATUS.ATTENDED]: { label: 'Atendido', tone: 'success' },
  [APPOINTMENT_STATUS.NO_SHOW]: { label: 'Ausente', tone: 'warning' },
  [APPOINTMENT_STATUS.CANCELLED]: { label: 'Cancelado', tone: 'danger' },
};