"use client";
import React, { createContext, useReducer, useEffect } from "react";
import { CartState, CartCardItem, CartContextType } from "@/types/CartType";
import { cartReducer } from "./CartReducer";
import { fetchDetailsOfTheItemsPresentInCartWithInclude } from "@/services/cart.services";

const initialState: CartState = {
  cartCount: 0,
  cartDetailsItem: [],
};

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToDetailsCart = (item: CartCardItem) => {
    dispatch({ type: "ADD_DETAILS_TO_CART", payload: item });
  };

  const updateCartCount = (currCount: number) => {
    dispatch({ type: "UPDATE_COUNT", payload: currCount });
  };

  const getTotalCartItem = () => state.cartCount;

  const findTheQuantityOfTheFoodItem = (food_id: string) => {
    const item = state.cartDetailsItem.find((item) => item.id === food_id);
    return item?.quantity;
  };

  const checkFoodIdExistsOrNot = (food_item_id: string) => {
    return state.cartDetailsItem.some((item) => item.id === food_item_id);
  };

  const removeItemFromCart = (food_id: string) => {
    const filteredItems = state.cartDetailsItem.filter(
      (item) => item.id !== food_id,
    );
    dispatch({ type: "REMOVE_ITEM", payload: filteredItems });
  };

  useEffect(() => {
    const getDetails = async () => {
      if (state.cartDetailsItem.length > 0) return;
      const cart = await fetchDetailsOfTheItemsPresentInCartWithInclude();
      if (cart?.status !== "success") {
        return addToDetailsCart([]);
      }
      addToDetailsCart(cart.cart);
    };
    getDetails();
  }, []);

  return (
    <CartContext.Provider
      value={{
        state,
        getTotalCartItem,
        checkFoodIdExistsOrNot,
        updateCartCount,
        findTheQuantityOfTheFoodItem,
        addToDetailsCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
