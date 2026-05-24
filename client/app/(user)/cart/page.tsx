import { fetchDetailsOfTheItemsPresentInCart } from "@/services/cart.services";
import { cookies } from "next/headers";
import { CartResponse } from "@/types/CartType";
import Wrapper from "./Wrapper";

const page = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  let data: CartResponse | null = null;
  try {
    data = await fetchDetailsOfTheItemsPresentInCart(cookieHeader);
  } catch {
    data = null;
  }

  return <Wrapper totalAmount={data?.total} />;
};

export default page;
