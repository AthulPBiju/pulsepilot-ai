// src/components/ai-insights/MedicinePrediction.jsx
//
// Groups medicine stock-out predictions into 3 / 7 / 14 day horizon
// columns, each item showing its AI confidence. Columns use semantic
// urgency colors: 3-day = light red, 7-day = amber, 14-day = green.

import ConfidenceMeter from "./ConfidenceMeter";

const HORIZON_STYLES = {
  "3d": {
    heading: "text-red-600",
    card: "bg-red-50 border border-red-100 hover:border-red-200",
  },
  "7d": {
    heading: "text-amber-600",
    card: "bg-amber-50 border border-amber-100 hover:border-amber-200",
  },
  "14d": {
    heading: "text-emerald-600",
    card: "bg-emerald-50 border border-emerald-100 hover:border-emerald-200",
  },
};

const DEFAULT_STYLE = {
  heading: "text-blue-600",
  card: "bg-blue-50/50 border border-blue-100 hover:border-blue-200",
};

export default function MedicinePrediction({ predictions, horizons }) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="border-b border-blue-50 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">Medicine Stock-out Prediction</h3>
        <p className="text-xs text-slate-400">Medicines forecast to run out, grouped by time horizon</p>
      </div>

      <div className="grid grid-cols-1 divide-y divide-blue-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {horizons.map((h) => {
          const items = predictions.filter((p) => p.horizon === h.key);
          const style = HORIZON_STYLES[h.key] || DEFAULT_STYLE;
          return (
            <div key={h.key} className="p-4">
              <p className={`mb-3 text-xs font-semibold uppercase tracking-wide ${style.heading}`}>
                {h.label}
              </p>

              {items.length === 0 ? (
                <p className="text-sm text-slate-400">No medicines in this window.</p>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className={`rounded-lg p-3 transition-colors duration-200 ${style.card}`}
                    >
                      <p className="text-sm font-medium text-slate-700">{item.medicine}</p>
                      <p className="mb-2 text-xs text-slate-500">{item.phc}</p>
                      <ConfidenceMeter confidence={item.confidence} size="sm" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
