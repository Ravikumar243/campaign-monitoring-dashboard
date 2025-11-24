// components/HeatMatrix.js

import { getCampaignInsights } from "../lib/Api";


async function getPlatformData(campaigns) {
  console.log(campaigns,"campaigns")
  const platformMap = {
    meta: { active: 0, paused: 0, completed: 0, spend: 0, roas: 0 },
    google: { active: 0, paused: 0, completed: 0, spend: 0, roas: 0 },
    linkedin: { active: 0, paused: 0, completed: 0, spend: 0, roas: 0 },
    other: { active: 0, paused: 0, completed: 0, spend: 0, roas: 0 }
  };

  for (const camp of campaigns) {
    const insights = await getCampaignInsights(camp.id);
    const spend = insights.spend || 0;
    const conv = insights.conversions || 0;
    const roas = spend > 0 ? (conv * 80 / spend) : 0;

    camp.platforms.forEach(p => {
      if (!platformMap[p]) return;
      platformMap[p][camp.status]++;
      platformMap[p].spend += spend;
      platformMap[p].roas += roas;
    });
  }

  return platformMap;
}

export default async function HeatMatrix({ campaigns }) {
  const data = await getPlatformData(campaigns);

  const platforms = ['meta', 'google', 'linkedin', 'other'];
  const statuses = ['active', 'paused', 'completed'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
      <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-6">
        Performance Heat Matrix
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-center">
          <thead>
            <tr className="text-gray-600 dark:text-gray-400">
              <th className="pb-4"></th>
              {platforms.map(p => (
                <th key={p} className="px-6 text-lg capitalize font-semibold">{p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {statuses.map(status => (
              <tr key={status}>
                <td className="pr-8 py-4 text-left font-semibold capitalize text-gray-700 dark:text-gray-300">
                  {status}
                </td>
                {platforms.map(p => {
                  const cell = data[p];
                  const count = cell[status];
                  const bg = count === 0 ? "bg-gray-100" :
                            status === "active" ? "bg-emerald-500" :
                            status === "paused" ? "bg-yellow-500" : "bg-blue-500";
                  return (
                    <td key={p} className={`p-6 rounded-xl ${bg} text-white font-bold text-lg shadow-lg`}>
                      {count > 0 ? count : "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-center gap-8 text-sm">
        <span className="flex items-center"><div className="w-5 h-5 bg-emerald-500 rounded mr-2"></div> Active</span>
        <span className="flex items-center"><div className="w-5 h-5 bg-yellow-500 rounded mr-2"></div> Paused</span>
        <span className="flex items-center"><div className="w-5 h-5 bg-blue-500 rounded mr-2"></div> Completed</span>
      </div>
    </div>
  );
}