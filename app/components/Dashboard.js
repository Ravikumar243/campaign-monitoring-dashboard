// "use client";

// import CampaignTable from "./CampaignsTable";
// import SummaryCard from "./SummaryCards";

// export default function Dashboard({ campaigns }) {
//   return (
//     <div className="space-y-5">

//       <h1 className="text-2xl font-bold">Campaign Monitoring Dashboard</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-4 gap-4">
//         <SummaryCard title="Total Campaigns" value={campaigns.length} />
//         <SummaryCard title="Active" value={campaigns.filter(c => c.status === "active").length} />
//         <SummaryCard title="Paused" value={campaigns.filter(c => c.status === "paused").length} />
//         <SummaryCard title="Completed" value={campaigns.filter(c => c.status === "completed").length} />
//       </div>

//       {/* Table */}
//       <CampaignTable campaigns={campaigns} />
//     </div>
//   );
// }
