// components/SummaryCards.js
import { Zap, IndianRupee, Target, TrendingUp } from 'lucide-react';

export default function SummaryCards({ overall, roas }) {
  const cards = [
    { icon: Zap, label: "Active Campaigns", value: overall.active_campaigns, color: "from-emerald-500 to-teal-600" },
    { icon: IndianRupee, label: "Total Spend", value: `₹${overall.total_spend.toLocaleString()}`, color: "from-red-500 to-pink-600" },
    { icon: Target, label: "Total Conversions", value: overall.total_conversions.toLocaleString(), color: "from-purple-500 to-indigo-600" },
    { icon: TrendingUp, label: "Current ROAS", value: `${roas}x`, color: roas > 4 ? "from-green-500 to-emerald-600" : "from-yellow-500 to-orange-600" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div key={i} className="relative overflow-hidden rounded-3xl shadow-2xl bg-white dark:bg-gray-800 p-6 transform hover:scale-105 transition-all duration-300">
          <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-90`} />
          <div className="relative z-10 text-white">
            <card.icon className="w-12 h-12 mb-3" />
            <p className="text-sm opacity-90">{card.label}</p>
            <p className="text-4xl font-bold mt-2">{card.value}</p>
          </div>
          <div className="absolute top-3 right-3">
            <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}