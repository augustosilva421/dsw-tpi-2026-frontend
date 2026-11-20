const parseIsoDate = (isoDate) => {
  const [year, month, day] = isoDate.split('-').map(Number);

  return new Date(year, month - 1, day);
};

export const groupSlotsByDate = (slots) => {
  const groups = {};

  slots.forEach((slot) => {
    if (!groups[slot.date]) {
      groups[slot.date] = [];
    }

    groups[slot.date].push(slot);
  });

  return groups;
};

export const formatDayChip = (isoDate) => {
  const date = parseIsoDate(isoDate);

  return {
    weekday: date
      .toLocaleDateString('es-AR', { weekday: 'short' })
      .replace('.', ''),
    day: date.getDate(),
    month: date.toLocaleDateString('es-AR', { month: 'short' }).replace('.', ''),
  };
};

export const formatLongDate = (isoDate) =>
  parseIsoDate(isoDate).toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });