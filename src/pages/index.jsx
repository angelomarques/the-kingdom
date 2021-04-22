import Head from "next/head";
import styles from "../styles/Index.module.scss";
import { useContext } from "react";

import { ModalContext } from "../contexts/ModalContext";
import RegisterForm from "../components/forms/RegisterForm";
import LoginForm from "../components/forms/LoginForm";

export default function LandingPage() {
  const { formOpened } = useContext(ModalContext);

  return (
    <div className={`container ${styles.landingPage}`}>
      <Head>
        <title>Welcome to the Kingdom</title>
      </Head>
      <h1 className={styles.landingPage__headline}>
        Welcome to the productivity kingdom app
      </h1>
      {formOpened == "register" ? <RegisterForm /> : <LoginForm />}
    </div>
  );
}
