// app/campaigns/page.js

import CampaignsTable from '../components/CampaignsTable';
import { getAllCampaigns, getOverallInsights } from '../lib/Api';

// export const revalidate = 10;

export default async function AllCampaignsPage() {
  const [campaigns, overall] = await Promise.all([
    getAllCampaigns(),
    getOverallInsights()
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            All Campaigns
          </h1>
          {/* <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            Total Campaigns: {overall.total_campaigns} • 
            Active: {overall.active_campaigns} • 
            Spend Today: ₹{overall.total_spend.toLocaleString()}
          </p> */}
        </div>

        {/* Main Table + Detail Panel */}
        {/* <CampaignsTable initialCampaigns={campaigns} /> */}

      </div>
    </div>
  );
}