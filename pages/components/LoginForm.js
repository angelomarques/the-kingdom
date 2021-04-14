function LoginForm() {
  return (
    <form action="#" className="form login">
      <h2 className="form__headline">
        Login or register your account
      </h2>

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
        <a>Register a new account</a>
        <button type="submit">Login</button>
      </fieldset>
    </form>
  );
}

export default LoginForm;
