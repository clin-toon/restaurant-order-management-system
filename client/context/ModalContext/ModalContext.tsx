"use client";

import { createContext, useReducer } from "react";
import { ModalReducer } from "./ModalReducer";
import {
  ModalState,
  ModalContextType,
  ModalProviderProps,
  openModalType,
} from "@/types/ModalContextType";
import ConfirmModal from "@/components/Reuseable/Modal";

const INITIAL_STATE: ModalState = {
  isOpen: false,
  title: "",
  description: "",
  onConfirm: () => {},
  actionVerb: "",
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [state, dispatch] = useReducer(ModalReducer, INITIAL_STATE);

  const openModal = (obj: openModalType) =>
    dispatch({ type: "OPEN_MODAL", payload: obj });

  const closeModal = () => dispatch({ type: "CLOSE_MODAL" });

  const toggleModal = () => dispatch({ type: "TOGGLE_MODAL" });

  const changeOnConfirm = (func: () => void) => {
    dispatch({ type: "CHANGE_FUNC", payload: func });
  };

  return (
    <ModalContext.Provider
      value={{
        state,
        dispatch,
        openModal,
        closeModal,
        toggleModal,
        changeOnConfirm,
      }}
    >
      {children}

      {state.isOpen && (
        <ConfirmModal
          open={state.isOpen}
          title={state.title}
          description={state.description}
          onConfirm={state.onConfirm}
          actionWord={state.actionVerb}
          onOpenChange={toggleModal}
        />
      )}
    </ModalContext.Provider>
  );
};
