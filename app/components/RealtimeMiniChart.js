"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

export default function RealtimeMiniChart() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchLive = async () => {
  //     try {
  //       const res = await fetch('https://mixo-fe-backend-task.vercel.app/campaigns/camp_001/insights/stream');
  //       const stream = await res.json();

  //       // Base values se thoda realistic fluctuation add kar rahe hain
  //       const baseClicks = stream.clicks || 1200;
  //       const baseConv = stream.conversions || 65;

  //       const variation = () => Math.floor(Math.random() * 40) - 20; // ±20

  //       const newPoint = {
  //         time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
  //         clicks: Math.max(0, baseClicks + variation() + Math.floor(Math.random() * 10)),
  //         conv: Math.max(0, baseConv + Math.floor(Math.random() * 8) - 3),
  //         impressions: stream.impressions + Math.floor(Math.random() * 500),
  //         spend: (stream.spend + Math.random() * 50).toFixed(2)
  //       };

  //       setData(prev => {
  //         const updated = [...prev, newPoint];
  //         return updated.slice(-20); // Last 20 points only
  //       });

  //     } catch (e) {
  //       console.log("Stream fetch failed, using simulated data");
  //       // Agar API down bhi ho toh bhi live feel rahega
  //       const newPoint = {
  //         time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
  //         clicks: 1200 + Math.floor(Math.random() * 100),
  //         conv: 60 + Math.floor(Math.random() * 15),
  //         impressions: 45000 + Math.floor(Math.random() * 1000),
  //         spend: (3400 + Math.random() * 200).toFixed(2)
  //       };
  //       setData(prev => [...prev, newPoint].slice(-20));
  //     }
  //   };

  //   // Pehli baar turant load
  //   fetchLive();

  //   // Har 5-8 seconds mein update (realistic feel)
  //   const interval = setInterval(fetchLive, 6000 + Math.random() * 3000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    let reader;
    let cancelled = false;

    const connect = async () => {
      try {
        const res = await fetch(
          "https://mixo-fe-backend-task.vercel.app/campaigns/camp_001/insights/stream"
        );

        reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (!cancelled) {
          const { value, done } = await reader.read();

          if (done) {
            console.log("Stream ended. Reconnecting...");
            if (!cancelled) setTimeout(connect, 2000);
            return;
          }

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop();

          for (const line of lines) {
            if (line.startsWith("data:")) {
              const obj = JSON.parse(line.replace("data:", "").trim());

              const newPoint = {
                time: new Date().toLocaleTimeString(),
                clicks: obj.clicks,
                conv: obj.conversions,
                impressions: obj.impressions,
                spend: obj.spend,
              };

              setData((prev) => [...prev, newPoint].slice(-20));
            }
          }
        }
      } catch (err) {
        console.log("Stream error, reconnecting in 2s...");
        if (!cancelled) setTimeout(connect, 2000);
      }
    };

    connect();

    return () => {
      cancelled = true;
      reader?.cancel();
    };
  }, []);

  console.log(data, "datakdkf");

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
        <p className="text-xl text-gray-500">Loading live data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
          Real-time Activity (camp_001)
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
            <div className="absolute top-0 left-0 w-4 h-4 bg-red-600 rounded-full"></div>
          </div>
          <span className="text-red-600 font-bold text-lg animate-pulse">
            LIVE
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12 }}
            stroke="#94a3b8"
          />
          <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Line 
            type="monotone" 
            dataKey="clicks" 
            stroke="#8b5cf6" 
            strokeWidth={4} 
            dot={false}
            name="Clicks"
          />
          <Line 
            type="monotone" 
            dataKey="conv" 
            stroke="#10b981" 
            strokeWidth={4} 
            dot={false}
            name="Conversions"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-10 mt-6 text-sm font-medium">
        <span className="flex items-center">
          <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
          {/* Clicks ({data[data.length-1]?.clicks || 0}) */}
        </span>
        <span className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
          {/* Conversions ({data[data.length-1]?.conv || 0}) */}
        </span>
      </div>
    </div>
  );
}
