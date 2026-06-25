import dynamic from "next/dynamic";

const Banner = dynamic(() => import("@/components/home/Banner"), { ssr: false });
const FeaturedStartups = dynamic(() => import("@/components/home/FeaturedStartups"), { ssr: false });
const FeaturedOpportunities = dynamic(() => import("@/components/home/FeaturedOpportunities"), { ssr: false });
const SuccessStories = dynamic(() => import("@/components/home/SuccessStories"), { ssr: false });
const WhyJoin = dynamic(() => import("@/components/home/WhyJoin"), { ssr: false });

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
