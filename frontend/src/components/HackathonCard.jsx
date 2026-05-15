import { Link } from "react-router-dom";
import { formatDate, statusLabel } from "../utils/format";

const badgeClass = {
  upcoming: "bg-amber/15 text-stone-800",
  attended: "bg-forest/12 text-forest",
  cancelled: "bg-coral/15 text-coral"
};

const HackathonCard = ({ hackathon }) => (
  <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 className="text-lg font-semibold text-ink">
          <Link to={`/hackathons/${hackathon._id}`} className="hover:text-forest">
            {hackathon.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-stone-600">{hackathon.organizer}</p>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass[hackathon.status]}`}>
        {statusLabel(hackathon.status)}
      </span>
    </div>
    <div className="mt-4 grid gap-2 text-sm text-stone-600 sm:grid-cols-2">
      <p>{formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}</p>
      <p className="capitalize">{hackathon.mode} - {hackathon.location}</p>
    </div>
    {(hackathon.projectName || hackathon.teamName) && (
      <p className="mt-4 text-sm text-stone-700">
        {hackathon.projectName || "Project undecided"}
        {hackathon.teamName ? ` with ${hackathon.teamName}` : ""}
      </p>
    )}
  </article>
);

export default HackathonCard;
