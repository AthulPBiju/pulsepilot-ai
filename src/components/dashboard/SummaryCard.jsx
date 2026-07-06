// src/components/dashboard/SummaryCard.jsx
import React from "react";
import { Users, HeartPulse, BedDouble, ShieldAlert, TrendingUp, TrendingDown } from "lucide-react";

const ICONS = { Users, HeartPulse, BedDouble, ShieldAlert };

const ACCENTS = {
  blue: {
    bg: "bg-blue-50",
    ring: "ring-blue-100",
    icon: "text-blue-600",
    chip: "bg-blue-600",
  },
  red: {
    bg: "bg-red-50",
    ring: "ring-red-100",
    icon: "text-red-600",
    chip: "bg-red-600",
  },
  amber: {
    bg: "bg-amber-50",
    ring: "ring-amber-100",
    icon: "text-amber-600",
    chip: "bg-amber-600",
  },
  teal: {
    bg: "bg-teal-50",
    ring: "ring-teal-100",
    icon: "text-teal-600",
    chip: "bg-teal-600",
  },
};

/**
 * SummaryCard
 * Displays a single KPI: label, value, trend delta, and footnote.
 */
export default function SummaryCard({ label, value, delta, trend, icon, accent = "blue", footnote }) {
  const Icon = ICONS[icon] ?? Users;
  const palette = ACCENTS[accent] ?? ACCENTS.blue;
  const isUp = trend === "up";
  const TrendIcon = isUp ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${palette.bg} ring-1 ${palette.ring}`}>
          <Icon className={`w-5 h-5 ${palette.icon}`} strokeWidth={2} />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            isUp ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
          }`}
        >
          <TrendIcon className="w-3.5 h-3.5" />
          {delta}
        </div>
      </div>

      <p className="mt-4 text-2xl font-semibold text-slate-900 tracking-tight">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
      {footnote && <p className="mt-2 text-xs text-slate-400">{footnote}</p>}
    </div>
  );
}
