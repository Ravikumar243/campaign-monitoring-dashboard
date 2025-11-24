// app/analytics/page.jsx
import { Suspense } from 'react';
import AnalyticsCharts from '../components/AnalyticsCharts';
import { getAllCampaigns, getOverallInsights } from '../lib/Api';

export const metadata = {
  title: 'Performance Analytics | Campaign Command Center',
};

export default async function PerformanceAnalyticsPage() {
  // Parallel API calls (Server Component advantage)
   const campaigns = await getAllCampaigns();
   const overall = await getOverallInsights();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4 py-8">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Performance Analytics
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mt-4">
              Deep insights • 30-day trends • Funnel • ROAS • Budget Pace
            </p>
          </div>

          {/* Pass data to Client Component */}
          <Suspense fallback={<div className="text-center py-5"><span className="loading loading-spinner loading-lg"></span></div>}>
            <AnalyticsCharts campaigns={campaigns} overall={overall} />
          </Suspense>

        </div>
      </div>
    </>
  );
}