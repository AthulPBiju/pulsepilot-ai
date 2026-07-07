// src/pages/AIInsights.jsx
//
// AI Insights page for PulsePilot AI — built for the Code for Communities
// Challenge 3 (AI-powered management of PHCs and CHCs).
// Sample data only — no backend, no APIs, no auth, no database.
// Follows the same component architecture and blue healthcare theme as
// the Medicine Inventory page. Routing is intentionally not included;
// wire this page into the existing router/sidebar as needed.

import AISituationSummary from "../components/ai-insights/AISituationSummary";
import AIOverviewCards from "../components/ai-insights/AIOverviewCards";
import MedicinePrediction from "../components/ai-insights/MedicinePrediction";
import DemandForecast from "../components/ai-insights/DemandForecast";
import DoctorAttendancePrediction from "../components/ai-insights/DoctorAttendancePrediction";
import PHCRiskTable from "../components/ai-insights/PHCRiskTable";
import ResourceRecommendations from "../components/ai-insights/ResourceRecommendations";
import ExplainableAI from "../components/ai-insights/ExplainableAI";
import ModelInfoFooter from "../components/ai-insights/ModelInfoFooter";

import {
  SITUATION_SUMMARY,
  OVERVIEW_SUMMARY,
  MEDICINE_STOCKOUT_PREDICTIONS,
  STOCKOUT_HORIZONS,
  PATIENT_FOOTFALL_FORECAST,
  DOCTOR_ATTENDANCE_PREDICTION,
  PHC_RISK_TABLE,
  RESOURCE_RECOMMENDATIONS,
  EXPLAINABILITY_FACTORS,
  MODEL_INFO,
  RISK_LEVEL_ORDER,
} from "../data/aiInsightsData";

export default function AIInsights() {
  const sortedRiskTable = [...PHC_RISK_TABLE].sort(
    (a, b) => RISK_LEVEL_ORDER[a.riskLevel] - RISK_LEVEL_ORDER[b.riskLevel]
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-800">AI Insights</h1>
        <p className="text-sm text-slate-500">
          Predictive insights and redistribution recommendations across PHCs and CHCs.
        </p>
      </div>

      {/* 0. AI situation summary hero */}
      <AISituationSummary summary={SITUATION_SUMMARY} />

      {/* 1. Overview cards */}
      <AIOverviewCards summary={OVERVIEW_SUMMARY} />

      {/* 2. Medicine stock-out prediction */}
      <MedicinePrediction predictions={MEDICINE_STOCKOUT_PREDICTIONS} horizons={STOCKOUT_HORIZONS} />

      {/* 3 & 4. Forecast + attendance side by side on larger screens */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DemandForecast forecast={PATIENT_FOOTFALL_FORECAST} />
        <DoctorAttendancePrediction predictions={DOCTOR_ATTENDANCE_PREDICTION} />
      </div>

      {/* 5. Underperforming PHCs */}
      <PHCRiskTable phcs={sortedRiskTable} />

      {/* 6 & 7. Top recommendations + explainability side by side on larger screens */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ResourceRecommendations recommendations={RESOURCE_RECOMMENDATIONS} />
        <ExplainableAI recommendations={RESOURCE_RECOMMENDATIONS} factors={EXPLAINABILITY_FACTORS} />
      </div>

      {/* 8. Model information footer */}
      <ModelInfoFooter info={MODEL_INFO} />
    </div>
  );
}
