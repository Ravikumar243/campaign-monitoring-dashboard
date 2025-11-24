// components/AnalyticsCharts.jsx
'use client';
import { useState, useEffect } from 'react';
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter, ZAxis, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, LabelList, PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

export default function AnalyticsCharts({ campaigns, overall }) {
  const [bubbleData, setBubbleData] = useState([]);
  const [trendData] = useState(() => 
    Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      impressions: 30000 + Math.random() * 40000,
      clicks: 800 + Math.random() * 1200,
      conversions: 40 + Math.random() * 60,
      spend: 30000 + Math.random() * 50000
    }))
  );

  // Enrich campaigns with insights (client-side)
  useEffect(() => {
    const enriched = campaigns.map(camp => {
      // In real app, you'd fetch individual insights here or pass from server
      const mockInsights = {
        spend: Math.random() * 200000 + 50000,
        conversions: Math.floor(Math.random() * 300 + 50),
        roas: (Math.random() * 8 + 1).toFixed(2)
      };
      return { ...camp, ...mockInsights };
    });
    setBubbleData(enriched);
  }, [campaigns]);

  const funnelData = [
    { value: overall?.impressions || 1200000, name: 'Impressions' },
    { value: overall?.clicks || 35000, name: 'Clicks' },
    { value: overall?.total_conversions || 1200, name: 'Conversions' }
  ];

  const platformData = [
    { name: 'Meta', spend: 580000, roas: 5.8 },
    { name: 'Google', spend: 420000, roas: 4.9 },
    { name: 'LinkedIn', spend: 310000, roas: 3.7 },
    { name: 'Others', spend: 180000, roas: 7.2 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* 1. Spend vs ROAS Bubble Chart */}
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 p-8">
          <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Spend vs ROAS (Bubble = Conversions)
          </h3>
          <ResponsiveContainer width="100%" height={450}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis type="number" dataKey="spend" name="Spend ₹" />
              <YAxis type="number" dataKey="roas" name="ROAS (x)" />
              <ZAxis type="number" dataKey="conversions" range={[200, 2500]} />
              <Tooltip formatter={(v) => v.toLocaleString()} />
              <Scatter name="Campaigns" data={bubbleData} fill="#8b5cf6">
                {bubbleData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. 30-Day Trend */}
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">30-Day Performance Trend</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="impressions" stroke="#8b5cf6" strokeWidth={3} name="Impressions" />
              <Line type="monotone" dataKey="clicks" stroke="#3b82f6" strokeWidth={3} name="Clicks" />
              <Line type="monotone" dataKey="conversions" stroke="#10b981" strokeWidth={3} name="Conversions" />
              <Line type="monotone" dataKey="spend" stroke="#ef4444" strokeWidth={3} name="Spend ₹" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Conversion Funnel */}
      <div>
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-6">Conversion Funnel</h3>
          <ResponsiveContainer width="100%" height={350}>
            <FunnelChart>
              <Tooltip />
              <Funnel dataKey="value" data={funnelData} isAnimationActive>
                <LabelList position="inside" fill="#fff" stroke="none" dataKey="name" />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Platform Comparison */}
      <div>
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Platform Performance</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={platformData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="spend" fill="#8b5cf6" name="Spend ₹" />
              <Bar dataKey="roas" fill="#10b981" name="ROAS (x)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. Budget Pace Gauge */}
      <div className="lg:col-span-2">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl shadow-2xl p-10 text-white text-center">
          <h3 className="text-4xl font-black mb-6">Budget Pace: ON TRACK</h3>
          <div className="inline-block relative">
            <svg width="300" height="300" viewBox="0 0 300 300">
              <circle cx="150" cy="150" r="130" fill="none" stroke="#fff" strokeWidth="20" opacity="0.2" />
              <circle
                cx="150" cy="150" r="130"
                fill="none" stroke="#fff" strokeWidth="25"
                strokeDasharray="816" strokeDashoffset="200"
                strokeLinecap="round"
                className="drop-shadow-lg"
              />
              <text x="150" y="150" textAnchor="middle" dy="15" className="text-6xl font-black">
                68%
              </text>
            </svg>
          </div>
          <p className="text-2xl mt-6 opacity-90">
            ₹{overall?.total_spend?.toLocaleString() || 0} spent of ₹18,50,000 budget
          </p>
        </div>
      </div>

    </div>
  );
}