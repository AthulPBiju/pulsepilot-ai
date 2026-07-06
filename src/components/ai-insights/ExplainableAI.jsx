// src/components/ai-insights/ExplainableAI.jsx
//
// Explainable AI panel: expands on each ResourceRecommendations entry
// with a plain-language "why" explanation, so PHC staff can see the
// reasoning behind every suggested action rather than a bare directive.

import { useState } from "react";
import ConfidenceMeter from "./ConfidenceMeter";

export default function ExplainableAI({ recommendations }) {
  const [openId, setOpenId] = useState(recommendations[0]?.id ?? null);

  return (
    <div className="rounded-xl border border-blue-100 bg-white shadow-sm">
      <div className="border-b border-blue-50 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">Explainable AI</h3>
        <p className="text-xs text-slate-400">Why each recommendation was generated</p>
      </div>

      <ul className="divide-y divide-blue-50">
        {recommendations.map((r) => {
          const isOpen = openId === r.id;
          return (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : r.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-blue-50/40"
              >
                <span className="text-sm font-medium text-slate-700">{r.title}</span>
                <svg
                  className={`h-4 w-4 shrink-0 text-blue-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
