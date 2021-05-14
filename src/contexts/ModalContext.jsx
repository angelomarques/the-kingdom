import { createContext, useContext, useState } from "react";

export const ModalContext = createContext({});

export function useModalContext() {
  return useContext(ModalContext);
}

export function ModalProvider({ children, ...rest }) {
  const [formOpened, setFormOpened] = useState("login");
  const [modalClass, setModalClass] = useState("fade-out modal");
  const [modal, setModal] = useState("");
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
        setIsModalActive
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
