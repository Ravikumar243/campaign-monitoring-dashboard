

import PlatformTabs from "../components/PlatformTabs";
import { getAllCampaigns, getOverallInsights } from "../lib/Api";

export const revalidate = 10;

export default async function PlatformBreakdownPage() {
  const campaigns = await getAllCampaigns();
  const overall = await getOverallInsights();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
            Platform Breakdown
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-4 text-xl">
            Real-time performance by advertising platform
          </p>
        </div>

        <PlatformTabs campaigns={campaigns} overall={overall} />

      </div>
    </div>
  );
}