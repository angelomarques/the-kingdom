import { createContext, useContext, useState } from "react";
import { auth, db } from "../firebase";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [user, setUser] = useState('');

  function loginWithEmail(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  async function loginWithUsername(username, password) {
    let userEmail;
    try {
      await db.collection("users")
        .doc(username)
        .get()
        .then((doc) => {
          if (doc.exists) {
            userEmail = doc.data().email;
            setUser(doc.data().name)
            return;
          }

          // if can't find the user document, then resets the user's state
          setUser('')
          setLoginError("There is no such user!");
        });
      return loginWithEmail(userEmail, password)
    } catch {
      setUser('')
      setLoginError("there is a error");
    }
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function signout(){
    return auth.signOut()
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
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
