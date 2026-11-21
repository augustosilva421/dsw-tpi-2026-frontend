import { WEEK_DAYS, normalizeDay } from '../constants/weekDays.js';

export const buildAvailabilityRows = (existingDays) =>
  WEEK_DAYS.map(({ value, label }) => {
    const existing = existingDays.find(
      (item) => normalizeDay(item.day) === normalizeDay(value)
    );

    return {
      day: value,
      label,
      active: Boolean(existing),
      startTime: existing?.startTime
        ? String(existing.startTime).slice(0, 5)
        : '08:00',
      endTime: existing?.endTime
        ? String(existing.endTime).slice(0, 5)
        : '16:00',
    };
  });

export const validateAvailabilityRows = (rows) => {
  const selected = rows.filter((row) => row.active);

  if (selected.length === 0) {
    return 'Seleccioná al menos un día de atención.';
  }

  const invalid = selected.find(
    (row) => !row.startTime || !row.endTime || row.startTime >= row.endTime
  );

  return invalid
    ? `En ${invalid.label} la hora de salida debe ser posterior a la de entrada.`
    : '';
};

export const toAvailabilityDays = (rows) =>
  rows
    .filter((row) => row.active)
    .map(({ day, startTime, endTime }) => ({
      day,
      startTime,
      endTime,
    }));
