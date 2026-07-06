// src/components/ai-insights/DemandForecast.jsx
//
// Patient footfall forecast for the next 7 days. Rendered as a simple
// CSS bar chart (no external charting library) to keep the page
// dependency-free, consistent with the rest of the project.

import ConfidenceMeter from "./ConfidenceMeter";

export default function DemandForecast({ forecast }) {
  const maxPatients = Math.max(...forecast.map((f) => f.predictedPatients));

  return (
    <div className="rounded-xl border border-blue-100 bg-white shadow-sm">
      <div className="border-b border-blue-50 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">Patient Footfall Forecast</h3>
        <p className="text-xs text-slate-400">Predicted patient visits for the next 7 days</p>
      </div>

      <div className="p-4">
        <div className="flex items-end gap-3 sm:gap-4" style={{ height: "160px" }}>
          {forecast.map((day) => {
            const heightPct = Math.max(8, Math.round((day.predictedPatients / maxPatients) * 100));
            return (
              <div key={day.label} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                <span className="text-xs font-semibold text-blue-700">{day.predictedPatients}</span>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-blue-500 to-blue-300"
                  style={{ height: `${heightPct}%` }}
                  title={`${day.predictedPatients} patients (${day.confidence}% confidence)`}
                />
                <span className="mt-1 text-[11px] text-slate-400">{day.label}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-5 border-t border-blue-50 pt-4">
          <ConfidenceMeter
            confidence={Math.round(
              forecast.reduce((sum, d) => sum + d.confidence, 0) / forecast.length
            )}
            label="Average Forecast Confidence"
          />
        </div>
      </div>
    </div>
  );
}
