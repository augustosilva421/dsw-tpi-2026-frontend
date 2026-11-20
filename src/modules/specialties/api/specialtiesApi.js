import { instance } from '../../shared/api/axiosInstance';

export const getSpecialties = async ({
  pageIndex = 0,
  pageSize = 100,
  name,
} = {}) => {
  const response = await instance.get('api/specialties', {
    params: { pageIndex, pageSize, name },
  });

  return response.data;
};