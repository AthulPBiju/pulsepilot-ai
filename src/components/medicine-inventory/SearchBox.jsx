// src/components/medicine-inventory/SearchBox.jsx
//
// Simple controlled search input, styled to match the existing
// blue-themed inputs elsewhere in the PulsePilot dashboard.

export default function SearchBox({ value, onChange, placeholder = "Search medicines..." }) {
  return (
    <div className="relative w-full sm:w-72">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 5.4 5.4a7.5 7.5 0 0 0 11.25 11.25Z"
        />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-blue-100 bg-white py-2 pl-9 pr-3 text-sm text-slate-700
                   placeholder:text-slate-400 shadow-sm focus:border-blue-400 focus:outline-none
                   focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}
