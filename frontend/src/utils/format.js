export const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));

export const inputDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

export const statusLabel = (status) =>
  ({
    upcoming: "Upcoming",
    attended: "Attended",
    cancelled: "Cancelled"
  })[status] || status;

export const resultLabel = (result) =>
  ({
    participated: "Participated",
    finalist: "Finalist",
    winner: "Winner",
    "not submitted": "Not submitted"
  })[result] || result;
