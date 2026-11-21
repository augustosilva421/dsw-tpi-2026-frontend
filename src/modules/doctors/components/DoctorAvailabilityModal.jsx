import { useState } from 'react';
import Alert from '../../shared/components/Alert';
import Button from '../../shared/components/Button';
import Modal from '../../shared/components/Modal';
import { getErrorMessage } from '../../shared/helpers/apiError';
import { saveDoctorAvailabilities } from '../api/availabilitiesApi';
import { WEEK_DAYS, normalizeDay } from '../constants/weekDays';
import useDoctorAvailability from '../hooks/useDoctorAvailability';

const DEFAULT_START = '08:00';
const DEFAULT_END = '16:00';

const toTime = (value, fallback) =>
  value ? String(value).slice(0, 5) : fallback;

const buildRows = (existingDays) =>
  WEEK_DAYS.map(({ value, label }) => {
    const existing = existingDays.find(
      (item) => normalizeDay(item.day) === normalizeDay(value)
    );

    return {
      day: value,
      label,
      active: Boolean(existing),
      startTime: toTime(existing?.startTime, DEFAULT_START),
      endTime: toTime(existing?.endTime, DEFAULT_END),
    };
  });

function AvailabilityForm({ doctor, existingDays, onCancel, onSaved }) {
  const [rows, setRows] = useState(() => buildRows(existingDays));
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const updateRow = (day, changes) =>
    setRows((current) =>
      current.map((row) => (row.day === day ? { ...row, ...changes } : row))
    );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selected = rows.filter((row) => row.active);

    if (selected.length === 0) {
      setFormError('Seleccioná al menos un día de atención.');

      return;
    }

    const invalid = selected.find(
      (row) => !row.startTime || !row.endTime || row.startTime >= row.endTime
    );

    if (invalid) {
      setFormError(
        `En ${invalid.label} la hora de salida debe ser posterior a la de entrada.`
      );

      return;
    }

    setSubmitting(true);
    setFormError('');

    try {
      await saveDoctorAvailabilities({
        doctorId: doctor.id,
        isUpdate: existingDays.length > 0,
        days: selected.map(({ day, startTime, endTime }) => ({
          day,
          startTime,
          endTime,
        })),
      });
      onSaved();
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-xs text-med-text-muted">
        Los turnos se generan automáticamente en bloques de 30 minutos.
      </p>

      <div className="flex flex-col divide-y divide-med-border-subtle border border-med-border rounded-lg">
        {rows.map((row) => (
          <div
            key={row.day}
            className="flex flex-wrap items-center gap-3 px-3 py-2.5"
          >
            <label className="flex items-center gap-2 w-32 text-sm font-medium text-med-text-main">
              <input
                type="checkbox"
                checked={row.active}
                onChange={(event) =>
                  updateRow(row.day, { active: event.target.checked })
                }
              />
              {row.label}
            </label>
            <input
              type="time"
              step={1800}
              aria-label={`Entrada ${row.label}`}
              value={row.startTime}
              disabled={!row.active}
              onChange={(event) =>
                updateRow(row.day, { startTime: event.target.value })
              }
              className="px-2 py-1.5 text-xs border border-med-border rounded-lg disabled:bg-gray-50 disabled:text-med-text-muted"
            />
            <span className="text-xs text-med-text-muted">a</span>
            <input
              type="time"
              step={1800}
              aria-label={`Salida ${row.label}`}
              value={row.endTime}
              disabled={!row.active}
              onChange={(event) =>
                updateRow(row.day, { endTime: event.target.value })
              }
              className="px-2 py-1.5 text-xs border border-med-border rounded-lg disabled:bg-gray-50 disabled:text-med-text-muted"
            />
          </div>
        ))}
      </div>

      {formError && <Alert>{formError}</Alert>}

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel} disabled={submitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Guardando...' : 'Guardar disponibilidad'}
        </Button>
      </div>
    </form>
  );
}

function DoctorAvailabilityModal({ doctor, onClose, onSaved }) {
  const { days, loading, error } = useDoctorAvailability(doctor.id);

  return (
    <Modal
      title="Disponibilidad horaria"
      description={`Defina los días y horarios de atención de ${doctor.name}.`}
      onClose={onClose}
    >
      {loading && (
        <p className="text-sm text-med-text-muted">
          Cargando disponibilidad...
        </p>
      )}
      {!loading && error && <Alert>{error}</Alert>}
      {!loading && !error && (
        <AvailabilityForm
          doctor={doctor}
          existingDays={days}
          onCancel={onClose}
          onSaved={onSaved}
        />
      )}
    </Modal>
  );
}

export default DoctorAvailabilityModal;
