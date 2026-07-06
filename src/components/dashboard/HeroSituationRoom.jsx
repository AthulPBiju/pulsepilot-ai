// src/components/dashboard/HeroSituationRoom.jsx
import React from "react";
import { Sparkles, CircleDot, ArrowRight } from "lucide-react";
import { aiSituationSummary } from "../../data/dashboardData";

/**
 * HeroSituationRoom
 * The dashboard's thesis statement: a live, AI-narrated summary of district
 * health status. The animated pulse line is the page's signature element,
 * echoing the "Pulse" in PulsePilot AI.
 */
export default function HeroSituationRoom() {
  const { status, lastSync, headline, metrics } = aiSituationSummary;

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B2E58] via-[#0E3F72] to-[#0B5FA5] text-white">
      {/* Ambient pulse line motif */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full h-24 opacity-40"
        viewBox="0 0 800 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 L120,60 L145,20 L170,90 L195,45 L220,60 L340,60 L365,15 L390,95 L415,60 L800,60"
          fill="none"
          stroke="url(#pulseGradient)"
          strokeWidth="2.5"
          className="pulse-path"
        />
        <defs>
          <linearGradient id="pulseGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
            <stop offset="50%" stopColor="#7DD3FC" stopOpacity="1" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-medium text-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              AI Situation Room
              <span className="w-1 h-1 rounded-full bg-blue-200/60" />
              Synced {lastSync}
            </div>

            <h1 className="mt-4 text-xl sm:text-2xl lg:text-[26px] font-semibold tracking-tight leading-snug">
              {headline}
            </h1>

            <div className="mt-5 flex items-center gap-2 text-sm text-emerald-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="font-medium">{status}</span>
            </div>

            <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white text-[#0B2E58] text-sm font-semibold px-4 py-2.5 hover:bg-blue-50 transition-colors">
              Ask PulsePilot AI
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Live metrics */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full lg:w-auto lg:min-w-[280px]">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl bg-white/8 border border-white/15 backdrop-blur-sm px-3 py-3 sm:px-4 sm:py-4 text-center lg:text-left"
              >
                <p className="text-[11px] uppercase tracking-wide text-blue-200/80 flex items-center gap-1 justify-center lg:justify-start">
                  <CircleDot className="w-3 h-3" />
                  <span className="truncate">{m.label}</span>
                </p>
                <p className="mt-1.5 text-xl sm:text-2xl font-semibold">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .pulse-path {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: pulse-travel 3.5s ease-in-out infinite;
        }
        @keyframes pulse-travel {
          0% { stroke-dashoffset: 300; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -300; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pulse-path { animation: none; }
        }
      `}</style>
    </section>
  );
}
