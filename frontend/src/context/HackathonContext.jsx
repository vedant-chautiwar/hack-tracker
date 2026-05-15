import { createContext, useContext, useMemo, useState } from "react";
import api from "../api/axios";

const HackathonContext = createContext(null);

export const HackathonProvider = ({ children }) => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const notify = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 3000);
  };

  const fetchHackathons = async (params = {}) => {
    setLoading(true);
    setError("");

    try {
      const { data } = await api.get("/hackathons", { params });
      setHackathons(data);
      return data;
    } catch (fetchError) {
      const text = fetchError.response?.data?.message || "Could not load hackathons";
      setError(text);
      throw fetchError;
    } finally {
      setLoading(false);
    }
  };

  const fetchHackathon = async (id) => {
    const { data } = await api.get(`/hackathons/${id}`);
    return data;
  };

  const createHackathon = async (payload) => {
    const { data } = await api.post("/hackathons", payload);
    setHackathons((current) => [...current, data]);
    notify("Hackathon added");
    return data;
  };

  const updateHackathon = async (id, payload) => {
    const { data } = await api.put(`/hackathons/${id}`, payload);
    setHackathons((current) => current.map((item) => (item._id === id ? data : item)));
    notify("Hackathon updated");
    return data;
  };

  const deleteHackathon = async (id) => {
    await api.delete(`/hackathons/${id}`);
    setHackathons((current) => current.filter((item) => item._id !== id));
    notify("Hackathon deleted");
  };

  const value = useMemo(
    () => ({
      hackathons,
      loading,
      error,
      message,
      setError,
      fetchHackathons,
      fetchHackathon,
      createHackathon,
      updateHackathon,
      deleteHackathon
    }),
    [hackathons, loading, error, message]
  );

  return <HackathonContext.Provider value={value}>{children}</HackathonContext.Provider>;
};

export const useHackathons = () => useContext(HackathonContext);
