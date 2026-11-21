const DEFAULT_BATCH_SIZE = 100;

export const fetchAllPages = async (
  fetchPage,
  params = {},
  pageSize = DEFAULT_BATCH_SIZE
) => {
  const data = [];
  let page = 1;
  let total;

  do {
    const result = await fetchPage({ ...params, page, pageSize });
    const items = result.data ?? [];

    total = result.total;

    if (!Number.isInteger(total) || total < 0) {
      throw new Error('La respuesta no incluye un total de registros válido.');
    }

    if (items.length === 0 && data.length < total) {
      throw new Error('No se pudieron recuperar todos los registros.');
    }

    data.push(...items);
    page += 1;
  } while (data.length < total);

  return { data, total };
};
