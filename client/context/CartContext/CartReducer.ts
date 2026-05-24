import { CartItem, CartState , CartAction } from "@/types/CartType";

export const  cartReducer = (state:CartState, action:CartAction) => {
  switch (action.type) {
   case "UPDATE_COUNT": return{...state , cartCount:action.payload};
   case "ADD_DETAILS_TO_CART":return {...state , cartDetailsItem:action.payload , cartCount:action.payload.length}
   case "REMOVE_ITEM": return {...state , cartDetailsItem:action.payload , cartCount:action.payload.length}
    default:
      return state;
  }
};