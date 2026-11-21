import Card from './Card';
import Icon from './Icon';

function SummaryCard({ label, icon, total, loading, error, badge }) {
  return (
    <Card className="flex min-h-44 flex-col items-start justify-between gap-7">
      <div className="flex w-full items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-med-primary-50 text-med-primary-900">
          <Icon path={icon} className="h-5 w-5" />
        </span>
        {badge && (
          <span className="rounded-full bg-med-primary-100 px-2.5 py-1 text-[11px] font-semibold text-med-primary-700">
            {badge}
          </span>
        )}
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-med-text-sub">
          {label}
        </p>
        <p
          className="mt-1 text-4xl font-bold leading-tight text-med-primary-900"
          aria-live="polite"
        >
          {loading ? '…' : error ? '—' : total}
        </p>
      </div>
    </Card>
  );
}

export default SummaryCard;
