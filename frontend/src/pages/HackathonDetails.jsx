import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useHackathons } from "../context/HackathonContext";
import { formatDate, resultLabel, statusLabel } from "../utils/format";

const HackathonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchHackathon, deleteHackathon } = useHackathons();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHackathon(id)
      .then(setHackathon)
      .catch((loadError) => setError(loadError.response?.data?.message || "Could not load hackathon"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this hackathon?");
    if (!confirmed) return;

    await deleteHackathon(id);
    navigate("/hackathons");
  };

  if (loading) return <Loader text="Loading hackathon details..." />;
  if (error) return <main className="page-shell"><p className="alert-error">{error}</p></main>;
  if (!hackathon) return null;

  const detailRows = [
    ["Organizer", hackathon.organizer],
    ["Location", hackathon.location],
    ["Mode", hackathon.mode],
    ["Dates", `${formatDate(hackathon.startDate)} to ${formatDate(hackathon.endDate)}`],
    ["Status", statusLabel(hackathon.status)],
    ["Result", resultLabel(hackathon.result)],
    ["Team", hackathon.teamName || "Not added"],
    ["Project", hackathon.projectName || "Not added"],
    ["Tech Stack", hackathon.techStack || "Not added"]
  ];

  return (
    <main className="page-shell">
      <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Hackathon details</p>
            <h1 className="mt-2 text-3xl font-semibold text-ink">{hackathon.title}</h1>
          </div>
          <div className="flex gap-3">
            <Link to={`/hackathons/${id}/edit`} className="btn-secondary">Edit</Link>
            <button onClick={handleDelete} className="btn-danger">Delete</button>
          </div>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {detailRows.map(([label, value]) => (
            <div key={label} className="rounded-md bg-cream p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</p>
              <p className="mt-2 text-sm font-medium capitalize text-ink">{value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="font-semibold text-ink">Project description</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-stone-600">
              {hackathon.projectDescription || "No project description yet."}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-ink">Notes</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-stone-600">
              {hackathon.notes || "No notes yet."}
            </p>
          </div>
        </section>

        {hackathon.registrationLink && (
          <a
            href={hackathon.registrationLink}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex font-semibold text-forest hover:text-navy"
          >
            Open registration link
          </a>
        )}
      </div>
    </main>
  );
};

export default HackathonDetails;
