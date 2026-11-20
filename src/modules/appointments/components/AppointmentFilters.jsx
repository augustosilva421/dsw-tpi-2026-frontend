import { useState } from 'react';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import Input from '../../shared/components/Input';
import Select from '../../shared/components/Select';
import useDoctors from '../../doctors/hooks/useDoctors';
import useSpecialties from '../../specialties/hooks/useSpecialties';

const EMPTY_FILTERS = { specialtyId: '', doctorId: '', dni: '', date: '' };
const OPTIONS_LIMIT = 100;
const DNI_REGEX = /^\d{7,10}$/;

const removeEmpty = (filters) =>
  Object.fromEntries(Object.entries(filters).filter(([, value]) => value));

function AppointmentFilters({ onApply }) {
  const [draft, setDraft] = useState(EMPTY_FILTERS);
  const [dniError, setDniError] = useState('');

  const { data: specialties } = useSpecialties({ pageSize: OPTIONS_LIMIT });
  const { data: doctors } = useDoctors({ pageSize: OPTIONS_LIMIT });

  const visibleDoctors = draft.specialtyId
    ? doctors.filter((doctor) => doctor.specialty?.id === draft.specialtyId)
    : doctors;

  const handleChange = (field) => (event) => {
    const { value } = event.target;

    setDraft((current) => ({
      ...current,
      [field]: value,
      // Al cambiar la especialidad, el doctor elegido puede dejar de aplicar.
      ...(field === 'specialtyId' ? { doctorId: '' } : {}),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dni = draft.dni.trim();

    if (dni && !DNI_REGEX.test(dni)) {
      setDniError('El DNI debe tener entre 7 y 10 dígitos.');
      return;
    }

    setDniError('');
    onApply(removeEmpty({ ...draft, dni }));
  };

  const handleClear = () => {
    setDraft(EMPTY_FILTERS);
    setDniError('');
    onApply({});
  };

  return (
    <Card className="p-6">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-start"
      >
        <Input
          label="DNI del paciente"
          inputMode="numeric"
          placeholder="Ej. 40123456"
          value={draft.dni}
          error={dniError}
          onChange={handleChange('dni')}
        />
        <Select
          label="Especialidad"
          value={draft.specialtyId}
          onChange={handleChange('specialtyId')}
        >
          <option value="">Todas las especialidades</option>
          {specialties.map((specialty) => (
            <option key={specialty.id} value={specialty.id}>
              {specialty.name}
            </option>
          ))}
        </Select>
        <Select
          label="Doctor"
          value={draft.doctorId}
          onChange={handleChange('doctorId')}
        >
          <option value="">Todos los doctores</option>
          {visibleDoctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </Select>
        <Input
          label="Fecha"
          type="date"
          value={draft.date}
          onChange={handleChange('date')}
        />

        <div className="sm:col-span-2 lg:col-span-4 flex justify-end gap-3">
          <Button variant="outline" onClick={handleClear}>
            Limpiar
          </Button>
          <Button type="submit">Aplicar filtros</Button>
        </div>
      </form>
    </Card>
  );
}

export default AppointmentFilters;