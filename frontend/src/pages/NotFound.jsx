import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="page-shell text-center">
    <p className="eyebrow">404</p>
    <h1 className="mt-3 text-4xl font-semibold text-ink">Page not found</h1>
    <p className="mx-auto mt-4 max-w-md text-stone-600">
      That page is not part of this tracker. Head back to your dashboard and keep moving.
    </p>
    <Link to="/dashboard" className="btn-primary mt-6 inline-flex">
      Back to dashboard
    </Link>
  </main>
);

export default NotFound;
