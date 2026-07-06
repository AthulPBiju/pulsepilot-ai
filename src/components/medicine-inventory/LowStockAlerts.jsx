// src/components/medicine-inventory/LowStockAlerts.jsx
//
// Compact alert strip that surfaces Critical / Low items above the fold,
// so PHC staff don't have to scan the whole table to spot problems.

import StatusBadge from "./StatusBadge";

export default function LowStockAlerts({ medicines }) {
  const alerts = medicines
    .filter((m) => m.status === "Critical" || m.status === "Low")
    .sort((a, b) => (a.status === "Critical" ? -1 : 1));

  if (alerts.length === 0) {
    return (
      <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
        All medicines are at healthy stock levels across selected PHCs.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-blue-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-blue-50 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">Low-Stock Alerts</h3>
        <span className="text-xs font-medium text-blue-600">{alerts.length} item(s) need attention</span>
      </div>
      <ul className="max-h-56 divide-y divide-blue-50 overflow-y-auto">
        {alerts.map((m) => (
          <li key={m.id} className="flex items-center justify-between px-4 py-2.5 text-sm">
            <div>
              <p className="font-medium text-slate-700">{m.name}</p>
              <p className="text-xs text-slate-400">{m.phc}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">
                {m.currentStock.toLocaleString()} {m.unit} left
              </span>
              <StatusBadge status={m.status} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
