

const BASE = "https://mixo-fe-backend-task.vercel.app";

export async function getAllCampaigns() {
  const res = await fetch(`${BASE}/campaigns`, {
    cache: "force-cache",  
  });

  if (!res.ok) {
    throw new Error("Failed to fetch campaigns");
  }

  const data = await res.json();
  return data.campaigns;
}

export async function getOverallInsights() {
  const res = await fetch(`${BASE}/campaigns/insights`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch overall insights");
  }

  const data = await res.json();
  return data.insights;
}

export async function getCampaignInsights(id) {
  try {
    const res = await fetch(`${BASE}/campaigns/${id}/insights`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.text(); 
      throw new Error("Failed to fetch campaign insights");
    }

    const data = await res.json();
    return data.insights;
  } catch (e) {
    // fallback default insights
    return {
      spend: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0,
      cpc: 0,
    };
  }
}
