import { fetchAllPages } from '../../shared/helpers/fetchAllPages';
import { searchAppointments } from '../api/appointmentsApi';
import { APPOINTMENT_STATUS } from '../constants/appointmentStatus';

export const getConfirmedAppointmentsSummary = async ({ date }) => {
  const { data } = await fetchAllPages(searchAppointments, { date });

  return {
    total: data.filter(
      (appointment) => appointment.status === APPOINTMENT_STATUS.BOOKED
    ).length,
  };
};
