import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { ContextProviderProps } from "../types/ContextProviderProps";
import { FormOpenedType, ModalClassType, ModalType } from "../types/Modal";

type ModalContextType = {
  formOpened: FormOpenedType;
  setFormOpened: Dispatch<SetStateAction<FormOpenedType>>;
  modalClass: ModalClassType;
  setModalClass: Dispatch<SetStateAction<ModalClassType>>;
  modal: ModalType;
  setModal: Dispatch<SetStateAction<ModalType>>;
  isModalActive: boolean;
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = createContext({} as ModalContextType);

export function useModalContext() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }: ContextProviderProps) {
  const [formOpened, setFormOpened] = useState<FormOpenedType>("login");
  const [modalClass, setModalClass] = useState<ModalClassType>("fade-out modal");
  const [modal, setModal] = useState<ModalType>("");
  const [isModalActive, setIsModalActive] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        formOpened,
        setFormOpened,
        modalClass,
        setModalClass,
        modal,
        setModal,
        isModalActive,
        setIsModalActive,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
