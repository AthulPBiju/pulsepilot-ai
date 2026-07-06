// src/data/dashboardData.js
// Static sample data for the PulsePilot AI PHC/CHC Command Center dashboard.
// Built for Code for Communities Challenge 3: AI-powered management of
// Primary Health Centres (PHCs) and Community Health Centres (CHCs).
// Replace with live data from your backend/API layer when available.

export const summaryCards = [
  {
    id: "total-phcs",
    label: "Total PHCs & CHCs",
    value: "186",
    delta: "+2.1%",
    trend: "up",
    icon: "Users",
    accent: "blue",
    footnote: "across 6 blocks",
  },
  {
    id: "medicine-stock",
    label: "Medicine Stock Health",
    value: "81%",
    delta: "-2.4%",
    trend: "down",
    icon: "HeartPulse",
    accent: "red",
    footnote: "22 centers below threshold",
  },
  {
    id: "doctors-available",
    label: "Doctors Available",
    value: "312",
    delta: "+1.5%",
    trend: "up",
    icon: "BedDouble",
    accent: "amber",
    footnote: "of 356 sanctioned posts",
  },
  {
    id: "bed-occupancy",
    label: "Bed Occupancy",
    value: "68%",
    delta: "+5.3%",
    trend: "up",
    icon: "ShieldAlert",
    accent: "teal",
    footnote: "1,204 of 1,770 beds",
  },
];

// 7-day medicine stock trend across PHCs/CHCs (units in stock vs. consumed)
export const patientFlowData = [
  { day: "Mon", admissions: 312, discharges: 268, aiFlagged: 18 },
  { day: "Tue", admissions: 298, discharges: 301, aiFlagged: 22 },
  { day: "Wed", admissions: 345, discharges: 289, aiFlagged: 27 },
  { day: "Thu", admissions: 389, discharges: 320, aiFlagged: 31 },
  { day: "Fri", admissions: 412, discharges: 356, aiFlagged: 29 },
  { day: "Sat", admissions: 276, discharges: 298, aiFlagged: 15 },
  { day: "Sun", admissions: 254, discharges: 241, aiFlagged: 12 },
];

// Patient footfall trend across PHCs/CHCs over the last 7 days
export const diseaseSurveillanceData = [
  { day: "Mon", dengue: 12, influenza: 45, respiratory: 60 },
  { day: "Tue", dengue: 15, influenza: 52, respiratory: 58 },
  { day: "Wed", dengue: 19, influenza: 49, respiratory: 63 },
  { day: "Thu", dengue: 24, influenza: 58, respiratory: 71 },
  { day: "Fri", dengue: 31, influenza: 61, respiratory: 68 },
  { day: "Sat", dengue: 28, influenza: 47, respiratory: 55 },
  { day: "Sun", dengue: 22, influenza: 40, respiratory: 49 },
];

export const criticalAlerts = [
  {
    id: "al-1",
    severity: "critical",
    title: "Medicine shortage predicted",
    location: "Zone 4 PHC · Riverside Block",
    detail: "AI forecast shows essential antibiotics stock will run out within 4 days.",
    time: "8 min ago",
  },
  {
    id: "al-2",
    severity: "critical",
    title: "Bed shortage imminent",
    location: "City General CHC",
    detail: "Bed occupancy at 96%. Overflow protocol recommended within 2 hours.",
    time: "23 min ago",
  },
  {
    id: "al-3",
    severity: "high",
    title: "Doctor absence detected",
    location: "PHC Cohort A12 · Rural Circle",
    detail: "3 scheduled doctors marked absent, leaving 14 patient slots uncovered.",
    time: "41 min ago",
  },
  {
    id: "al-4",
    severity: "high",
    title: "Cold chain deviation",
    location: "Vaccine Storage · Northside PHC",
    detail: "Temperature logs show a 6-minute breach outside safe range.",
    time: "1 hr ago",
  },
  {
    id: "al-5",
    severity: "medium",
    title: "Staffing gap predicted",
    location: "Rural CHC 12 · Hillview",
    detail: "AI forecast shows a nursing shortfall for the next 48 hours.",
    time: "2 hr ago",
  },
];

export const recentActivity = [
  {
    id: "ac-1",
    actor: "PulsePilot AI",
    action: "flagged 3 PHCs at risk of medicine stock-out for review",
    context: "Model confidence 92%",
    time: "5 min ago",
    type: "ai",
  },
  {
    id: "ac-2",
    actor: "Dr. Sarah Chen",
    action: "approved emergency medicine restock request",
    context: "Zone 4 PHC · Riverside Block",
    time: "18 min ago",
    type: "user",
  },
  {
    id: "ac-3",
    actor: "PulsePilot AI",
    action: "recommended redistributing surplus beds to City General CHC",
    context: "City General CHC",
    time: "34 min ago",
    type: "ai",
  },
  {
    id: "ac-4",
    actor: "Field Health Worker · R. Patel",
    action: "submitted a PHC infrastructure update from Rural CHC 12",
    context: "48 households surveyed",
    time: "1 hr ago",
    type: "field",
  },
  {
    id: "ac-5",
    actor: "System",
    action: "completed nightly sync of medicine inventory across 186 centers",
    context: "No anomalies detected",
    time: "3 hr ago",
    type: "system",
  },
  {
    id: "ac-6",
    actor: "Dr. Amir Khan",
    action: "escalated doctor shortage alert to block coordinator",
    context: "Rural CHC 12 · Hillview",
    time: "4 hr ago",
    type: "user",
  },
];

export const districts = [
  "All PHCs/CHCs",
  "Riverside Block",
  "City Central",
  "Northside",
  "Hillview Rural",
  "Lakeside",
];

export const aiSituationSummary = {
  status: "All Systems Operational",
  lastSync: "2 minutes ago",
  headline:
    "AI monitoring predicts medicine stock-outs at 22 PHCs and a doctor shortage in Hillview Rural, and recommends redistributing beds and staff across 3 nearby CHCs over the next 72 hours.",
  metrics: [
    { label: "PHCs/CHCs Monitored", value: "186" },
    { label: "Live Data Streams", value: "482" },
    { label: "Prediction Accuracy", value: "94.6%" },
  ],
};
