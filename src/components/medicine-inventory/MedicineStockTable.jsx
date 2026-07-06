// src/components/medicine-inventory/MedicineStockTable.jsx
//
// Main data table: stock levels, status, and the AI-predicted
// stock-out date for each medicine.

import StatusBadge from "./StatusBadge";

function formatStockOut(stockOut) {
  if (!stockOut) return "—";
  const { date, daysLeft } = stockOut;
  const formatted = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return `${formatted} (${daysLeft}d)`;
}

export default function MedicineStockTable({ medicines }) {
  return (
    <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-50 text-sm">
          <thead className="bg-blue-50/60">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-blue-900">Medicine</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900">PHC</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900">Category</th>
              <th className="px-4 py-3 text-right font-semibold text-blue-900">Current Stock</th>
              <th className="px-4 py-3 text-right font-semibold text-blue-900">Reorder Level</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900">AI Predicted Stock-Out</th>
              <th className="px-4 py-3 text-left font-semibold text-blue-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {medicines.map((m) => (
              <tr key={m.id} className="hover:bg-blue-50/40">
                <td className="px-4 py-3 font-medium text-slate-700">{m.name}</td>
                <td className="px-4 py-3 text-slate-500">{m.phc}</td>
                <td className="px-4 py-3 text-slate-500">{m.category}</td>
                <td className="px-4 py-3 text-right text-slate-600">
                  {m.currentStock.toLocaleString()} {m.unit}
                </td>
                <td className="px-4 py-3 text-right text-slate-400">
                  {m.reorderLevel.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-slate-600">{formatStockOut(m.stockOut)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={m.status} />
                </td>
              </tr>
            ))}

            {medicines.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                  No medicines match your search or filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
