import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HackathonForm from "../components/HackathonForm";
import { useHackathons } from "../context/HackathonContext";

const AddHackathon = () => {
  const { createHackathon } = useHackathons();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (payload) => {
    setLoading(true);
    setError("");
    try {
      const created = await createHackathon(payload);
      navigate(`/hackathons/${created._id}`);
    } catch (submitError) {
      setError(submitError.response?.data?.message || "Could not add hackathon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-shell max-w-4xl">
      <p className="eyebrow">New entry</p>
      <h1 className="mt-2 text-3xl font-semibold text-ink">Add Hackathon</h1>
      {error && <p className="alert-error">{error}</p>}
      <div className="mt-6">
        <HackathonForm onSubmit={handleSubmit} loading={loading} submitLabel="Add Hackathon" />
      </div>
    </main>
  );
};

export default AddHackathon;
