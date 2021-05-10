import { useContext, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ModalContext } from "../../contexts/ModalContext";
import { auth, db } from "../../services/firebase";

function LoginForm() {
  const {
    loginWithUsername,
    loginWithEmail,
    loginError,
    setLoginError,
    setIsUserLoggedIn,
    setUser,
  } = useAuth();
  const { setFormOpened } = useContext(ModalContext);
  const [animationClass, setAnimationClass] = useState("fade-in");
  const loginFormRef = useRef(null);

  function openRegisterForm() {
    setAnimationClass("fade-out");

    setTimeout(() => setFormOpened("register"), 300);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const userEmail = loginFormRef.current["user-email"].value;
    const password = loginFormRef.current["password"].value;
    let loginWith = "username";

    const userEmailSplited = userEmail.split("");
    for (let i in userEmailSplited) {
      if (userEmailSplited[i] == "@") {
        loginWith = "email";
      }
    }

    if (loginWith == "username") {
      loginWithUsername(userEmail, password)
        .then(() => {
          auth.onAuthStateChanged((user) => {
            if (user) {
              setIsUserLoggedIn(true);
              return;
            }
            setLoginError("there is no user logged in");
          });
        })
        .catch((err) => {
          setUser("");
          setLoginError(err.message);
        });
      return;
    }

    loginWithEmail(userEmail, password).then(() => setIsUserLoggedIn(true));
  }

  return (
    <form
      onSubmit={handleSubmit}
      ref={loginFormRef}
      className={`form login ${animationClass}`}
    >
      <h2 className="form__headline">Login or register your account</h2>

      <div className="form__inputs">
        <fieldset>
          <input
            type="text"
            name="user-email"
            id="user-email"
            placeholder=" "
            required
          />
          <label htmlFor="user-email">Username or email</label>
        </fieldset>

        <fieldset>
          <input
            type="password"
            name="password"
            id="password"
            placeholder=" "
            required
          />
          <label htmlFor="password">Password</label>
        </fieldset>
      </div>

      <span className="form__errMessage login">{loginError}</span>

      <fieldset className="form__buttons">
        <a onClick={openRegisterForm}>Register a new account</a>
        <button type="submit">Login</button>
      </fieldset>
    </form>
  );
}

export default LoginForm;
