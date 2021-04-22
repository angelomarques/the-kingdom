import Link from "next/link";
import { useContext, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";

function LoginForm() {
  const { setFormOpened } = useContext(ModalContext);
  const [animationClass, setAnimationClass] = useState("fade-in");

  function openRegisterForm() {
    setAnimationClass("fade-out");

    setTimeout(() => setFormOpened("register"), 300);
  }

  function handleSubmit(e){
    e.preventDefault
  }

  return (
    <form onSubmit={handleSubmit} action="#" className={`form login ${animationClass}`}>
      <h2 className="form__headline">Login or register your account</h2>

      <div className="form__inputs">
        <fieldset>
          <input type="text" name="user-email" id="user-email" />
          <label htmlFor="user-email">Username or email</label>
        </fieldset>

        <fieldset>
          <input type="password" name="password" id="password" />
          <label htmlFor="password">Password</label>
        </fieldset>
      </div>

      <fieldset className="form__buttons">
        <a onClick={openRegisterForm}>Register a new account</a>
        <Link href="/home">
          <button type="submit">Login</button>
        </Link>
      </fieldset>
    </form>
  );
}

export default LoginForm;
