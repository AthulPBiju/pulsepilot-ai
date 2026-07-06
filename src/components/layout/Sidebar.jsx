// src/components/dashboard/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Activity,
  LayoutDashboard,
  MapPinned,
  Pill,
  Stethoscope,
  BedDouble,
  BrainCog,
  BellRing,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "PHCs", path: "/phcs", icon: MapPinned },
  { label: "Medicine Inventory", path: "/medicine-inventory", icon: Pill },
  { label: "Doctors", path: "/doctors", icon: Stethoscope },
  { label: "Beds", path: "/beds", icon: BedDouble },
  { label: "Alerts", path: "/alerts", icon: BellRing, badge: 6 },
  { label: "AI Insights", path: "/ai-insights", icon: BrainCog },
];

/**
 * Sidebar
 * Left-hand primary navigation for the PHC/CHC Command Center.
 * Collapsible on desktop, slide-over on mobile.
 */
export default function Sidebar({ mobileOpen, onCloseMobile }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile scrim */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed z-50 inset-y-0 left-0 flex flex-col
          bg-[#08213F] text-slate-200
          transition-all duration-200 ease-in-out
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          w-72
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        {/* Brand */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/20 ring-1 ring-blue-400/40 shrink-0">
              <Activity className="w-5 h-5 text-blue-300" strokeWidth={2.5} />
            </div>
            {!collapsed && (
              <div className="leading-tight truncate">
                <p className="text-sm font-semibold text-white tracking-tight">
                  PulsePilot AI
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  PHC/CHC Command Center
                </p>
              </div>
            )}
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-md hover:bg-white/10 text-slate-300"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV_ITEMS.map(({ label, icon: Icon, path, badge }) => (
            <NavLink
              key={label}
              to={path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `group w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors relative ${
                  isActive
                    ? "bg-blue-500/15 text-white ring-1 ring-blue-400/30"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
              title={collapsed ? label : undefined}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-blue-400" />
                  )}

                  <Icon
                    className={`w-[18px] h-[18px] shrink-0 ${
                      isActive
                        ? "text-blue-300"
                        : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />

                  {!collapsed && <span>{label}</span>}

                  {!collapsed && badge && (
                    <span className="ml-auto text-[11px] font-semibold bg-red-500 text-white rounded-full px-1.5 py-0.5">
                      {badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-3 shrink-0">
          <button
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
            title={collapsed ? "Settings" : undefined}
          >
            <Settings className="w-[18px] h-[18px] text-slate-400 shrink-0" />
            {!collapsed && <span>Settings</span>}
          </button>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden lg:flex w-full items-center gap-3 rounded-lg px-3 py-2.5 mt-1 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            {collapsed ? (
              <ChevronsRight className="w-[18px] h-[18px] text-slate-400" />
            ) : (
              <>
                <ChevronsLeft className="w-[18px] h-[18px] text-slate-400" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
