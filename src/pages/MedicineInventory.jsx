// src/pages/MedicineInventory.jsx
//
// Medicine Inventory page for PulsePilot AI.
// Sample data only — no backend or API calls. Follows the existing blue
// healthcare theme used across the rest of the dashboard (blue-50/100/600
// accents, white cards, rounded-xl, subtle shadows).

import { useMemo, useState } from "react";
import SearchBox from "../components/medicine-inventory/SearchBox";
import PHCFilter from "../components/medicine-inventory/PHCFilter";
import LowStockAlerts from "../components/medicine-inventory/LowStockAlerts";
import MedicineStockTable from "../components/medicine-inventory/MedicineStockTable";
import RedistributionSuggestions from "../components/medicine-inventory/RedistributionSuggestions";
import {
  MEDICINES,
  PHC_LIST,
  getRedistributionSuggestions,
} from "../data/medicineInventoryData";

export default function MedicineInventory() {
  const [search, setSearch] = useState("");
  const [selectedPhc, setSelectedPhc] = useState("All PHCs");

  const filteredMedicines = useMemo(() => {
    return MEDICINES.filter((m) => {
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
      const matchesPhc = selectedPhc === "All PHCs" || m.phc === selectedPhc;
      return matchesSearch && matchesPhc;
    });
  }, [search, selectedPhc]);

  const redistributionSuggestions = useMemo(
    () => getRedistributionSuggestions(MEDICINES),
    []
  );

  const summary = useMemo(() => {
    const total = MEDICINES.length;
    const critical = MEDICINES.filter((m) => m.status === "Critical").length;
    const low = MEDICINES.filter((m) => m.status === "Low").length;
    const healthy = total - critical - low;
    return { total, critical, low, healthy };
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-800">Medicine Inventory</h1>
        <p className="text-sm text-slate-500">
          Track stock levels, AI stock-out predictions, and redistribution across PHCs.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <SummaryCard label="Total Medicines" value={summary.total} tone="blue" />
        <SummaryCard label="Healthy" value={summary.healthy} tone="emerald" />
        <SummaryCard label="Low Stock" value={summary.low} tone="amber" />
        <SummaryCard label="Critical" value={summary.critical} tone="red" />
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBox value={search} onChange={setSearch} />
        <PHCFilter value={selectedPhc} onChange={setSelectedPhc} options={PHC_LIST} />
      </div>

      <div className="rounded-lg bg-yellow-100 p-3 text-sm">
        <p>Search: {search}</p>
        <p>Selected PHC: {selectedPhc}</p>
        <p>Filtered Results: {filteredMedicines.length}</p>
      </div>

      {/* Alerts */}
      <LowStockAlerts medicines={filteredMedicines} />

      <p className="text-red-600">
        Search: {search} | PHC: {selectedPhc} | Results: {filteredMedicines.length}
      </p>
      {/* Main table */}
      <MedicineStockTable medicines={filteredMedicines} />

      {/* Redistribution */}
      <RedistributionSuggestions suggestions={redistributionSuggestions} />
    </div>
  );
}

function SummaryCard({ label, value, tone }) {
  const toneStyles = {
    blue: "border-blue-100 bg-blue-50 text-blue-700",
    emerald: "border-emerald-100 bg-emerald-50 text-emerald-700",
    amber: "border-amber-100 bg-amber-50 text-amber-700",
    red: "border-red-100 bg-red-50 text-red-700",
  };

  return (
    <div className={`rounded-xl border px-4 py-3 shadow-sm ${toneStyles[tone]}`}>
      <p className="text-xs font-medium opacity-70">{label}</p>
      <p className="mt-1 text-xl font-bold">{value}</p>
    </div>
  );
}
