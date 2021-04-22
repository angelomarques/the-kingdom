import { createContext, useState } from "react";

export const DataContext = createContext({});

export function DataProvider({ children, ...rest }) {
  const [user, setUser] = useState(null);

  return (
    <DataContext.Provider value={{ user }}>{children}</DataContext.Provider>
  );
}
