import {  ModalState  } from "@/types/ModalContextType";


export const ModalReducer = (state: ModalState,action: any): ModalState => {
  
  switch (action.type) {
    case "OPEN_MODAL":
   
      return {...state, isOpen: true , title:action.payload.title , description:action.payload.des , actionVerb:action.payload.act};

    case "CLOSE_MODAL":
      return {...state,  isOpen: false };

    case "TOGGLE_MODAL":
      return { ...state, isOpen: !state.isOpen };

    case "CHANGE_FUNC":
   
      return {...state, onConfirm:action.payload}

    default:
      return state;
  }
};