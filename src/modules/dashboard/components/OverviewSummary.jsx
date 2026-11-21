import Alert from '../../shared/components/Alert';
import SummaryCard from '../../shared/components/SummaryCard';
import { ICON_PATHS } from '../../shared/constants/iconPaths';
import useOverviewSummary from '../hooks/useOverviewSummary';

const METRICS = [
  { key: 'doctors', label: 'Doctores activos', icon: ICON_PATHS.doctors },
  {
    key: 'specialties',
    label: 'Especialidades activas',
    icon: ICON_PATHS.specialties,
  },
  {
    key: 'appointments',
    label: 'Turnos confirmados para hoy',
    icon: ICON_PATHS.calendar,
    badge: 'Hoy',
  },
];

function OverviewSummary() {
  const summaries = useOverviewSummary();

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {METRICS.map(({ key, ...metric }) => (
          <SummaryCard
            key={key}
            {...metric}
            total={summaries[key].total}
            loading={summaries[key].loading}
            error={summaries[key].error}
          />
        ))}
      </div>
      {METRICS.filter(({ key }) => summaries[key].error).map(
        ({ key, label }) => (
          <Alert key={key}>
            No se pudo cargar «{label}»: {summaries[key].error}
          </Alert>
        )
      )}
    </>
  );
}

export default OverviewSummary;
