import { instance } from '../../shared/api/axiosInstance';

const APPOINTMENTS_URL = 'api/appointments';

export const getPatientAppointments = async (dni) => {
  const { data } = await instance.get(`${APPOINTMENTS_URL}/patient`, {
    params: { dni },
  });

  return data;
};

export const createAppointment = async ({
  doctorId,
  availabilitySlotId,
  dni,
  reason,
}) => {
  const { data } = await instance.post(APPOINTMENTS_URL, {
    doctorId,
    availabilitySlotId,
    patient: { dni: Number(dni) },
    reason,
  });

  return data;
};

export const cancelAppointment = async (id) => {
  await instance.delete(`${APPOINTMENTS_URL}/${id}`);
};