// src/components/ai-insights/AIOverviewCards.jsx
//
// Top summary strip for the AI Insights page. Mirrors the SummaryCard
// pattern already used at the top of the Medicine Inventory page, so the
// visual language stays consistent across pages.

const CARD_ICONS = {
  risk: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-8.94 3.94h.008v.008h-.008v-.008Z" />
    </svg>
  ),
  stockout: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M20.25 6.375c0 2.07-3.694 3.75-8.25 3.75s-8.25-1.68-8.25-3.75M20.25 6.375c0-2.07-3.694-3.75-8.25-3.75s-8.25 1.68-8.25 3.75M20.25 6.375v11.25C20.25 19.694 16.556 21.375 12 21.375s-8.25-1.68-8.25-3.75V6.375" />
    </svg>
  ),
  patients: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  ),
  confidence: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
};

export default function AIOverviewCards({ summary }) {
  const cards = [
    {
      key: "risk",
      label: "High Risk PHCs",
      value: summary.highRiskPhcCount,
      tone: "red",
    },
    {
      key: "stockout",
      label: "Predicted Medicine Stock-outs",
      value: summary.predictedStockOuts,
      tone: "amber",
    },
    {
      key: "patients",
      label: "Expected Patient Increase",
      value: `+${summary.expectedPatientIncreasePct}%`,
      tone: "blue",
    },
    {
      key: "confidence",
      label: "AI Confidence Score",
      value: `${summary.aiConfidenceScore}%`,
      tone: "emerald",
    },
  ];

  const toneStyles = {
    blue: "border-blue-100 bg-blue-50 text-blue-700",
    emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
    amber: "border-amber-100 bg-amber-50 text-amber-700",
    red: "border-red-100 bg-red-50 text-red-700",
  };

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {cards.map((c) => (
        <div key={c.key} className={`rounded-xl border px-4 py-3 shadow-sm ${toneStyles[c.tone]}`}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium opacity-70">{c.label}</p>
            <span className="opacity-60">{CARD_ICONS[c.key]}</span>
          </div>
          <p className="mt-1 text-xl font-bold">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
