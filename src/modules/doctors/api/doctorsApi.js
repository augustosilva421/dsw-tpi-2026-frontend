import { instance } from '../../shared/api/axiosInstance';

export const getDoctors = async ({
  pageIndex = 0,
  pageSize = 100,
  name,
} = {}) => {
  const response = await instance.get('api/doctors', {
    params: { pageIndex, pageSize, name },
  });

  return response.data;
};

export const getAvailableSlots = async (doctorId) => {
  const response = await instance.get(
    `api/doctors/${doctorId}/available-slots`
  );

  return response.data;
};