import { useEffect } from "react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import nookies from 'nookies';

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
  user: firebase.User;
  setUser: Dispatch<SetStateAction<firebase.User>>;
};

const AuthContext = createContext({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: ContextProviderProps) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => firebase.auth().onIdTokenChanged(async (user) => {
    if(!user) {
      setUser(null);
      setIsUserLoggedIn(false)
      nookies.set(undefined, 'token', '', { path: '/' });
    } else {
      const token = await user.getIdToken();
      setUser(user);
      setIsUserLoggedIn(true)
      nookies.set(undefined, 'token', token, { path: '/' });
    }
  }), []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  function loginWithEmail(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  async function loginWithUsername(username: string, password: string) {
    let email: string;
    try {
      await db.collection("users").where('username', '==', username).get().then(snapshot => {
        snapshot.forEach(doc=>{
          email=doc.data().email;
        })
        if(snapshot.empty) {
          setLoginError('there is no such user')
        }
      }).catch(err=> console.error(err));
      return loginWithEmail(email, password);
    } catch (err) {
      setUser(null);
      setLoginError(err.message);
    }
  }

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signout() {
    setUser(null);
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
