// src/components/dashboard/SummaryCards.jsx
import React from "react";
import SummaryCard from "./SummaryCard";
import { summaryCards } from "../../data/dashboardData";

/**
 * SummaryCards
 * Responsive grid of the four top-level KPI cards.
 */
export default function SummaryCards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {summaryCards.map((card) => (
        <SummaryCard key={card.id} {...card} />
      ))}
    </section>
  );
}
