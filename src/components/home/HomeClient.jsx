"use client";
import dynamic from "next/dynamic";

const Banner = dynamic(() => import("@/components/home/Banner"), { ssr: false });
const FeaturedStartups = dynamic(() => import("@/components/home/FeaturedStartups"), { ssr: false });
const FeaturedOpportunities = dynamic(() => import("@/components/home/FeaturedOpportunities"), { ssr: false });
const SuccessStories = dynamic(() => import("@/components/home/SuccessStories"), { ssr: false });
const WhyJoin = dynamic(() => import("@/components/home/WhyJoin"), { ssr: false });

export default function HomeClient({ startups, opportunities }) {
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
