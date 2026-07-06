// src/components/ai-insights/DoctorAttendancePrediction.jsx
//
// Expected doctor attendance percentage per PHC, each with its own
// AI confidence score.

import ConfidenceMeter from "./ConfidenceMeter";

function attendanceTone(pct) {
  if (pct >= 85) return "text-emerald-700";
  if (pct >= 75) return "text-amber-700";
  return "text-red-700";
}

export default function DoctorAttendancePrediction({ predictions }) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white shadow-sm">
      <div className="border-b border-blue-50 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">Doctor Attendance Prediction</h3>
        <p className="text-xs text-slate-400">Expected attendance percentage by PHC</p>
      </div>

      <ul className="divide-y divide-blue-50">
        {predictions.map((p) => (
          <li key={p.phc} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-slate-700 sm:w-48">{p.phc}</p>
            <div className="flex flex-1 items-center gap-4">
              <span className={`text-sm font-semibold ${attendanceTone(p.expectedAttendancePct)}`}>
                {p.expectedAttendancePct}% expected
              </span>
              <div className="hidden flex-1 sm:block">
                <div className="h-2 w-full overflow-hidden rounded-full bg-blue-50">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${p.expectedAttendancePct}%` }}
                  />
                </div>
              </div>
              <div className="w-32">
                <ConfidenceMeter confidence={p.confidence} size="sm" label="Confidence" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
