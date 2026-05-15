import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition hover:text-forest ${isActive ? "text-forest" : "text-stone-600"}`;

  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-paper/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/dashboard" className="text-xl font-bold tracking-tight text-navy">
          Hack-Tracker
        </Link>
        <div className="flex items-center gap-4">
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/hackathons" className={linkClass}>Hackathons</NavLink>
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white text-sm font-bold text-navy shadow-sm transition hover:border-forest hover:text-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
              aria-label="Open profile menu"
            >
              {user?.name?.slice(0, 1).toUpperCase() || "H"}
            </button>
            {open && (
              <div className="absolute right-0 mt-3 w-48 rounded-lg border border-stone-200 bg-white p-2 shadow-soft">
                <div className="border-b border-stone-100 px-3 py-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Signed in as</p>
                  <p className="mt-1 truncate text-sm font-semibold text-ink">{user?.name}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-2 w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-coral transition hover:bg-coral/10"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
