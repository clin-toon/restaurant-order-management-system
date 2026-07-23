import FeaturedItems from "@/components/Home/Featured";
import HeroSection from "@/components/Home/HeroSection";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import { fetchHomePageDetails } from "@/services/home.services";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  let food = [];
  try {
    const data = await fetchHomePageDetails(cookieHeader);
    food = data;
    console.log(food);
  } catch {
    food = [];
  }
  return (
    <div>
      <HeroSection />
      <FeaturedItems item={food} />
      <WhyChooseUs />
    </div>
  );
}
