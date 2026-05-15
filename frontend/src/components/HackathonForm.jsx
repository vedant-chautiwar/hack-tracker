import { useMemo, useState } from "react";
import { inputDate } from "../utils/format";

const emptyForm = {
  title: "",
  organizer: "",
  location: "",
  mode: "online",
  startDate: "",
  endDate: "",
  status: "upcoming",
  teamName: "",
  projectName: "",
  projectDescription: "",
  result: "not submitted",
  techStack: "",
  notes: "",
  registrationLink: ""
};

const HackathonForm = ({ initialData, onSubmit, submitLabel = "Save Hackathon", loading = false }) => {
  const initialValues = useMemo(
    () => ({
      ...emptyForm,
      ...initialData,
      startDate: inputDate(initialData?.startDate),
      endDate: inputDate(initialData?.endDate)
    }),
    [initialData]
  );

  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    ["title", "organizer", "location", "startDate", "endDate"].forEach((field) => {
      if (!formData[field]?.trim()) nextErrors[field] = "This field is required";
    });

    if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
      nextErrors.endDate = "End date cannot be before start date";
    }

    if (formData.registrationLink && !/^https?:\/\/.+/i.test(formData.registrationLink)) {
      nextErrors.registrationLink = "Use a full link starting with http:// or https://";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    await onSubmit(formData);
  };

  const fieldClass =
    "mt-2 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-ink outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/15";

  const renderError = (field) =>
    errors[field] ? <p className="mt-1 text-xs font-medium text-coral">{errors[field]}</p> : null;

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 rounded-lg border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="form-label">
          Title
          <input name="title" value={formData.title} onChange={handleChange} className={fieldClass} />
          {renderError("title")}
        </label>
        <label className="form-label">
          Organizer
          <input name="organizer" value={formData.organizer} onChange={handleChange} className={fieldClass} />
          {renderError("organizer")}
        </label>
        <label className="form-label">
          Location
          <input name="location" value={formData.location} onChange={handleChange} className={fieldClass} />
          {renderError("location")}
        </label>
        <label className="form-label">
          Mode
          <select name="mode" value={formData.mode} onChange={handleChange} className={fieldClass}>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </label>
        <label className="form-label">
          Start Date
          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className={fieldClass} />
          {renderError("startDate")}
        </label>
        <label className="form-label">
          End Date
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className={fieldClass} />
          {renderError("endDate")}
        </label>
        <label className="form-label">
          Status
          <select name="status" value={formData.status} onChange={handleChange} className={fieldClass}>
            <option value="upcoming">Upcoming</option>
            <option value="attended">Attended</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
        <label className="form-label">
          Result
          <select name="result" value={formData.result} onChange={handleChange} className={fieldClass}>
            <option value="not submitted">Not submitted</option>
            <option value="participated">Participated</option>
            <option value="finalist">Finalist</option>
            <option value="winner">Winner</option>
          </select>
        </label>
        <label className="form-label">
          Team Name
          <input name="teamName" value={formData.teamName} onChange={handleChange} className={fieldClass} />
        </label>
        <label className="form-label">
          Project Name
          <input name="projectName" value={formData.projectName} onChange={handleChange} className={fieldClass} />
        </label>
      </div>
      <label className="form-label">
        Tech Stack
        <input
          name="techStack"
          value={formData.techStack}
          onChange={handleChange}
          className={fieldClass}
          placeholder="React, Express, MongoDB"
        />
      </label>
      <label className="form-label">
        Registration Link
        <input
          name="registrationLink"
          value={formData.registrationLink}
          onChange={handleChange}
          className={fieldClass}
          placeholder="https://..."
        />
        {renderError("registrationLink")}
      </label>
      <label className="form-label">
        Project Description
        <textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} rows="4" className={fieldClass} />
      </label>
      <label className="form-label">
        Notes
        <textarea name="notes" value={formData.notes} onChange={handleChange} rows="4" className={fieldClass} />
      </label>
      <div className="flex justify-end">
        <button disabled={loading} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default HackathonForm;
