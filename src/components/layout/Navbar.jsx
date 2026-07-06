// src/components/dashboard/Navbar.jsx
import React, { useState } from "react";
import { Search, Bell, ChevronDown, Menu, Wifi } from "lucide-react";
import { districts } from "../../data/dashboardData";

/**
 * Navbar
 * Top bar with global search, district selector, live status, notifications, and user menu.
 */
export default function Navbar({ onOpenMobileMenu }) {
  const [district, setDistrict] = useState(districts[0]);
  const [districtOpen, setDistrictOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 shrink-0 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="h-full flex items-center gap-3 px-4 lg:px-6">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 -ml-2 rounded-md text-slate-600 hover:bg-slate-100"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients, districts, reports..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50
                       focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                       placeholder:text-slate-400 text-slate-700"
          />
        </div>

        <div className="flex-1" />

        {/* Live status */}
        <div className="hidden md:flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5">
          <Wifi className="w-3.5 h-3.5" />
          <span>Live</span>
        </div>

        {/* District selector */}
        <div className="relative">
          <button
            onClick={() => setDistrictOpen((o) => !o)}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg px-3 py-2 hover:bg-slate-50"
          >
            <span className="hidden sm:inline">{district}</span>
            <span className="sm:hidden">District</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          {districtOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-40">
              {districts.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setDistrict(d);
                    setDistrictOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 ${
                    d === district ? "text-blue-700 font-medium" : "text-slate-600"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* User */}
        <button className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-100">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
            SC
          </div>
          <div className="hidden lg:block text-left leading-tight">
            <p className="text-sm font-medium text-slate-800">Dr. Sarah Chen</p>
            <p className="text-[11px] text-slate-400">District Coordinator</p>
          </div>
        </button>
      </div>
    </header>
  );
}
