const url = process.env.NEXT_PUBLIC_API;

export const addItemToTheCart = async (food_id: any) => {
  try {
    const res = await fetch(`${url}cart/${food_id}`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      const cart_item = await res.json();

      return cart_item;
    }
    const cart_item = await res.json();

    return cart_item;
  } catch (error) {
    throw new Error();
  }
};

export const getCartDetailsOfTheUser = async () => {
  try {
    const res = await fetch(`${url}cart`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const cart_item = await res.json();

      return cart_item;
    }
    const cart_item = await res.json();
    return cart_item;
  } catch (error) {
    console.log(error);
  }
};

export const updateTheCartItemQuantity = async (
  quantity: number,
  food_id: string,
) => {
  try {
    const res = await fetch(`${url}cart/${food_id}/${quantity}`, {
      method: "PUT",
      credentials: "include",
    });

    if (!res.ok) {
      const cart_item = await res.json();

      return cart_item;
    }
    const cart_item = await res.json();
    return cart_item;
  } catch (error) {
    console.log(error);
  }
};

export const removeItemFromTheCart = async (food_id: string) => {
  try {
    const res = await fetch(`${url}cart/${food_id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      const cart_item = await res.json();

      return cart_item;
    }
    const cart_item = await res.json();
    return cart_item;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDetailsOfTheItemsPresentInCart = async (
  cookieHeader: string,
) => {
  try {
    const res = await fetch(`${url}cart/details`, {
      method: "GET",
      headers: {
        cookie: cookieHeader, // forward just the auth cookie
      },
    });

    if (!res.ok) {
      const cart_item = await res.json();
      console.log(cart_item);
    }
    const cart_item = await res.json();

    return cart_item;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDetailsOfTheItemsPresentInCartWithInclude = async () => {
  try {
    const res = await fetch(`${url}cart/details`, {
      method: "GET",

      credentials: "include",
    });

    if (!res.ok) {
      const cart_item = await res.json();
      return cart_item;
    }
    const cart_item = await res.json();

    return cart_item;
  } catch (error) {
    console.log(error);
  }
};
