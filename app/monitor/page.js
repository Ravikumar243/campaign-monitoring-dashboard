// app/monitor/page.jsx
// import RealTimeMonitorClient from '@/components/RealTimeMonitorClient';
// import { fetchCampaignsList } from '@/lib/fetchData';

import RealTimeMonitorClient from "../components/RealTimeMonitorClient";
import { getAllCampaigns } from "../lib/Api";

export const metadata = {
  title: "Real-Time Monitor | Campaign Command Center",
};

export default async function RealTimeMonitorPage() {
  const campaigns = await getAllCampaigns();

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      <div className="w-full max-w-[1400px]">
        <RealTimeMonitorClient initialCampaigns={campaigns} />
      </div>
    </div>
  );
}
