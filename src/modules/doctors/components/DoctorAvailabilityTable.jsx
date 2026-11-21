import Switch from '../../shared/components/Switch';
import Table from '../../shared/components/Table';
import DoctorAvailabilityTimeInput from './DoctorAvailabilityTimeInput';

function DoctorAvailabilityTable({ rows, updateRow }) {
  const columns = [
    { key: 'label', header: 'Día', rowHeader: true },
    {
      key: 'active',
      header: 'Estado',
      render: (row) => (
        <Switch
          checked={row.active}
          label={`Atención ${row.label}`}
          onChange={(active) => updateRow(row.day, { active })}
        />
      ),
    },
    {
      key: 'startTime',
      header: 'Entrada',
      render: (row) => (
        <DoctorAvailabilityTimeInput
          row={row}
          field="startTime"
          label="Entrada"
          updateRow={updateRow}
        />
      ),
    },
    {
      key: 'endTime',
      header: 'Salida',
      render: (row) => (
        <DoctorAvailabilityTimeInput
          row={row}
          field="endTime"
          label="Salida"
          updateRow={updateRow}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => row.day}
      variant="bordered"
      rowClassName={(row) =>
        row.active ? '' : 'bg-slate-50/50 text-med-text-muted'
      }
    />
  );
}

export default DoctorAvailabilityTable;
