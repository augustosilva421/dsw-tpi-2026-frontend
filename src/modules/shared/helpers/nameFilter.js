const MIN_NAME_LENGTH = 3;

export const normalizeNameFilter = (value = '') => {
  const name = value.trim();

  return name.length >= MIN_NAME_LENGTH ? name : undefined;
};
