import Input from '../../shared/components/Input';

function DoctorAvailabilityTimeInput({ row, field, label, updateRow }) {
  return (
    <div className="w-[110px]">
      <Input
        type="time"
        size="compact"
        step={1800}
        aria-label={`${label} ${row.label}`}
        value={row.active ? row[field] : ''}
        required={row.active}
        disabled={!row.active}
        onChange={(event) =>
          updateRow(row.day, { [field]: event.target.value })
        }
        className="disabled:bg-gray-50 disabled:text-med-text-muted"
      />
    </div>
  );
}

export default DoctorAvailabilityTimeInput;
