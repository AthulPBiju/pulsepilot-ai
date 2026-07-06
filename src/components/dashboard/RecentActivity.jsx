// src/components/dashboard/RecentActivity.jsx
import React from "react";
import { BrainCog, UserRound, ClipboardList, Cpu } from "lucide-react";
import { recentActivity } from "../../data/dashboardData";

const TYPE_STYLES = {
  ai: { icon: BrainCog, bg: "bg-teal-50", ring: "ring-teal-100", color: "text-teal-600" },
  user: { icon: UserRound, bg: "bg-blue-50", ring: "ring-blue-100", color: "text-blue-600" },
  field: { icon: ClipboardList, bg: "bg-amber-50", ring: "ring-amber-100", color: "text-amber-600" },
  system: { icon: Cpu, bg: "bg-slate-100", ring: "ring-slate-200", color: "text-slate-500" },
};

/**
 * RecentActivity
 * Chronological feed of AI actions, clinician decisions, field reports, and
 * system events across the district network.
 */
export default function RecentActivity() {
  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 lg:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-800">Recent Activity</h2>
        <button className="text-xs font-medium text-blue-600 hover:text-blue-700">View log</button>
      </div>

      <ol className="mt-4 relative flex-1 overflow-y-auto">
        {recentActivity.map((item, idx) => {
          const s = TYPE_STYLES[item.type] ?? TYPE_STYLES.system;
          const Icon = s.icon;
          const isLast = idx === recentActivity.length - 1;
          return (
            <li key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
              {!isLast && (
                <span className="absolute left-4 top-8 bottom-0 w-px bg-slate-100" aria-hidden="true" />
              )}
              <div
                className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${s.bg} ring-1 ${s.ring} shrink-0`}
              >
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className="min-w-0 pt-0.5">
                <p className="text-sm text-slate-700 leading-snug">
                  <span className="font-medium text-slate-900">{item.actor}</span>{" "}
                  {item.action}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {item.context} · {item.time}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
