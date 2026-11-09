function PageHeader({ title, description, actions }) {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-med-text-main">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-med-text-sub mt-1">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-3">{actions}</div>
      )}
    </div>
  );
}

export default PageHeader;
