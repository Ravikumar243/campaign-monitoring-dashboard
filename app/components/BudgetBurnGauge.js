// components/BudgetBurnGauge.js
export default function BudgetBurnGauge({ percent, spent, total }) {
  console.log(percent,spent, total, "percent")
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Budget Burn Rate</h2>
      <div className="relative inline-block">
        <svg width="300" height="300" className="-rotate-90">
          <circle cx="150" cy="150" r={radius} stroke="#e5e7eb" strokeWidth="24" fill="none" />
          <circle
            cx="150" cy="150" r={radius}
            stroke={percent > 90 ? "#ef4444" : percent > 70 ? "#f59e0b" : "#10b981"}
            strokeWidth="24"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-5xl font-bold text-gray-800 dark:text-white">{percent}%</p>
          <p className="text-xl mt-2">₹{spent.toLocaleString()} / ₹{total.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}