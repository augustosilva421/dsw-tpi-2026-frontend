import { instance } from '../../shared/api/axiosInstance';
import { PAGE_SIZE, toBackendPage } from '../../shared/helpers/pagination';

const SPECIALTIES_URL = 'api/specialties';

export const getSpecialties = async ({
  page = 1,
  pageSize = PAGE_SIZE,
  name,
} = {}) => {
  const params = { pageIndex: toBackendPage(page), pageSize };

  if (name) params.name = name;

  const { data } = await instance.get(SPECIALTIES_URL, { params });

  return data;
};

export const createSpecialty = async ({ name, description }) => {
  const { data } = await instance.post(SPECIALTIES_URL, { name, description });

  return data;
};

export const updateSpecialty = async (id, { name, description }) => {
  const { data } = await instance.put(`${SPECIALTIES_URL}/${id}`, {
    name,
    description,
  });

  return data;
};

export const deleteSpecialty = async (id) => {
  await instance.delete(`${SPECIALTIES_URL}/${id}`);
};