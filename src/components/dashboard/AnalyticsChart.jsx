// src/components/dashboard/AnalyticsChart.jsx
import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Activity, LineChart as LineChartIcon } from "lucide-react";
import { patientFlowData, diseaseSurveillanceData } from "../../data/dashboardData";

const TABS = [
  { id: "flow", label: "Medicine Stock Trend", icon: Activity },
  { id: "surveillance", label: "Patient Footfall Trend", icon: LineChartIcon },
];

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-lg px-3 py-2 text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-1.5 text-slate-600">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="capitalize">{entry.name}:</span>
          <span className="font-medium text-slate-800">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * AnalyticsChart
 * Toggleable analytics panel: 7-day medicine stock received vs. dispensed
 * (area chart) or PHC/CHC patient footfall trends (line chart).
 */
export default function AnalyticsChart() {
  const [tab, setTab] = useState("flow");

  const content = useMemo(() => {
    if (tab === "flow") {
      return (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={patientFlowData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="admissionsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="dischargesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#14B8A6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F7" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={36} />
            <Tooltip content={<ChartTooltip />} />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: 12, color: "#64748B", paddingTop: 8 }}
            />
            <Area
              type="monotone"
              dataKey="admissions"
              name="Stock Received"
              stroke="#2563EB"
              strokeWidth={2.5}
              fill="url(#admissionsFill)"
            />
            <Area
              type="monotone"
              dataKey="discharges"
              name="Stock Dispensed"
              stroke="#14B8A6"
              strokeWidth={2.5}
              fill="url(#dischargesFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={diseaseSurveillanceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EEF2F7" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#94A3B8" }} axisLine={false} tickLine={false} width={36} />
          <Tooltip content={<ChartTooltip />} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: "#64748B", paddingTop: 8 }} />
          <Line type="monotone" dataKey="dengue" name="OPD Footfall" stroke="#DC2626" strokeWidth={2.5} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="influenza" name="IPD Footfall" stroke="#D97706" strokeWidth={2.5} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="respiratory" name="Referrals" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }, [tab]);

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-800">PHC/CHC Analytics</h2>
          <p className="text-sm text-slate-400">Real-time trends across monitored PHCs & CHCs</p>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 self-start">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
                tab === id ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">{content}</div>
    </section>
  );
}
