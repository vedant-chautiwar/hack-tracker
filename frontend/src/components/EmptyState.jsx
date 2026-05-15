import { Link } from "react-router-dom";

const EmptyState = ({
  title = "No hackathons yet",
  description = "Start logging the events you are watching, joining, or have already completed.",
  actionLabel = "Add Hackathon",
  actionTo = "/hackathons/new"
}) => (
  <div className="rounded-lg border border-dashed border-stone-300 bg-cream px-6 py-10 text-center">
    <div className="mx-auto mb-6 grid h-28 w-36 grid-cols-3 gap-2 rounded-lg border border-stone-200 bg-white p-3 shadow-sm">
      <span className="rounded bg-amber/25" />
      <span className="rounded bg-stone-100" />
      <span className="rounded bg-forest/15" />
      <span className="rounded bg-stone-100" />
      <span className="rounded bg-coral/20" />
      <span className="rounded bg-stone-100" />
      <span className="rounded bg-forest/15" />
      <span className="rounded bg-stone-100" />
      <span className="rounded bg-amber/25" />
    </div>
    <h3 className="text-lg font-semibold text-ink">{title}</h3>
    <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-stone-600">{description}</p>
    {actionTo && (
      <Link className="btn-primary mt-5 inline-flex" to={actionTo}>
        {actionLabel}
      </Link>
    )}
  </div>
);

export default EmptyState;
