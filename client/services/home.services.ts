const url = process.env.NEXT_PUBLIC_API;

export const fetchHomePageDetails = async (cookieHeader: string) => {
  try {
    const res = await fetch(`${url}home`, {
      method: "GET",
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });
    if (!res.ok) {
      console.log(res);
    }
    const result = await res.json();
    console.log(result);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchRecommendFood = async (cookieHeader: string) => {
  try {
    const res = await fetch(`${url}recommend`, {
      method: "GET",
      headers: { cookie: cookieHeader },
      cache: "no-store",
    });
    if (!res.ok) {
      return console.log(res);
    }
    const result = await res.json();

    return result.data;
  } catch (error) {
    console.log(error);
  }
};
