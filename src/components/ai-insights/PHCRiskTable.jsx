// src/components/ai-insights/PHCRiskTable.jsx
//
// Table of underperforming / at-risk PHCs with reason, confidence, and
// suggested action. Styled to match MedicineStockTable from the
// Medicine Inventory page.

const RISK_STYLES = {
  Critical: "bg-red-50 text-red-700 ring-1 ring-red-200",
  Moderate: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Low: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
};

function RiskBadge({ level }) {
  const style = RISK_STYLES[level] || "bg-slate-100 text-slate-600 ring-1 ring-slate-200";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>
      {level}
    </span>
  );
}

export default function PHCRiskTable({ phcs }) {
  return (
    <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
      <div className="border-b border-blue-50 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">Underperforming PHCs</h3>
        <p className="text-xs text-slate-400">Ranked by AI-assessed risk level</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-50 text-sm">
          <thead className="bg-blue-50/60">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-blue-900">PHC Name</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900">Risk Level</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900">Reason</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900">AI Confidence</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900">Suggested Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {phcs.map((p) => (
              <tr key={p.phc} className="hover:bg-blue-50/40">
                <td className="px-4 py-3 font-medium text-slate-700">{p.phc}</td>
                <td className="px-4 py-3">
                  <RiskBadge level={p.riskLevel} />
                </td>
                <td className="px-4 py-3 max-w-xs text-slate-500">{p.reason}</td>
                <td className="px-4 py-3 text-slate-600">{p.confidence}%</td>
                <td className="px-4 py-3 text-slate-500">{p.suggestedAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
