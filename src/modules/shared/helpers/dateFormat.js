export const formatDate = (value) => {
  if (!value) return '-';

  const [year, month, day] = String(value).slice(0, 10).split('-');

  return year && month && day ? `${day}/${month}/${year}` : String(value);
};

// Recorta "10:30:00" a "10:30".
export const formatTime = (value) => (value ? String(value).slice(0, 5) : '');