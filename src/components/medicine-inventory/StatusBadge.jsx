// src/components/medicine-inventory/StatusBadge.jsx
//
// Reusable status pill. Keeps the semantic colors (green/amber/red)
// standard for stock-health, while sitting comfortably inside the
// existing blue healthcare theme used everywhere else in PulsePilot.

const STATUS_STYLES = {
  Healthy: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Low: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Critical: "bg-red-50 text-red-700 ring-1 ring-red-200",
};

const STATUS_DOT = {
  Healthy: "bg-emerald-500",
  Low: "bg-amber-500",
  Critical: "bg-red-500",
};

export default function StatusBadge({ status }) {
  const styles = STATUS_STYLES[status] || "bg-slate-100 text-slate-600 ring-1 ring-slate-200";
  const dot = STATUS_DOT[status] || "bg-slate-400";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${styles}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}
