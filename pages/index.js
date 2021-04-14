import Head from "next/head";
import styles from "../styles/Index.module.scss";


import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export default function LandingPage() {
  let showRegisterForm = true;

  return (
    <div className={`container ${styles.landingPage}`}>
      <Head>
        <title>Welcome to the Kingdom</title>
        <link rel="icon" href="/images/helmet-favicon.png" />
      </Head>
      <h1 className={styles.landingPage__headline}>
        Welcome to the productivity kingdom app
      </h1>
      {showRegisterForm ? <RegisterForm /> : <LoginForm/>}
    </div>
  );
}
