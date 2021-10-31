import { useRef, FormEventHandler } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { useModalContext } from "../../contexts/ModalContext";
import { auth, db } from "../../services/firebase";
import ModalButton from "../ModalButton";

function RegisterForm() {
  const { setFormOpened } = useModalContext();
  const { 
    setIsUserLoggedIn, 
    signup, 
    registerError, 
    setRegisterError 
  } = useAuth();
  const formRef = useRef(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    // retrieving form values
    const name = formRef.current["name"].value;
    const email = formRef.current["email"].value;
    const username = formRef.current["username"].value;
    const password = formRef.current["password"].value;
    const confirmPassword = formRef.current["confirmPassword"].value;

    if (password != confirmPassword) {
      setRegisterError(
        "the password input and the confirm password input did not match!"
      );
      return;
    }

    const date = new Date().toLocaleDateString();
    const userRef = {
      name,
      email,
      username,
      signupDate: date,
      labels: [{ label: "study", color: "#000000", lastSelected: true }],
    };

    signup(email, password)
      .then(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            db.collection("users")
              .doc(user.uid)
              .set(userRef)
              .then(() => console.log("ok"))
              .catch((err) => setRegisterError(err.message));
            setIsUserLoggedIn(true);
            return;
          }
          setRegisterError("there is a error in the user registering!");
        });
      })
      .catch((err) => {
        setRegisterError(err.message);
      });

    formRef.current.reset();
  }

  function back() {
    setFormOpened("login");
  }

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      action="#"
      className="form register"
    >
      <ModalButton handleClick={back} btnType="back" />
      <span className="form__errMessage register">{registerError}</span>
      <h2 className="form__headline">Login or register your account</h2>

      <div className="form__inputs">
        <fieldset>
          <input
            autoFocus
            type="text"
            name="name"
            placeholder=" "
            id="registerName"
            required
          />
          <label htmlFor="name">Name</label>
        </fieldset>

        <fieldset>
          <input
            type="email"
            name="email"
            placeholder=" "
            id="registerEmail"
            required
          />
          <label htmlFor="email">Email</label>
        </fieldset>

        <fieldset>
          <input
            type="text"
            name="username"
            placeholder=" "
            id="registerUsername"
            required
          />
          <label htmlFor="registerName">Username</label>
        </fieldset>

        <fieldset>
          <input
            type="password"
            name="password"
            placeholder=" "
            id="registerPassword"
            required
          />
          <label htmlFor="password">Password</label>
        </fieldset>

        <fieldset>
          <input
            type="password"
            name="confirmPassword"
            placeholder=" "
            id="confirmPassword"
            required
          />
          <label htmlFor="confirmPassword">Confirm password</label>
        </fieldset>
      </div>

      <fieldset className="form__buttons">
        <button type="submit">Register</button>
      </fieldset>
    </form>
  );
}

export default RegisterForm;
