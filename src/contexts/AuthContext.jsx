import { createContext, useContext } from "react";
import { auth } from "../firebase";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  return (
    <AuthContext.Provider value={{ signup }}>{children}</AuthContext.Provider>
  );
}
