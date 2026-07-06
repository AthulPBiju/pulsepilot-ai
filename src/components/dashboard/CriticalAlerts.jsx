// src/components/dashboard/CriticalAlerts.jsx
import React from "react";
import { AlertTriangle, MapPin, ChevronRight } from "lucide-react";
import { criticalAlerts } from "../../data/dashboardData";

const SEVERITY_STYLES = {
  critical: {
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-700 ring-1 ring-red-100",
    label: "Critical",
  },
  high: {
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
    label: "High",
  },
  medium: {
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700 ring-1 ring-blue-100",
    label: "Medium",
  },
};

/**
 * CriticalAlerts
 * Ranked feed of AI-detected health and operations alerts requiring attention.
 */
export default function CriticalAlerts() {
  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 lg:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4.5 h-4.5 text-red-500" />
          <h2 className="text-base font-semibold text-slate-800">Critical Alerts</h2>
        </div>
        <button className="text-xs font-medium text-blue-600 hover:text-blue-700">View all</button>
      </div>

      <ul className="mt-3 space-y-2 overflow-y-auto flex-1">
        {criticalAlerts.map((alert) => {
          const s = SEVERITY_STYLES[alert.severity] ?? SEVERITY_STYLES.medium;
          return (
            <li
              key={alert.id}
              className="group flex items-start gap-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50/60 p-3 transition-colors cursor-pointer"
            >
              <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-800 truncate">{alert.title}</p>
                  <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.badge}`}>
                    {s.label}
                  </span>
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="w-3 h-3" />
                  {alert.location}
                </p>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">{alert.detail}</p>
                <p className="mt-1 text-[11px] text-slate-400">{alert.time}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-400 shrink-0 mt-1" />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
