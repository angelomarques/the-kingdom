import ModalButton from "../ModalButton";

function RegisterForm() {
  return (
    <form action="#" className="form register">
      <ModalButton btnType="back" />
      <h2 className="form__headline">Login or register your account</h2>

      <div className="form__inputs">
        <fieldset>
          <input type="text" name="name" id="registerName" />
          <label htmlFor="name">Name</label>
        </fieldset>

        <fieldset>
          <input type="email" name="email" id="registerEmail" />
          <label htmlFor="email">Email</label>
        </fieldset>

        <fieldset>
          <input type="text" name="username" id="registerUsername" />
          <label htmlFor="registerName">Username</label>
        </fieldset>

        <fieldset>
          <input type="password" name="password" id="registerPassword" />
          <label htmlFor="password">Password</label>
        </fieldset>

        <fieldset>
          <input type="password" name="confirmPassword" id="confirmPassword" />
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
