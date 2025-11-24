// components/Leaderboard.js

import { Trophy, AlertTriangle } from 'lucide-react';
import { getCampaignInsights } from '../lib/Api';

export default async function Leaderboard({ campaigns }) {
  const enriched = await Promise.all(
    campaigns.map(async (c) => {
      const ins = await getCampaignInsights(c.id);
      const revenue = (ins.conversions || 0) * 80;
      const roas = ins.spend > 0 ? (revenue / ins.spend).toFixed(2) : 0;
      return { ...c, ...ins, roas: parseFloat(roas) };
    })
  );

  const sorted = enriched.sort((a, b) => b.roas - a.roas);
  const top5 = sorted.slice(0, 5);
  const flop5 = sorted.slice(-5).reverse();

  return (
    <div className="space-y-8">
      {/* Champions */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-2xl p-6 text-white">
        <h3 className="text-2xl font-bold flex items-center mb-4">
          <Trophy className="mr-3" /> Top Performers
        </h3>
        {top5.map((c, i) => (
          <div key={c.id} className="bg-white/20 backdrop-blur rounded-xl p-4 mb-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{i + 1}. {c.name}</div>
                <div className="text-sm opacity-90">{c.platforms.join(' · ')}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{c.roas}x</div>
                <div className="text-xs">ROAS</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Underperformers */}
      <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl shadow-2xl p-6 text-white">
        <h3 className="text-2xl font-bold flex items-center mb-4">
          <AlertTriangle className="mr-3" /> Needs Attention
        </h3>
        {flop5.map((c, i) => (
          <div key={c.id} className="bg-white/20 backdrop-blur rounded-xl p-4 mb-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm opacity-90">{c.platforms.join(' · ')}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{c.roas}x</div>
                <div className="text-xs">ROAS</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}