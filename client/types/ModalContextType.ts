import { ReactNode } from "react";

export type ModalState = {
  isOpen: boolean;
  title:string
  description:string
  onConfirm:()=>void
  actionVerb?:string
};

export type openModalType = {
  title: string;
  des: string;
  func?: () => void;
  act?:string
};
export type ModalAction = { type: "OPEN_MODAL"  , payload:{}}| { type: "CLOSE_MODAL" }| { type: "TOGGLE_MODAL" };

export type ModalContextType = {
  state: ModalState;
  dispatch: React.Dispatch<ModalAction>;
  openModal: (obj:openModalType) => void;
  closeModal: () => void;
  toggleModal: () => void;
  changeOnConfirm:(func:()=>void )=> void;
};

export type ModalProviderProps = {
  children: ReactNode;
};

