// src/components/ai-insights/ModelInfoFooter.jsx
//
// Footer card showing model metadata (version, refresh time, data
// sources, overall accuracy) so the page's predictions are traceable
// to a named model and dataset scale.

export default function ModelInfoFooter({ info }) {
  const stats = [
    { label: "PHCs", value: info.dataSources.phcs },
    { label: "Doctors", value: info.dataSources.doctors },
    { label: "Medicines", value: info.dataSources.medicines },
  ];

  return (
    <div
      className="rounded-xl border border-blue-100 bg-white p-5 shadow-sm transition-shadow
                 duration-200 hover:shadow-md"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Model Information</h3>
          <p className="mt-1 text-xs text-slate-400">Last refresh: {info.lastRefresh}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <div>
            <p className="text-xs text-slate-400">Prediction Model</p>
            <p className="text-sm font-semibold text-blue-700">{info.modelName}</p>
          </div>

          <div className="flex items-center gap-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-sm font-semibold text-slate-700">{s.value}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-emerald-50 px-3 py-2 text-center">
            <p className="text-sm font-bold text-emerald-700">{info.overallAccuracyPct}%</p>
            <p className="text-xs text-emerald-600">Model Accuracy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
