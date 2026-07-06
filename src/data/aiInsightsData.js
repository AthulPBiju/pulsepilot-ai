// src/data/aiInsightsData.js
//
// Sample data only. No API calls, no backend, no database — everything
// here is static so the AI Insights page can run entirely client-side,
// consistent with the Medicine Inventory page's data pattern.

// --- PHC list (kept consistent with Medicine Inventory's PHCs) -------

export const PHC_NAMES = [
  "PHC Chalakudy",
  "PHC Irinjalakuda",
  "PHC Kodungallur",
  "PHC Mala",
  "PHC Wadakkanchery",
];

// --- 1. Overview summary ----------------------------------------------

export const OVERVIEW_SUMMARY = {
  highRiskPhcCount: 2,
  predictedStockOuts: 5,
  expectedPatientIncreasePct: 18,
  aiConfidenceScore: 87,
};

// --- 2. Medicine stock-out predictions --------------------------------
// horizon: "3d" | "7d" | "14d" — the window within which the medicine is
// predicted to run out at the given PHC.

export const MEDICINE_STOCKOUT_PREDICTIONS = [
  { id: "MSP-001", medicine: "Amoxicillin 250mg", phc: "PHC Chalakudy", horizon: "3d", confidence: 92 },
  { id: "MSP-002", medicine: "Insulin (Regular)", phc: "PHC Kodungallur", horizon: "3d", confidence: 88 },
  { id: "MSP-003", medicine: "ORS Sachets", phc: "PHC Irinjalakuda", horizon: "7d", confidence: 81 },
  { id: "MSP-004", medicine: "Paracetamol 500mg", phc: "PHC Wadakkanchery", horizon: "7d", confidence: 78 },
  { id: "MSP-005", medicine: "BCG Vaccine", phc: "PHC Kodungallur", horizon: "14d", confidence: 74 },
];

export const STOCKOUT_HORIZONS = [
  { key: "3d", label: "Within 3 Days" },
  { key: "7d", label: "Within 7 Days" },
  { key: "14d", label: "Within 14 Days" },
];

// --- 3. Patient footfall forecast (next 7 days) -----------------------

function nextDays(n) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });
}

const FORECAST_BASE = [420, 455, 500, 470, 540, 610, 585];

export const PATIENT_FOOTFALL_FORECAST = nextDays(7).map((date, i) => ({
  date,
  label: date.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short" }),
  predictedPatients: FORECAST_BASE[i],
  confidence: 90 - i * 2,
}));

// --- 4. Doctor attendance prediction -----------------------------------

export const DOCTOR_ATTENDANCE_PREDICTION = [
  { phc: "PHC Chalakudy", expectedAttendancePct: 94, confidence: 89 },
  { phc: "PHC Irinjalakuda", expectedAttendancePct: 88, confidence: 85 },
  { phc: "PHC Kodungallur", expectedAttendancePct: 71, confidence: 83 },
  { phc: "PHC Mala", expectedAttendancePct: 90, confidence: 87 },
  { phc: "PHC Wadakkanchery", expectedAttendancePct: 65, confidence: 80 },
];

// --- 5. Underperforming / at-risk PHCs ---------------------------------

export const PHC_RISK_TABLE = [
  {
    phc: "PHC Kodungallur",
    riskLevel: "Critical",
    reason: "Low doctor attendance combined with rising insulin & vaccine consumption",
    confidence: 91,
    suggestedAction: "Deploy standby doctor and expedite insulin resupply",
  },
  {
    phc: "PHC Wadakkanchery",
    riskLevel: "Critical",
    reason: "Doctor attendance forecast below 70% alongside a Paracetamol stock-out within 7 days",
    confidence: 84,
    suggestedAction: "Reassign one doctor from a surplus PHC and pre-position stock",
  },
  {
    phc: "PHC Irinjalakuda",
    riskLevel: "Moderate",
    reason: "ORS consumption trending 22% above the seasonal average",
    confidence: 78,
    suggestedAction: "Increase next resupply order by 25%",
  },
  {
    phc: "PHC Chalakudy",
    riskLevel: "Low",
    reason: "Amoxicillin nearing reorder threshold, all other indicators stable",
    confidence: 86,
    suggestedAction: "Schedule routine resupply within the week",
  },
  {
    phc: "PHC Mala",
    riskLevel: "Low",
    reason: "All indicators within normal range",
    confidence: 90,
    suggestedAction: "No action needed — continue monitoring",
  },
];

// --- 6. Resource redistribution recommendations ------------------------
// Each recommendation carries its own explanation, used by both
// ResourceRecommendations (compact view) and ExplainableAI (detail view).

export const RESOURCE_RECOMMENDATIONS = [
  {
    id: "REC-001",
    type: "medicine",
    title: "Move Paracetamol from PHC Chalakudy to PHC Wadakkanchery",
    fromPhc: "PHC Chalakudy",
    toPhc: "PHC Wadakkanchery",
    quantity: "1,200 tablets",
    confidence: 88,
    explanation:
      "Because Paracetamol consumption at PHC Wadakkanchery increased by 41% over the previous week while its inventory dropped below the reorder threshold, and PHC Chalakudy is holding surplus stock well above its own reorder level.",
  },
  {
    id: "REC-002",
    type: "doctor",
    title: "Move one doctor from PHC Mala to PHC Kodungallur",
    fromPhc: "PHC Mala",
    toPhc: "PHC Kodungallur",
    quantity: "1 doctor",
    confidence: 82,
    explanation:
      "Because PHC Kodungallur's predicted doctor attendance has fallen to 71% against a forecasted patient footfall increase of 18%, while PHC Mala is forecast to run at 90% attendance with lower footfall growth.",
  },
  {
    id: "REC-003",
    type: "beds",
    title: "Increase bed capacity at PHC Kodungallur",
    fromPhc: null,
    toPhc: "PHC Kodungallur",
    quantity: "+6 beds",
    confidence: 76,
    explanation:
      "Because patient footfall at PHC Kodungallur is forecast to grow faster than the network average over the next 7 days, and current bed occupancy is already trending above 85% on peak days.",
  },
  {
    id: "REC-004",
    type: "medicine",
    title: "Move Insulin from PHC Mala to PHC Kodungallur",
    fromPhc: "PHC Mala",
    toPhc: "PHC Kodungallur",
    quantity: "20 vials",
    confidence: 85,
    explanation:
      "Because PHC Kodungallur's insulin stock is predicted to run out within 3 days at current usage, while nearby PHC Mala's diabetic caseload and insulin usage remain stable with spare stock available.",
  },
];

// --- Shared helpers ------------------------------------------------------

export const RISK_LEVEL_ORDER = { Critical: 0, Moderate: 1, Low: 2 };

export function confidenceTone(confidence) {
  if (confidence >= 85) return "high";
  if (confidence >= 70) return "medium";
  return "low";
}
