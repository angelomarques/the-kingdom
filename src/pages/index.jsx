import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useModalContext } from "../contexts/ModalContext";
import RegisterForm from "../components/forms/RegisterForm";
import LoginForm from "../components/forms/LoginForm";
import { useAuth } from "../contexts/AuthContext";

import styles from "../styles/Index.module.scss";

export default function LandingPage() {
  const router = useRouter();
  const { isUserLoggedIn } = useAuth();
  const { formOpened } = useModalContext();

  // This checks if there is an user and if has, then it will redirect to the home page
  useEffect(() => {
    if (isUserLoggedIn) {
      router.push("/home");
    }
  }, [isUserLoggedIn]);

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
