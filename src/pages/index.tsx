import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import nookies from 'nookies';
import { GetServerSidePropsContext } from "next";

import { firebaseAdmin } from "../services/firebaseAdmin";
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


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    const { uid, email } = token;

    ctx.res.writeHead(302, { Location: '/home' });
    ctx.res.end();

    return {
      props: { message: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    return { props: {} as never };
  }
}