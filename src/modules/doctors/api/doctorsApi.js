import { instance } from '../../shared/api/axiosInstance';
import { PAGE_SIZE, toBackendPage } from '../../shared/helpers/pagination';

const DOCTORS_URL = 'api/doctors';

export const getDoctors = async ({
  page = 1,
  pageSize = PAGE_SIZE,
  name,
} = {}) => {
  const params = { pageIndex: toBackendPage(page), pageSize };

  if (name) params.name = name;

  const { data } = await instance.get(DOCTORS_URL, { params });

  return data;
};

export const createDoctor = async ({ name, licenseNumber, specialtyId }) => {
  const { data } = await instance.post(DOCTORS_URL, {
    name,
    licenseNumber,
    specialtyId,
  });

  return data;
};

export const updateDoctor = async (
  id,
  { name, licenseNumber, specialtyId }
) => {
  const { data } = await instance.put(`${DOCTORS_URL}/${id}`, {
    name,
    licenseNumber,
    specialtyId,
  });

  return data;
};

export const deleteDoctor = async (id) => {
  await instance.delete(`${DOCTORS_URL}/${id}`);
};

export const getAvailableSlots = async (doctorId) => {
  const { data } = await instance.get(
    `${DOCTORS_URL}/${doctorId}/available-slots`
  );

  return data;
};