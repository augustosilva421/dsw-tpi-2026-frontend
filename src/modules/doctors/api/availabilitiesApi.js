import { instance } from '../../shared/api/axiosInstance';

const AVAILABILITIES_URL = 'api/availabilities';

export const getDoctorAvailabilities = async (doctorId) => {
  const { data } = await instance.get(`api/doctors/${doctorId}/availabilities`);

  return Array.isArray(data) ? data : [];
};

export const saveDoctorAvailabilities = async ({
  doctorId,
  days,
  isUpdate,
}) => {
  const payload = { doctorId, days };

  if (isUpdate) {
    await instance.put(AVAILABILITIES_URL, payload);
  } else {
    await instance.post(AVAILABILITIES_URL, payload);
  }
};
