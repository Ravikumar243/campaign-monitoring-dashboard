


import BudgetBurnGauge from "./components/BudgetBurnGauge";
import HeatMatrix from "./components/HeatMatrix";
import Leaderboard from "./components/Leaderboard";
import RealtimeMiniChart from "./components/RealtimeMiniChart";
import SummaryCards from "./components/SummaryCards";
import { getAllCampaigns, getOverallInsights } from "./lib/Api";

export const revalidate = 10; // Har 10 sec fresh data

export default async function Home() {
  // const [campaigns, overall] = await Promise.all([
  //   getAllCampaigns(),
  //   getOverallInsights()
  // ]);

  const campaigns = await getAllCampaigns();
  const overall = await getOverallInsights();

  console.log(campaigns, "campaigns", overall,"overall");

  // Mock revenue per conversion = ₹80 (tu change kar sakta hai)
  const revenuePerConv = 80;
  const totalRevenue = overall.total_conversions * revenuePerConv;
  const roas = overall.total_spend > 0 ? (totalRevenue / overall.total_spend).toFixed(2) : 0;

  // Total budget calculation
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const budgetUsedPercent = totalBudget > 0 ? ((overall.total_spend / totalBudget) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Campaign Command Center
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
            Live Data • Updated: {new Date(overall.timestamp).toLocaleString('en-IN')}
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards overall={overall} roas={roas} />

        {/* Budget Burn Gauge */}
        <div className="mt-8">
          <BudgetBurnGauge percent={budgetUsedPercent} spent={overall.total_spend} total={totalBudget} />
        </div>

        {/* Heat Matrix + Leaderboard */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <HeatMatrix campaigns={campaigns} />
          </div>
          <div>
            <Leaderboard campaigns={campaigns} />
          </div>
        </div>

        {/* Real-time Mini Chart */}
        <div className="mt-8">
          <RealtimeMiniChart />
        </div>
      </div>
    </div>
  );
}
