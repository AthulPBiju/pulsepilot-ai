// src/components/ai-insights/ConfidenceMeter.jsx
//
// Small reusable bar that shows an AI confidence percentage. Used by
// every prediction/recommendation surface on the AI Insights page so
// confidence is always presented the same way.

const TONE_STYLES = {
  high: { bar: "bg-emerald-500", text: "text-emerald-700" },
  medium: { bar: "bg-amber-500", text: "text-amber-700" },
  low: { bar: "bg-red-500", text: "text-red-700" },
};

function toneFor(confidence) {
  if (confidence >= 85) return "high";
  if (confidence >= 70) return "medium";
  return "low";
}

export default function ConfidenceMeter({ confidence, label = "AI Confidence", size = "md" }) {
  const tone = TONE_STYLES[toneFor(confidence)];
  const height = size === "sm" ? "h-1.5" : "h-2";

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-slate-500">{label}</span>
        <span className={`font-semibold ${tone.text}`}>{confidence}%</span>
      </div>
      <div className={`w-full overflow-hidden rounded-full bg-blue-50 ${height}`}>
        <div
          className={`${height} rounded-full ${tone.bar} transition-all`}
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  );
}
