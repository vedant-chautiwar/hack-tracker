import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import EmptyState from "../components/EmptyState";
import HackathonCard from "../components/HackathonCard";
import { DashboardSkeleton } from "../components/Skeleton";
import { useAuth } from "../context/AuthContext";
import { useHackathons } from "../context/HackathonContext";
import { formatDate } from "../utils/format";

const Dashboard = () => {
  const { user } = useAuth();
  const { hackathons, fetchHackathons, loading, error, message } = useHackathons();

  useEffect(() => {
    fetchHackathons({ sort: "asc" }).catch(() => {});
  }, []);

  const stats = useMemo(() => {
    const upcoming = hackathons.filter((item) => item.status === "upcoming");
    const attended = hackathons.filter((item) => item.status === "attended");
    const winsFinalists = hackathons.filter((item) => ["winner", "finalist"].includes(item.result));

    return { upcoming, attended, winsFinalists };
  }, [hackathons]);

  const recent = [...hackathons]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const nextUpcoming = stats.upcoming
    .filter((item) => new Date(item.startDate) >= new Date(new Date().toDateString()))
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))[0];

  return (
    <main className="page-shell">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">Welcome, {user?.name}</h1>
        </div>
        <Link to="/hackathons/new" className="btn-primary">Add Hackathon</Link>
      </div>

      {message && <p className="alert-success">{message}</p>}
      {error && <p className="alert-error">{error}</p>}

      {loading ? (
        <DashboardSkeleton />
      ) : hackathons.length === 0 ? (
        <EmptyState
          title="Your tracker is ready"
          description="Add your first hackathon and this dashboard will turn into a useful snapshot of dates, projects, outcomes, and notes."
        />
      ) : (
        <>
          <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardCard label="Total Hackathons" value={hackathons.length} tone="navy" />
            <DashboardCard label="Upcoming" value={stats.upcoming.length} tone="amber" />
            <DashboardCard label="Attended" value={stats.attended.length} tone="forest" />
            <DashboardCard label="Wins/Finalists" value={stats.winsFinalists.length} tone="coral" />
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-ink">Recent Hackathons</h2>
                <Link className="text-sm font-semibold text-forest hover:text-navy" to="/hackathons">
                  View all
                </Link>
              </div>
              <div className="grid gap-4">
                {recent.map((hackathon) => (
                  <HackathonCard key={hackathon._id} hackathon={hackathon} />
                ))}
              </div>
            </div>

            <aside className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-ink">Upcoming reminder</h2>
              {nextUpcoming ? (
                <div className="mt-4 rounded-md bg-cream p-4">
                  <p className="font-semibold text-navy">{nextUpcoming.title}</p>
                  <p className="mt-2 text-sm text-stone-600">
                    Starts on {formatDate(nextUpcoming.startDate)}
                  </p>
                  <p className="mt-3 text-sm text-stone-700">{nextUpcoming.organizer}</p>
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-stone-600">
                  No upcoming hackathons right now. A quiet calendar can be a feature too.
                </p>
              )}
            </aside>
          </section>
        </>
      )}
    </main>
  );
};

export default Dashboard;
