import HomeClient from "@/components/home/HomeClient";

async function getFeaturedData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
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
    <div className="bg-background text-foreground min-h-screen">
      <HomeClient startups={startups} opportunities={opportunities} />
    </div>
  );
}

