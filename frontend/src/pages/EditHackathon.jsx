import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HackathonForm from "../components/HackathonForm";
import Loader from "../components/Loader";
import { useHackathons } from "../context/HackathonContext";

const EditHackathon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchHackathon, updateHackathon } = useHackathons();
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHackathon(id)
      .then(setHackathon)
      .catch((loadError) => setError(loadError.response?.data?.message || "Could not load hackathon"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (payload) => {
    setSaving(true);
    setError("");
    try {
      await updateHackathon(id, payload);
      navigate(`/hackathons/${id}`);
    } catch (submitError) {
      setError(submitError.response?.data?.message || "Could not update hackathon");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader text="Loading hackathon..." />;

  return (
    <main className="page-shell max-w-4xl">
      <p className="eyebrow">Edit entry</p>
      <h1 className="mt-2 text-3xl font-semibold text-ink">Edit Hackathon</h1>
      {error && <p className="alert-error">{error}</p>}
      {hackathon && (
        <div className="mt-6">
          <HackathonForm initialData={hackathon} onSubmit={handleSubmit} loading={saving} submitLabel="Update Hackathon" />
        </div>
      )}
    </main>
  );
};

export default EditHackathon;
