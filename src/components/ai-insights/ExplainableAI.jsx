// src/components/ai-insights/ExplainableAI.jsx
//
// Explainable AI panel. Leads with a "Why did AI make these
// predictions?" summary of the general factors behind the model's
// output, then expands on each ResourceRecommendations entry with a
// plain-language "why" explanation so PHC staff can see the reasoning
// behind every suggested action rather than a bare directive.

import { useState } from "react";
import ConfidenceMeter from "./ConfidenceMeter";

export default function ExplainableAI({ recommendations, factors }) {
  const [openId, setOpenId] = useState(recommendations[0]?.id ?? null);

  return (
    <div className="rounded-xl border border-blue-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="border-b border-blue-50 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">Why did AI make these predictions?</h3>
        <p className="text-xs text-slate-400">Key factors driving today's predictions</p>
      </div>

      {factors && factors.length > 0 && (
        <div className="grid grid-cols-1 gap-2 border-b border-blue-50 p-4 sm:grid-cols-2">
          {factors.map((factor) => (
            <div
              key={factor}
              className="flex items-center gap-2 rounded-lg bg-blue-50/50 px-3 py-2 text-sm text-slate-600
                         transition-colors duration-150 hover:bg-blue-50"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </span>
              {factor}
            </div>
          ))}
        </div>
      )}

      <div className="border-b border-blue-50 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          Per-Recommendation Reasoning
        </p>
      </div>

      <ul className="divide-y divide-blue-50">
        {recommendations.map((r) => {
          const isOpen = openId === r.id;
          return (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : r.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left
                           transition-colors duration-150 hover:bg-blue-50/40"
              >
                <span className="text-sm font-medium text-slate-700">{r.title}</span>
                <svg
                  className={`h-4 w-4 shrink-0 text-blue-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {isOpen && (
                <div className="space-y-3 bg-blue-50/40 px-4 pb-4 pt-1">
                  <p className="text-sm leading-relaxed text-slate-600">{r.explanation}</p>
                  <div className="max-w-xs">
                    <ConfidenceMeter confidence={r.confidence} size="sm" label="Confidence in this reasoning" />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
