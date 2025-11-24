// "use client";

// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// export default function RealtimeChart({ data }) {
//   return (
//     <div className="bg-white p-4 shadow rounded-lg">
//       <h3 className="font-bold mb-2">Real-Time Performance</h3>

//       <LineChart width={600} height={300} data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="timestamp" />
//         <YAxis />
//         <Tooltip />

//         <Line type="monotone" dataKey="impressions" stroke="#2563eb" />
//         <Line type="monotone" dataKey="clicks" stroke="#16a34a" />
//         <Line type="monotone" dataKey="spend" stroke="#f97316" />
//       </LineChart>
//     </div>
//   );
// }
