// src/components/medicine-inventory/PHCFilter.jsx
//
// Dropdown filter for narrowing the table down to a single PHC.

export default function PHCFilter({ value, onChange, options }) {
  return (
    <div className="w-full sm:w-56">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-blue-100 bg-white py-2 px-3 text-sm text-slate-700
                   shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        {options.map((phc) => (
          <option key={phc} value={phc}>
            {phc}
          </option>
        ))}
      </select>
    </div>
  );
}
