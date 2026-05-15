import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(formData);
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (loginError) {
      setError(loginError.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell bg-[radial-gradient(circle_at_top_left,rgba(212,154,58,0.16),transparent_34%)]">
      <form onSubmit={handleSubmit} className="auth-card">
        <div className="mb-7 text-center">
          <p className="text-2xl font-bold tracking-tight text-navy">Hack-Tracker</p>
          <p className="mt-2 text-sm text-stone-600">Track your hackathon journey efficiently.</p>
        </div>
        {error && <p className="alert-error">{error}</p>}
        <label className="form-label mt-6">
          Name
          <input
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            className="input mt-2"
            required
          />
        </label>
        <label className="form-label mt-4">
          Password
          <input
            type="password"
            value={formData.password}
            onChange={(event) => setFormData({ ...formData, password: event.target.value })}
            className="input mt-2"
            required
          />
        </label>
        <button disabled={loading} className="btn-primary mt-6 w-full disabled:opacity-60">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
};

export default Login;
