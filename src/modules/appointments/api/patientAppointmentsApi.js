import { instance } from '../../shared/api/axiosInstance';

const APPOINTMENTS_URL = 'api/appointments';

export const getPatientAppointments = async (dni) => {
  const { data } = await instance.get(`${APPOINTMENTS_URL}/patient`, {
    params: { dni },
  });

  return data;
};

export const cancelAppointment = async (id) => {
  await instance.delete(`${APPOINTMENTS_URL}/${id}`);
};