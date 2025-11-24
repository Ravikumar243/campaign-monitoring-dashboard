// "use client";

// import { useEffect, useState } from "react";
// import {
//   fetchCampaignById,
//   fetchCampaignInsights,
//   fetchStreamInsights
// } from "../../../lib/api";

// import SummaryCard from "../../../components/SummaryCard";
// import RealtimeChart from "../../../components/RealtimeChart";

// export default function CampaignDetail({ params }) {
//   const { id } = params;
//   const [data, setData] = useState(null);
//   const [insights, setInsights] = useState(null);
//   const [stream, setStream] = useState([]);

//   useEffect(() => {
//     async function load() {
//       const res1 = await fetchCampaignById(id);
//       const res2 = await fetchCampaignInsights(id);

//       setData(res1.campaign);
//       setInsights(res2.insights);
//     }
//     load();
//   }, [id]);

//   // Real-time streaming
//   useEffect(() => {
//     const interval = setInterval(async () => {
//       const s = await fetchStreamInsights(id);
//       setStream(prev => [...prev, s]);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [id]);

//   if (!data || !insights) return <p>Loading...</p>;

//   return (
//     <div className="p-6 space-y-6">

//       <h1 className="text-3xl font-bold">{data.name}</h1>

//       {/* Info Card */}
//       <div className="grid grid-cols-3 gap-4">
//         <SummaryCard title="Status" value={data.status} />
//         <SummaryCard title="Budget" value={data.budget} />
//         <SummaryCard title="Daily Budget" value={data.daily_budget} />
//       </div>

//       {/* Metrics */}
//       <div className="grid grid-cols-3 gap-4">
//         <SummaryCard title="Impressions" value={insights.impressions} />
//         <SummaryCard title="Clicks" value={insights.clicks} />
//         <SummaryCard title="Conversions" value={insights.conversions} />
//         <SummaryCard title="Spend" value={insights.spend} />
//         <SummaryCard title="CTR" value={insights.ctr} />
//         <SummaryCard title="CPC" value={insights.cpc} />
//       </div>

//       {/* Real-time chart */}
//       <RealtimeChart data={stream} />
//     </div>
//   );
// }
