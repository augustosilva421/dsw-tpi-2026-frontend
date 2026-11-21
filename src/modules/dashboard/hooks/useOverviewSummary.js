import useDoctors from '../../doctors/hooks/useDoctors';
import useSpecialties from '../../specialties/hooks/useSpecialties';
import useTodayAppointmentsSummary from './useTodayAppointmentsSummary';

function useOverviewSummary() {
  const doctors = useDoctors({ pageSize: 1 });
  const specialties = useSpecialties({ pageSize: 1 });
  const appointments = useTodayAppointmentsSummary();

  return { doctors, specialties, appointments };
}

export default useOverviewSummary;
