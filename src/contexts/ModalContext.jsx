import { createContext, useContext, useEffect, useState } from "react";

export const ModalContext = createContext({});

export function useModalContext() {
  return useContext(ModalContext);
}

export function ModalProvider({ children, ...rest }) {
  const [formOpened, setFormOpened] = useState("login");
  const [settingsModalClass, setSettingsModalClass] = useState("fade-out modal");

  return (
    <ModalContext.Provider
      value={{
        formOpened,
        setFormOpened,
        settingsModalClass,
        setSettingsModalClass,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
