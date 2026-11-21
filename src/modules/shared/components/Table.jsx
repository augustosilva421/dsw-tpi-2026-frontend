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
  variant = 'default',
  rowClassName,
}) {
  const bordered = variant === 'bordered';
  const cellSpacing = bordered
    ? 'px-[18px] py-4 whitespace-nowrap max-[1100px]:px-3'
    : 'px-6 py-4';
  const getRowKey = (row, index) =>
    rowKey ? rowKey(row, index) : row.id || index;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead
          className={
            bordered
              ? 'bg-med-primary-100 text-xs uppercase tracking-wide text-med-text-sub'
              : 'bg-med-primary-50/70 text-[11px] uppercase tracking-wider text-med-text-sub border-b border-med-border'
          }
        >
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={`${bordered ? cellSpacing : 'px-6 py-3.5'} ${alignmentClasses[column.align] || alignmentClasses.left}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={bordered ? '' : 'divide-y divide-med-border-subtle'}>
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
                className={`${bordered ? 'border-b border-slate-300 last:border-b-0' : 'hover:bg-gray-50/70 transition-colors'} ${rowClassName?.(row) ?? ''}`}
              >
                {columns.map((column) => {
                  const Cell = column.rowHeader ? 'th' : 'td';

                  return (
                    <Cell
                      key={column.key}
                      scope={column.rowHeader ? 'row' : undefined}
                      className={`${cellSpacing} ${column.rowHeader ? 'font-normal' : ''} ${alignmentClasses[column.align] || alignmentClasses.left} ${column.cellClassName || ''}`}
                    >
                      {column.render ? column.render(row) : row[column.key]}
                    </Cell>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
