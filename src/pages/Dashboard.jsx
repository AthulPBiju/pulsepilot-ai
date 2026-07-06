// src/pages/Dashboard.jsx
import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import HeroSituationRoom from "../components/dashboard/HeroSituationRoom";
import SummaryCards from "../components/dashboard/SummaryCards";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import CriticalAlerts from "../components/dashboard/CriticalAlerts";
import RecentActivity from "../components/dashboard/RecentActivity";

/**
 * Dashboard
 * Top-level page for the PulsePilot AI District Health Command Center.
 * Composes the sidebar, top navbar, AI situation room hero, KPI summary
 * cards, analytics chart, critical alerts, and recent activity feed.
 */
export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8 space-y-6">
          <HeroSituationRoom />

          <SummaryCards />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
            <div className="xl:col-span-2">
              <AnalyticsChart />
            </div>
            <div>
              <CriticalAlerts />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <RecentActivity />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
