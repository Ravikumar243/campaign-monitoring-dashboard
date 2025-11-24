// components/CampaignsTable.js
'use client';
import { useState, useEffect } from 'react';
import { Pause, Play, Download, Filter, Search } from 'lucide-react';
import { getCampaignInsights } from '../lib/Api';

export default function CampaignsTable({ initialCampaigns }) {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  // Live update every 15 sec
  useEffect(() => {
    const updateMetrics = async () => {
      setLoading(true);
      const updated = await Promise.all(
        campaigns.map(async (c) => {
          const insights = await getCampaignInsights(c.id);
          const revenue = (insights.conversions || 0) * 80;
          const roas = insights.spend > 0 ? (revenue / insights.spend).toFixed(2) : '0.00';
          return { ...c, ...insights, roas: parseFloat(roas) };
        })
      );
      setCampaigns(updated);
      setLoading(false);
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 15000);
    return () => clearInterval(interval);
  }, []);

  const filtered = campaigns.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.platforms.some(p => p.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left: Table */}
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Search + Actions */}
          <div className="p-6 border-b dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center gap-2">
                <Download size={20} /> Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Campaign</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Platform</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase">Spend</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase">Conv</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase">ROAS</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className="border-b dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 cursor-pointer transition-all"
                  >
                    <td className="px-6 py-5 font-medium">{c.name}</td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        {c.platforms.map(p => (
                          <span key={p} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">
                            {p.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`px-4 py-2 rounded-full text-xs font-bold ${
                        c.status === 'active' ? 'bg-green-100 text-green-700' :
                        c.status === 'paused' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {c.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right font-semibold">₹{c.spend?.toLocaleString() || '0'}</td>
                    <td className="px-6 py-5 text-right">{c.conversions || 0}</td>
                    <td className="px-6 py-5 text-right">
                      <span className={`font-bold ${c.roas > 4 ? 'text-green-600' : c.roas > 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {c.roas || 0}x
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      {c.status === 'active' ? 
                        <button className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                          <Pause size={18} />
                        </button> :
                        <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                          <Play size={18} />
                        </button>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right: Detail Panel */}
      <div className="lg:col-span-1">
        {selected ? (
          <div className="sticky top-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 animate-in fade-in slide-in-from-right">
            <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-6">
              {selected.name}
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white">
                  <p className="text-sm opacity-90">Total Spend</p>
                  <p className="text-3xl font-bold">₹{selected.spend?.toLocaleString() || '0'}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white">
                  <p className="text-sm opacity-90">ROAS</p>
                  <p className="text-3xl font-bold">{selected.roas || 0}x</p>
                </div>
              </div>

              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div className="flex justify-between"><span>Platform</span><span className="font-medium">{selected.platforms.join(', ')}</span></div>
                <div className="flex justify-between"><span>Status</span><span className="font-medium capitalize">{selected.status}</span></div>
                <div className="flex justify-between"><span>Budget</span><span className="font-medium">₹{selected.budget.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Impressions</span><span className="font-medium">{selected.impressions?.toLocaleString() || '0'}</span></div>
                <div className="flex justify-between"><span>Clicks</span><span className="font-medium">{selected.clicks || 0}</span></div>
                <div className="flex justify-between"><span>Conversions</span><span className="font-medium">{selected.conversions || 0}</span></div>
                <div className="flex justify-between"><span>CTR</span><span className="font-medium">{selected.ctr?.toFixed(2) || 0}%</span></div>
                <div className="flex justify-between"><span>CPC</span><span className="font-medium">₹{selected.cpc?.toFixed(2) || 0}</span></div>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all">
                View Full Report →
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl h-96 flex items-center justify-center text-gray-500">
            <p className="text-xl">Click on any campaign to see details</p>
          </div>
        )}
      </div>
    </div>
  );
}