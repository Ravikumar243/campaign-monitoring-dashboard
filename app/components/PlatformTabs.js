// components/PlatformTabs.js
'use client';
import { useState } from 'react';
import PlatformCard from './PlatformCard';


const platforms = [
  { id: 'meta', name: 'Meta (FB + IG)', color: 'from-blue-500 to-cyan-600', icon: 'M' },
  { id: 'google', name: 'Google Ads', color: 'from-red-500 to-yellow-500', icon: 'G' },
  { id: 'linkedin', name: 'LinkedIn', color: 'from-blue-700 to-blue-900', icon: 'in' },
  { id: 'other', name: 'Others & Multi', color: 'from-purple-500 to-pink-600', icon: '?' },
];

export default function PlatformTabs({ campaigns, overall }) {
  const [active, setActive] = useState('meta');

  // Filter campaigns by platform
  const getPlatformCampaigns = (plat) => {
    return campaigns.filter(c => 
      plat === 'other' 
        ? !['meta', 'google', 'linkedin'].some(p => c.platforms.includes(p)) || c.platforms.length > 1
        : c.platforms.includes(plat)
    );
  };

  const activeCampaigns = getPlatformCampaigns(active);

  return (
    <>
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {platforms.map(p => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={`relative px-10 py-6 rounded-3xl text-white font-bold text-xl shadow-2xl transition-all transform hover:scale-105 ${
              active === p.id ? 'ring-4 ring-white ring-opacity-60 scale-110' : ''
            } bg-gradient-to-br ${p.color}`}
          >
            <span className="relative z-10">{p.name}</span>
            {active === p.id && (
              <div className="absolute inset-0 rounded-3xl bg-white opacity-20 animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Active Platform Card */}
      <PlatformCard 
        platform={platforms.find(p => p.id === active)}
        campaigns={activeCampaigns}
      />
    </>
  );
}