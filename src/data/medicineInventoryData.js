// src/data/medicineInventoryData.js
//
// Sample data only. No API calls, no backend — everything here is static
// and computed on the client so the Medicine Inventory page can be dropped
// into PulsePilot AI without any server changes.

export const PHC_LIST = [
  "All PHCs",
  "PHC Chalakudy",
  "PHC Irinjalakuda",
  "PHC Kodungallur",
  "PHC Mala",
  "PHC Wadakkanchery",
];

// Raw stock records. avgDailyUsage is used to derive both the status
// badge and the AI-predicted stock-out date.
const RAW_MEDICINES = [
  { id: "MED-001", name: "Paracetamol 500mg", category: "Analgesic", phc: "PHC Chalakudy", currentStock: 4200, unit: "tablets", reorderLevel: 1500, criticalLevel: 600, avgDailyUsage: 90 },
  { id: "MED-002", name: "Amoxicillin 250mg", category: "Antibiotic", phc: "PHC Chalakudy", currentStock: 320, unit: "capsules", reorderLevel: 500, criticalLevel: 200, avgDailyUsage: 40 },
  { id: "MED-003", name: "ORS Sachets", category: "Rehydration", phc: "PHC Irinjalakuda", currentStock: 150, unit: "sachets", reorderLevel: 400, criticalLevel: 150, avgDailyUsage: 35 },
  { id: "MED-004", name: "Metformin 500mg", category: "Antidiabetic", phc: "PHC Irinjalakuda", currentStock: 2600, unit: "tablets", reorderLevel: 800, criticalLevel: 300, avgDailyUsage: 55 },
  { id: "MED-005", name: "Insulin (Regular)", category: "Antidiabetic", phc: "PHC Kodungallur", currentStock: 60, unit: "vials", reorderLevel: 80, criticalLevel: 30, avgDailyUsage: 4 },
  { id: "MED-006", name: "Cough Syrup", category: "Respiratory", phc: "PHC Kodungallur", currentStock: 1100, unit: "bottles", reorderLevel: 300, criticalLevel: 100, avgDailyUsage: 18 },
  { id: "MED-007", name: "Iron & Folic Acid", category: "Supplement", phc: "PHC Mala", currentStock: 900, unit: "tablets", reorderLevel: 600, criticalLevel: 250, avgDailyUsage: 30 },
  { id: "MED-008", name: "Amoxicillin 250mg", category: "Antibiotic", phc: "PHC Mala", currentStock: 1800, unit: "capsules", reorderLevel: 500, criticalLevel: 200, avgDailyUsage: 25 },
  { id: "MED-009", name: "ORS Sachets", category: "Rehydration", phc: "PHC Wadakkanchery", currentStock: 2200, unit: "sachets", reorderLevel: 400, criticalLevel: 150, avgDailyUsage: 20 },
  { id: "MED-010", name: "Paracetamol 500mg", category: "Analgesic", phc: "PHC Wadakkanchery", currentStock: 380, unit: "tablets", reorderLevel: 1200, criticalLevel: 500, avgDailyUsage: 70 },
  { id: "MED-011", name: "BCG Vaccine", category: "Vaccine", phc: "PHC Kodungallur", currentStock: 45, unit: "doses", reorderLevel: 60, criticalLevel: 25, avgDailyUsage: 3 },
  { id: "MED-012", name: "Metformin 500mg", category: "Antidiabetic", phc: "PHC Chalakudy", currentStock: 150, unit: "tablets", reorderLevel: 700, criticalLevel: 250, avgDailyUsage: 45 },
];

// --- Derived helpers -------------------------------------------------

/**
 * Healthy / Low / Critical, based on current stock vs. the reorder and
 * critical thresholds configured for each medicine.
 */
export function getStockStatus(medicine) {
  if (medicine.currentStock <= medicine.criticalLevel) return "Critical";
  if (medicine.currentStock <= medicine.reorderLevel) return "Low";
  return "Healthy";
}

/**
 * Simple linear projection: currentStock / avgDailyUsage = days of cover
 * left. Framed as an "AI-predicted" date since PulsePilot presents this
 * projection to PHC staff as a forecast, but the model here is a
 * transparent placeholder for sample data purposes.
 */
export function getPredictedStockOutDate(medicine) {
  if (medicine.avgDailyUsage <= 0) return null;
  const daysLeft = Math.floor(medicine.currentStock / medicine.avgDailyUsage);
  const date = new Date();
  date.setDate(date.getDate() + daysLeft);
  return { date, daysLeft };
}

export const MEDICINES = RAW_MEDICINES.map((m) => ({
  ...m,
  status: getStockStatus(m),
  stockOut: getPredictedStockOutDate(m),
}));

/**
 * Pairs medicines of the same name where one PHC is sitting on a surplus
 * (Healthy, well above reorder level) while another PHC is Low/Critical.
 * Suggests moving a share of the surplus to close the gap.
 */
export function getRedistributionSuggestions(medicines = MEDICINES) {
  const byName = medicines.reduce((acc, m) => {
    acc[m.name] = acc[m.name] || [];
    acc[m.name].push(m);
    return acc;
  }, {});

  const suggestions = [];

  Object.entries(byName).forEach(([name, records]) => {
    const surplusSites = records.filter(
      (m) => m.status === "Healthy" && m.currentStock > m.reorderLevel * 1.5
    );
    const needySites = records.filter((m) => m.status !== "Healthy");

    needySites.forEach((needy) => {
      const donor = surplusSites.find((s) => s.phc !== needy.phc);
      if (!donor) return;

      const gap = needy.reorderLevel - needy.currentStock;
      const donorSpare = donor.currentStock - donor.reorderLevel;
      const transferQty = Math.max(0, Math.min(gap, Math.floor(donorSpare * 0.4)));

      if (transferQty > 0) {
        suggestions.push({
          id: `${donor.id}->${needy.id}`,
          medicine: name,
          unit: needy.unit,
          fromPhc: donor.phc,
          toPhc: needy.phc,
          quantity: transferQty,
          reason:
            needy.status === "Critical"
              ? "Critical shortage — recommended immediate transfer"
              : "Low stock — recommended proactive transfer",
        });
      }
    });
  });

  return suggestions;
}
