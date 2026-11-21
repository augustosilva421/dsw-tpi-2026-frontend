import { Link } from 'react-router-dom';

function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-3 text-xs text-med-text-sub">
        {items.map((item, index) => (
          <li key={item.to ?? item.label} className="flex items-center gap-2">
            {index > 0 && (
              <span aria-hidden="true" className="text-med-text-muted">
                ›
              </span>
            )}
            {index < items.length - 1 ? (
              <Link
                to={item.to}
                className="hover:text-med-primary-900 hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className="font-semibold text-med-primary-900"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
