const DashboardCard = ({ label, value, note, tone = "navy" }) => {
  const tones = {
    navy: "border-navy/20 bg-white",
    forest: "border-forest/20 bg-white",
    amber: "border-amber/30 bg-white",
    coral: "border-coral/25 bg-white"
  };

  return (
    <div className={`rounded-lg border p-5 shadow-soft ${tones[tone]}`}>
      <p className="text-sm font-medium text-stone-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-ink">{value}</p>
      {note && <p className="mt-2 text-sm text-stone-600">{note}</p>}
    </div>
  );
};

export default DashboardCard;
