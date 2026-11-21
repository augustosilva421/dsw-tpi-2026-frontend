import { getDoctors } from '../api/doctorsApi';
import { fetchAllPages } from '../../shared/helpers/fetchAllPages';

export const getDoctorOptions = () => fetchAllPages(getDoctors);
