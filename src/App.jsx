import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import MedicineInventory from "./pages/MedicineInventory";
import AIInsights from "./pages/AIInsights";

function ComingSoon({ title }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <h1 className="text-4xl font-bold text-blue-700">
        {title} Page - Coming Soon 🚀
      </h1>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route
        path="/medicine-inventory"
        element={<MedicineInventory />}
      />

      <Route
        path="/phcs"
        element={<ComingSoon title="PHCs" />}
      />

      <Route
        path="/doctors"
        element={<ComingSoon title="Doctors" />}
      />

      <Route
        path="/beds"
        element={<ComingSoon title="Beds" />}
      />

      <Route
        path="/alerts"
        element={<ComingSoon title="Alerts" />}
      />

      <Route
        path="/ai-insights"
        element={<AIInsights />}
      />
    </Routes>
  );
}

export default App;