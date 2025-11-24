// "use client";

// import { PieChart, Pie, Tooltip, Cell } from "recharts";

// export default function StatusPieChart({ campaigns }) {
//   const data = [
//     {
//       name: "Active",
//       value: campaigns.filter(c => c.status === "active").length
//     },
//     {
//       name: "Paused",
//       value: campaigns.filter(c => c.status === "paused").length
//     },
//     {
//       name: "Completed",
//       value: campaigns.filter(c => c.status === "completed").length
//     }
//   ];

//   const colors = ["#4ade80", "#facc15", "#a1a1aa"];

//   return (
//     <PieChart width={400} height={300}>
//       <Pie
//         data={data}
//         dataKey="value"
//         cx="50%"
//         cy="50%"
//         outerRadius={120}
//       >
//         {data.map((entry, i) => (
//           <Cell key={i} fill={colors[i]} />
//         ))}
//       </Pie>
//       <Tooltip />
//     </PieChart>
//   );
// }
