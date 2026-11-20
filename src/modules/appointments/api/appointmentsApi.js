import { instance } from '../../shared/api/axiosInstance';
import { PAGE_SIZE, toBackendPage } from '../../shared/helpers/pagination';

const APPOINTMENTS_URL = 'api/appointments';

const pick = (...values) =>
  values.find((value) => value !== undefined && value !== null);

const mapAppointment = (raw) => {
  const slot = raw.availableTime ?? raw.slot ?? {};
  const dateTime = typeof slot === 'string' ? slot : slot.dateTime;

  return {
    id: raw.id,
    status: raw.status,
    patientName: pick(
      raw.patient?.fullName,
      raw.patient?.name,
      raw.patientName,
      ''
    ),
    dni: pick(raw.patient?.dni, raw.dni, ''),
    doctorName: pick(raw.doctor?.name, raw.doctorName, ''),
    specialtyName: pick(
      raw.specialty?.name,
      raw.doctor?.specialty?.name,
      raw.specialtyName,
      ''
    ),
    date: pick(slot.date, slot.slotDate, dateTime?.split('T')[0], raw.date, ''),
    startTime: pick(
      slot.startTime,
      dateTime?.split('T')[1],
      raw.startTime,
      ''
    ),
  };
};

export const searchAppointments = async ({
  page = 1,
  pageSize = PAGE_SIZE,
  specialtyId,
  doctorId,
  dni,
  date,
} = {}) => {
  const params = { pageIndex: toBackendPage(page), pageSize };

  if (specialtyId) params.specialtyId = specialtyId;
  if (doctorId) params.doctorId = doctorId;
  if (dni) params.dni = dni;
  if (date) params.date = date;

  const { data } = await instance.get(`${APPOINTMENTS_URL}/search`, {
    params,
  });

  return { ...data, data: (data.data ?? []).map(mapAppointment) };
};

export const markAppointmentAttended = async (id) => {
  await instance.put(`${APPOINTMENTS_URL}/${id}/attend`);
};

export const markAppointmentNoShow = async (id) => {
  await instance.put(`${APPOINTMENTS_URL}/${id}/no-show`);
};