// // components/PlatformCard.js
// 'use client';

// import { TrendingUp, TrendingDown, Zap } from 'lucide-react';
// import { getCampaignInsights } from '../lib/Api';

// export default async function PlatformCard({ platform, campaigns }) {
//   // Enrich with insights
//   const enriched = await Promise.all(
//     campaigns.map(async (c) => {
//       const ins = await getCampaignInsights(c.id);
//       const revenue = (ins.conversions || 0) * 80;
//       const roas = ins.spend > 0 ? (revenue / ins.spend).toFixed(2) : 0;
//       return { ...c, ...ins, roas: parseFloat(roas) };
//     })
//   );

//   const totalSpend = enriched.reduce((s, c) => s + (c.spend || 0), 0);
//   const totalConv = enriched.reduce((s, c) => s + (c.conversions || 0), 0);
//   const avgRoas = enriched.length > 0 
//     ? (enriched.reduce((s, c) => s + c.roas, 0) / enriched.length).toFixed(2)
//     : 0;

//   const top3 = enriched.sort((a, b) => b.roas - a.roas).slice(0, 3);
//   const bottom3 = enriched.sort((a, b) => a.roas - b.roas).slice(0, 3);

//   return (
//     <div className={`bg-gradient-to-br ${platform.color} rounded-3xl shadow-2xl p-10 text-white`}>
//       <div className="grid lg:grid-cols-3 gap-8">

//         {/* Left: Stats */}
//         <div className="space-y-8">
//           <h2 className="text-5xl font-bold flex items-center gap-4">
//             <span className="w-20 h-20 bg-white/30 backdrop-blur rounded-full flex items-center justify-center text-4xl font-bold">
//               {platform.icon}
//             </span>
//             {platform.name}
//           </h2>

//           <div className="grid grid-cols-2 gap-6 text-center">
//             <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
//               <Zap className="w-10 h-10 mx-auto mb-2" />
//               <p className="text-sm opacity-90">Campaigns</p>
//               <p className="text-4xl font-bold">{campaigns.length}</p>
//             </div>
//             <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
//               <p className="text-sm opacity-90">Total Spend</p>
//               <p className="text-3xl font-bold">₹{totalSpend.toLocaleString()}</p>
//             </div>
//             <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
//               <p className="text-sm opacity-90">Conversions</p>
//               <p className="text-4xl font-bold">{totalConv}</p>
//             </div>
//             <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
//               <p className="text-sm opacity-90">Avg ROAS</p>
//               <p className={`text-4xl font-bold ${avgRoas > 4 ? 'text-green-300' : avgRoas > 2 ? 'text-yellow-300' : 'text-red-300'}`}>
//                 {avgRoas}x
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Center: Top & Bottom */}
//         <div className="space-y-6">
//           <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
//             <h3 className="text-2xl font-bold mb-4 flex items-center">
//               <TrendingUp className="mr-2" /> Top Performers
//             </h3>
//             {top3.map((c, i) => (
//               <div key={c.id} className="bg-white/10 rounded-xl p-4 mb-3">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium">{c.name}</span>
//                   <span className="text-2xl font-bold">{c.roas}x</span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
//             <h3 className="text-2xl font-bold mb-4 flex items-center text-red-300">
//               <TrendingDown className="mr-2" /> Needs Attention
//             </h3>
//             {bottom3.map((c, i) => (
//               <div key={c.id} className="bg-white/10 rounded-xl p-4 mb-3">
//                 <div className="flex justify-between items-center">
//                   <span className="font-medium">{c.name}</span>
//                   <span className="text-2xl font-bold text-red-300">{c.roas}x</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right: Live Pulse */}
//         <div className="flex flex-col items-center justify-center">
//           <div className="relative">
//             <div className="w-32 h-32 bg-white/30 rounded-full animate-ping"></div>
//             <div className="absolute inset-0 w-32 h-32 bg-white/50 rounded-full animate-pulse"></div>
//             <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
//               <span className="text-4xl font-bold text-gray-800">LIVE</span>
//             </div>
//           </div>
//           <p className="mt-6 text-xl opacity-90">Real-time Updates</p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Zap } from "lucide-react";
import { getCampaignInsights } from "../lib/Api";

export default function PlatformCard({ platform, campaigns }) {
  const [enriched, setEnriched] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadData() {
      setLoading(true);
      const data = await Promise.all(
        campaigns.map(async (c) => {
          const ins = await getCampaignInsights(c.id);
          const revenue = (ins.conversions || 0) * 80;
          const roas = ins.spend > 0 ? revenue / ins.spend : 0;

          return { ...c, ...ins, roas };
        })
      );

      if (active) {
        setEnriched(data);
        setLoading(false);
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, [campaigns]);

  if (loading) return <div className="text-white text-2xl">Loading...</div>;

  const totalSpend = enriched.reduce((s, c) => s + (c.spend || 0), 0);
  const totalConv = enriched.reduce((s, c) => s + (c.conversions || 0), 0);

  const avgRoas =
    enriched.length > 0
      ? (enriched.reduce((s, c) => s + c.roas, 0) / enriched.length).toFixed(2)
      : 0;

  const top3 = [...enriched].sort((a, b) => b.roas - a.roas).slice(0, 3);
  const bottom3 = [...enriched].sort((a, b) => a.roas - b.roas).slice(0, 3);

 return (
    <div className={`bg-gradient-to-br ${platform.color} rounded-3xl shadow-2xl p-10 text-white`}>
      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left: Stats */}
        <div className="space-y-8">
          <h2 className="text-5xl font-bold flex items-center gap-4">
            <span className="w-20 h-20 bg-white/30 backdrop-blur rounded-full flex items-center justify-center text-4xl font-bold">
              {platform.icon}
            </span>
            {platform.name}
          </h2>

          <div className="grid grid-cols-2 gap-6 text-center">
            <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
              <Zap className="w-10 h-10 mx-auto mb-2" />
              <p className="text-sm opacity-90">Campaigns</p>
              <p className="text-4xl font-bold">{campaigns.length}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
              <p className="text-sm opacity-90">Total Spend</p>
              <p className="text-3xl font-bold">₹{totalSpend.toLocaleString()}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
              <p className="text-sm opacity-90">Conversions</p>
              <p className="text-4xl font-bold">{totalConv}</p>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
              <p className="text-sm opacity-90">Avg ROAS</p>
              <p className={`text-4xl font-bold ${avgRoas > 4 ? 'text-green-300' : avgRoas > 2 ? 'text-yellow-300' : 'text-red-300'}`}>
                {avgRoas}x
              </p>
            </div>
          </div>
        </div>

        {/* Center: Top & Bottom */}
        <div className="space-y-6">
          <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <TrendingUp className="mr-2" /> Top Performers
            </h3>
            {top3.map((c, i) => (
              <div key={c.id} className="bg-white/10 rounded-xl p-4 mb-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-2xl font-bold">{c.roas}x</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center text-red-300">
              <TrendingDown className="mr-2" /> Needs Attention
            </h3>
            {bottom3.map((c, i) => (
              <div key={c.id} className="bg-white/10 rounded-xl p-4 mb-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-2xl font-bold text-red-300">{c.roas}x</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Pulse */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-white/30 rounded-full animate-ping"></div>
            <div className="absolute inset-0 w-32 h-32 bg-white/50 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-800">LIVE</span>
            </div>
          </div>
          <p className="mt-6 text-xl opacity-90">Real-time Updates</p>
        </div>
      </div>
    </div>
  );
}
