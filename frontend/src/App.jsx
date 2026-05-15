import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AddHackathon from "./pages/AddHackathon";
import Dashboard from "./pages/Dashboard";
import EditHackathon from "./pages/EditHackathon";
import HackathonDetails from "./pages/HackathonDetails";
import Hackathons from "./pages/Hackathons";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hackathons" element={<Hackathons />} />
        <Route path="/hackathons/new" element={<AddHackathon />} />
        <Route path="/hackathons/:id" element={<HackathonDetails />} />
        <Route path="/hackathons/:id/edit" element={<EditHackathon />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;
