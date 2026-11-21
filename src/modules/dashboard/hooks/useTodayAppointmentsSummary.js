import { useEffect, useState } from 'react';
import usePaginatedQuery from '../../shared/hooks/usePaginatedQuery';
import { getConfirmedAppointmentsSummary } from '../../appointments/services/appointmentSummaryService';

const getLocalDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

function useTodayAppointmentsSummary() {
  const [date, setDate] = useState(getLocalDate);
  const summary = usePaginatedQuery(getConfirmedAppointmentsSummary, { date });

  useEffect(() => {
    const interval = setInterval(() => setDate(getLocalDate()), 60_000);

    return () => clearInterval(interval);
  }, []);

  return summary;
}

export default useTodayAppointmentsSummary;
