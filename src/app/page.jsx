import Banner from "@/components/home/Banner";
import FeaturedStartups from "@/components/home/FeaturedStartups";
import FeaturedOpportunities from "@/components/home/FeaturedOpportunities";
import SuccessStories from "@/components/home/SuccessStories";
import WhyJoin from "@/components/home/WhyJoin";

async function getFeaturedData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // Skip fetch if API URL is missing or is localhost (won't work server-side on Vercel)
  if (!apiUrl || apiUrl.includes("localhost")) {
    return { startups: [], opportunities: [] };
  }
  try {
    const [startupsRes, opportunitiesRes] = await Promise.all([
      fetch(`${apiUrl}/api/startups/featured`, { cache: "no-store" }),
      fetch(`${apiUrl}/api/opportunities/featured`, { cache: "no-store" }),
    ]);
    const startups = startupsRes.ok ? await startupsRes.json() : [];
    const opportunities = opportunitiesRes.ok ? await opportunitiesRes.json() : [];
    return { startups, opportunities };
  } catch {
    return { startups: [], opportunities: [] };
  }
}

export default async function HomePage() {
  const { startups, opportunities } = await getFeaturedData();

  return (
    <div className="home-page">
      <Banner />
      <FeaturedStartups startups={startups} />
      <FeaturedOpportunities opportunities={opportunities} />
      <SuccessStories />
      <WhyJoin />
    </div>
  );
}
