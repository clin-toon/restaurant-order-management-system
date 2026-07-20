const url = process.env.NEXT_PUBLIC_API;

export const fetchContactFormDetails = async (
  cookieHeader: string,
  params: string,
) => {
  const query = new URLSearchParams(params as any).toString();
  let apiEndPoint = `${url}admin/contact?${query}`;

  try {
    const res = await fetch(apiEndPoint, {
      method: "GET",
      headers: { cookie: cookieHeader },
    });

    if (!res.ok) {
      console.log(res);
    }

    const orderItems = await res.json();
    console.log(orderItems);
    return orderItems;
  } catch (error) {
    console.log(error);
  }
};

export const updateContactFormOrderStatus = async (
  cookieHeader: string,
  params: string,
  id: string,
) => {
  const query = new URLSearchParams(params as any).toString();
  let apiEndPoint = `${url}admin/contact/${id}`;

  try {
    const res = await fetch(apiEndPoint, {
      method: "PUT",
      headers: { cookie: cookieHeader },
    });

    if (!res.ok) {
      console.log(res);
    }

    const orderItems = await res.json();
    console.log(orderItems);
    return orderItems;
  } catch (error) {
    console.log(error);
  }
};
