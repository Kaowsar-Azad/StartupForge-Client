"use client";

export default function StatsCard({ title, value, icon, color = "#6366f1" }) {
  return (
    <div 
      className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-500 dark:text-slate-400">{title}</span>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
      </div>
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner bg-opacity-10" 
        style={{ backgroundColor: `${color}15`, color }}
      >
        {icon}
      </div>
    </div>
  );
}
