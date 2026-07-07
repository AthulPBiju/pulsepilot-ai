// src/components/ai-insights/ConfidenceMeter.jsx
//
// Small reusable bar that shows an AI confidence percentage. Used by
// every prediction/recommendation surface on the AI Insights page so
// confidence is always presented the same way. Bar width animates on
// mount/update, and a High/Medium/Low label sits next to the percentage.

const TONE_STYLES = {
  high: { bar: "bg-emerald-500", text: "text-emerald-700", chip: "bg-emerald-50 text-emerald-700" },
  medium: { bar: "bg-amber-500", text: "text-amber-700", chip: "bg-amber-50 text-amber-700" },
  low: { bar: "bg-red-500", text: "text-red-700", chip: "bg-red-50 text-red-700" },
};

const TONE_LABEL = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

function toneFor(confidence) {
  if (confidence >= 85) return "high";
  if (confidence >= 70) return "medium";
  return "low";
}

export default function ConfidenceMeter({ confidence, label = "AI Confidence", size = "md" }) {
  const tone = toneFor(confidence);
  const styles = TONE_STYLES[tone];
  const height = size === "sm" ? "h-1.5" : "h-2";

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between gap-2 text-xs">
        <span className="text-slate-500">{label}</span>
        <span className="flex items-center gap-1.5">
          <span className={`font-semibold ${styles.text}`}>{confidence}%</span>
          <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${styles.chip}`}>
            {TONE_LABEL[tone]}
          </span>
        </span>
      </div>
      <div className={`w-full overflow-hidden rounded-full bg-blue-50 ${height}`}>
        <div
          className={`${height} rounded-full ${styles.bar} transition-all duration-700 ease-out`}
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  );
}
