import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { auth, db, firebase } from "../services/firebase";
import { ContextProviderProps } from "../types/ContextProviderProps";

type AuthContextType = {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: Dispatch<SetStateAction<boolean>>;
  signup: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  signout: () => Promise<void>;
  loginWithEmail: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  loginWithUsername: (
    username: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  loginError: string;
  setLoginError: Dispatch<SetStateAction<string>>;
  registerError: string;
  setRegisterError: Dispatch<SetStateAction<string>>;
  user: string;
  setUser: Dispatch<SetStateAction<string>>;
};

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: ContextProviderProps) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [user, setUser] = useState("");

  function loginWithEmail(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  async function loginWithUsername(username: string, password: string) {
    let userEmail: string;
    try {
      await db
        .collection("users")
        .doc(username)
        .get()
        .then((doc) => {
          if (doc.exists) {
            userEmail = doc.data().email;
            return;
          }

          setLoginError("There is no such user!");
        });
      return loginWithEmail(userEmail, password);
    } catch {
      setUser("");
      setLoginError("there is a error");
    }
  }

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signout() {
    return auth.signOut();
  }

  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        signup,
        signout,
        loginWithUsername,
        loginWithEmail,
        loginError,
        setLoginError,
        registerError,
        setRegisterError,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
