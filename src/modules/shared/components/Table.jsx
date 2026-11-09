const alignmentClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

function Table({
  columns = [],
  data = [],
  rowKey,
  loading = false,
  emptyMessage = 'No hay registros para mostrar',
}) {
  const getRowKey = (row, index) =>
    rowKey ? rowKey(row, index) : row.id || index;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-med-primary-50/70 text-[11px] uppercase tracking-wider text-med-text-sub border-b border-med-border">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-3.5 ${alignmentClasses[column.align] || alignmentClasses.left}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-med-border-subtle">
          {loading && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-sm text-med-text-muted"
              >
                Cargando...
              </td>
            </tr>
          )}

          {!loading && data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-sm text-med-text-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          )}

          {!loading &&
            data.map((row, index) => (
              <tr
                key={getRowKey(row, index)}
                className="hover:bg-gray-50/70 transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-4 ${alignmentClasses[column.align] || alignmentClasses.left} ${column.cellClassName || ''}`}
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
