// src/components/ai-insights/AISituationSummary.jsx
//
// Premium hero card summarizing the current AI situation at a glance,
// shown at the top of the AI Insights page. Visually matches the
// gradient hero treatment used on the Dashboard, translated into the
// page's existing blue healthcare palette — no new colors introduced.

export default function AISituationSummary({ summary }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-br
                 from-blue-600 via-blue-600 to-blue-800 p-6 shadow-md transition-shadow
                 duration-300 hover:shadow-lg sm:p-8"
    >
      {/* Decorative background accent, purely visual */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/5" />
      <div className="pointer-events-none absolute -bottom-16 right-24 h-40 w-40 rounded-full bg-white/5" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
              </svg>
            </span>
            <h2 className="text-lg font-semibold text-white">AI Situation Summary</h2>
          </div>

          <p className="mb-3 text-sm font-medium text-blue-50">{summary.headline}</p>

          <ul className="space-y-2">
            {summary.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-blue-50">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-200" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex shrink-0 flex-col items-start gap-1 rounded-lg bg-white/10 px-4 py-3
                     backdrop-blur-sm sm:items-end"
        >
          <span className="text-xs font-medium uppercase tracking-wide text-blue-100">
            Prediction Confidence
          </span>
          <span className="text-3xl font-bold text-white">{summary.confidence}%</span>
        </div>
      </div>
    </div>
  );
}
