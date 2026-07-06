// src/components/medicine-inventory/RedistributionSuggestions.jsx
//
// Shows recommended stock transfers between PHCs, derived from the
// sample data's surplus/shortage pairing logic.

export default function RedistributionSuggestions({ suggestions }) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white shadow-sm">
      <div className="border-b border-blue-50 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">Recommended Redistribution</h3>
        <p className="text-xs text-slate-400">AI-suggested transfers to balance stock across PHCs</p>
      </div>

      {suggestions.length === 0 ? (
        <p className="px-4 py-6 text-center text-sm text-slate-400">
          No redistribution needed right now.
        </p>
      ) : (
        <ul className="divide-y divide-blue-50">
          {suggestions.map((s) => (
            <li key={s.id} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">{s.medicine}</p>
                <p className="text-xs text-slate-400">{s.reason}</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="rounded-md bg-blue-50 px-2 py-1 text-blue-700">{s.fromPhc}</span>
                <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="rounded-md bg-blue-50 px-2 py-1 text-blue-700">{s.toPhc}</span>
                <span className="ml-2 font-semibold text-slate-600">
                  {s.quantity.toLocaleString()} {s.unit}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
