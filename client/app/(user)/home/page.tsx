import FeaturedItems from "@/components/Home/Featured";
import HeroSection from "@/components/Home/Hero";
import { fetchRecommendFood } from "@/services/home.services";
import { cookies } from "next/headers";

const page = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  let food = [];
  try {
    const data = await fetchRecommendFood(cookieHeader);

    food = data;
  } catch {
    food = [];
  }
  return (
    <>
      <HeroSection />
      <FeaturedItems item={food} />
    </>
  );
};

export default page;
