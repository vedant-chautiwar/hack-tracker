import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import HackathonCard from "../components/HackathonCard";
import { ListSkeleton } from "../components/Skeleton";
import { useHackathons } from "../context/HackathonContext";

const Hackathons = () => {
  const { hackathons, fetchHackathons, loading, error, message } = useHackathons();
  const [filters, setFilters] = useState({ search: "", status: "all", mode: "all", sort: "asc" });

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      fetchHackathons(filters).catch(() => {});
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [filters]);

  const updateFilter = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
  };

  return (
    <main className="page-shell">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Hackathons</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">Your event log</h1>
        </div>
        <Link to="/hackathons/new" className="btn-primary">Add Hackathon</Link>
      </div>

      <section className="mt-8 grid gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm md:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
        <input
          className="input"
          placeholder="Search by title or organizer"
          value={filters.search}
          onChange={(event) => updateFilter("search", event.target.value)}
        />
        <select className="input" value={filters.status} onChange={(event) => updateFilter("status", event.target.value)}>
          <option value="all">All statuses</option>
          <option value="upcoming">Upcoming</option>
          <option value="attended">Attended</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select className="input" value={filters.mode} onChange={(event) => updateFilter("mode", event.target.value)}>
          <option value="all">All modes</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
          <option value="hybrid">Hybrid</option>
        </select>
        <select className="input" value={filters.sort} onChange={(event) => updateFilter("sort", event.target.value)}>
          <option value="asc">Start date asc</option>
          <option value="desc">Start date desc</option>
        </select>
      </section>

      {message && <p className="alert-success">{message}</p>}
      {error && <p className="alert-error">{error}</p>}

      {loading ? (
        <ListSkeleton />
      ) : hackathons.length === 0 ? (
        <EmptyState
          title="Nothing matches yet"
          description="Try changing the search or add your first hackathon."
        />
      ) : (
        <section className="mt-6 grid gap-4">
          {hackathons.map((hackathon) => (
            <HackathonCard key={hackathon._id} hackathon={hackathon} />
          ))}
        </section>
      )}
    </main>
  );
};

export default Hackathons;
