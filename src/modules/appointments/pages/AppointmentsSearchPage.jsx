import { useState } from 'react';
import Alert from '../../shared/components/Alert';
import Card from '../../shared/components/Card';
import PageHeader from '../../shared/components/PageHeader';
import TablePagination from '../../shared/components/TablePagination';
import { PAGE_SIZE, getTotalPages } from '../../shared/helpers/pagination';
import AppointmentFilters from '../components/AppointmentFilters';
import AppointmentsTable from '../components/AppointmentsTable';
import useAppointmentsSearch from '../hooks/useAppointmentsSearch';

function AppointmentsSearchPage() {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const { data, total, loading, error } = useAppointmentsSearch({
    ...filters,
    page,
    pageSize: PAGE_SIZE,
  });

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Búsqueda y filtrado de citas"
        description="Gestione y supervise los turnos de los pacientes."
      />

      <AppointmentFilters onApply={handleApplyFilters} />

      {error && <Alert>{error}</Alert>}

      <Card className="p-0 overflow-hidden border-med-border">
        <div className="p-5 border-b border-med-border">
          <h2 className="text-base font-bold text-med-primary-900">
            Registros de citas
          </h2>
        </div>
        <AppointmentsTable appointments={data} loading={loading} />
        <TablePagination
          currentPage={page}
          totalPages={getTotalPages(total)}
          totalItems={total}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
          disabled={loading}
        />
      </Card>
    </div>
  );
}

export default AppointmentsSearchPage;
