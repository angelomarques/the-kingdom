import { createContext, useEffect, useState } from "react";

export const ModalContext = createContext({});

export function ModalProvider({ children, ...rest }) {
  const [formOpened, setFormOpened] = useState("login");

  return (
    <ModalContext.Provider value={{ formOpened, setFormOpened }}>
      {children}
    </ModalContext.Provider>
  );
}
