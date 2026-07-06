// src/components/ai-insights/MedicinePrediction.jsx
//
// Groups medicine stock-out predictions into 3 / 7 / 14 day horizon
// columns, each item showing its AI confidence.

import ConfidenceMeter from "./ConfidenceMeter";

export default function MedicinePrediction({ predictions, horizons }) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white shadow-sm">
      <div className="border-b border-blue-50 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">Medicine Stock-out Prediction</h3>
        <p className="text-xs text-slate-400">Medicines forecast to run out, grouped by time horizon</p>
      </div>

      <div className="grid grid-cols-1 divide-y divide-blue-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {horizons.map((h) => {
          const items = predictions.filter((p) => p.horizon === h.key);
          return (
            <div key={h.key} className="p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-600">
                {h.label}
              </p>

              {items.length === 0 ? (
                <p className="text-sm text-slate-400">No medicines in this window.</p>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.id} className="rounded-lg bg-blue-50/50 p-3">
                      <p className="text-sm font-medium text-slate-700">{item.medicine}</p>
                      <p className="mb-2 text-xs text-slate-400">{item.phc}</p>
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
