// "use client";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from "recharts";

// export default function LineChartComponent({ insights }) {
//   if (!insights) return null;

//   // Convert insights into an array because Recharts needs array data
//   const chartData = [
//     {
//       name: "Metrics",
//       impressions: insights.total_impressions,
//       clicks: insights.total_clicks,
//       conversions: insights.total_conversions,
//       spend: insights.total_spend,
//     }
//   ];

//   return (
//     <div className="bg-white p-5 shadow rounded-lg w-full h-80">
//       <h2 className="text-xl font-semibold mb-3">Global Performance Overview</h2>

//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />

//           <XAxis dataKey="name" />
//           <YAxis />

//           <Tooltip />
//           <Legend />

//           {/* Lines */}
//           <Line type="monotone" dataKey="impressions" stroke="#8884d8" strokeWidth={2} />
//           <Line type="monotone" dataKey="clicks" stroke="#82ca9d" strokeWidth={2} />
//           <Line type="monotone" dataKey="conversions" stroke="#ff7300" strokeWidth={2} />
//           <Line type="monotone" dataKey="spend" stroke="#0088FE" strokeWidth={2} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
