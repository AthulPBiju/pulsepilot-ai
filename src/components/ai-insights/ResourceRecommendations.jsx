// src/components/ai-insights/ResourceRecommendations.jsx
//
// "Top AI Recommendations" section: redistribution actions (medicine,
// staff, beds) shown as cards with From / To / Expected Impact /
// Confidence, so the action and its payoff are visible at a glance.

import ConfidenceMeter from "./ConfidenceMeter";

const TYPE_ICON_BG = {
  medicine: "bg-blue-100 text-blue-700",
  doctor: "bg-emerald-100 text-emerald-700",
  beds: "bg-amber-100 text-amber-700",
};

function TypeIcon({ type }) {
  const icons = {
    medicine: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.586L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15a2.25 2.25 0 0 0 2.25-2.25v-4.162c0-.224-.034-.447-.1-.661L19.24 5.336a2.25 2.25 0 0 0-2.15-1.586H15M9 3.75V3a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 3v.75M9 3.75h6" />
      </svg>
    ),
    doctor: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    beds: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M3.75 6.75v10.5m0-10.5L7.5 3m-3.75 3.75L7.5 10.5m12.75-3.75v10.5m0-10.5L16.5 3m3.75 3.75L16.5 10.5M3.75 17.25h16.5m-16.5 0V21m16.5-3.75V21" />
      </svg>
    ),
  };
  return icons[type] || icons.medicine;
}

export default function ResourceRecommendations({ recommendations }) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="border-b border-blue-50 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">Top AI Recommendations</h3>
        <p className="text-xs text-slate-400">AI-suggested actions to balance medicine, staff, and capacity</p>
      </div>

      <ul className="divide-y divide-blue-50">
        {recommendations.map((r) => (
          <li
            key={r.id}
            className="flex flex-col gap-3 px-4 py-4 transition-colors duration-150 hover:bg-blue-50/40"
          >
            <div className="flex items-start gap-3">
              <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${TYPE_ICON_BG[r.type]}`}>
                <TypeIcon type={r.type} />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">{r.title}</p>
                <p className="text-xs text-slate-400">{r.quantity}</p>
              </div>
            </div>

            <div className="ml-11 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
              {r.fromPhc && (
                <div>
                  <p className="text-slate-400">From</p>
                  <p className="font-medium text-slate-700">{r.fromPhc}</p>
                </div>
              )}
              <div>
                <p className="text-slate-400">To</p>
                <p className="font-medium text-slate-700">{r.toPhc}</p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-400">Expected Impact</p>
                <p className="font-medium text-emerald-700">{r.expectedImpact}</p>
              </div>
            </div>

            <div className="ml-11 max-w-xs">
              <ConfidenceMeter confidence={r.confidence} size="sm" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
