import Head from "next/head";
import { useState } from "react";

import BreakCountdown from "../components/BreakCountdown";
import Countdown from "../components/Countdown";
import AppHeader from "../components/header/AppHeader";
import HomeModal from "../components/modals/HomeModal";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { useModalContext } from "../contexts/ModalContext";
import { auth, db } from "../services/firebase";

import styles from "../styles/Home.module.scss";

function home() {
  const { user, setUser } = useAuth();
  const { setLabels } = useData();
  const { modal } = useModalContext();

  const [isBreakActive, setIsBreakActive] = useState(true);

  function setUserLogged() {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        db.collection("users")
          .where("email", "==", userAuth.email)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              const username = doc.data().username;
              setUser(username);

              db.collection("users")
                .doc(username)
                .onSnapshot((doc) => {
                  setLabels(doc.data().labels);
                });
            });
          });
      }
    });
  }

  if (!user) {
    // set the user state
    setUserLogged();
  }

  return (
    <div className={`${styles.home} container modalActive`}>
      <Head>
        <title>The Kingdom | Home</title>
      </Head>
      <AppHeader />

      <h1 className={styles.home__header}>Welcome, {user}</h1>

      <section
        className={
          isBreakActive
            ? `${styles.home__content} ${styles.withBreakCountdown}`
            : styles.home__content
        }
      >
        {isBreakActive ? (
          <BreakCountdown />
        ) : (
          <>
            <Countdown />
            <img
              src="/images/soldier.png"
              alt="soldier"
              className={styles.home__image}
            />
          </>
        )}
      </section>
      <HomeModal modalName={modal} />
    </div>
  );
}

export default home;
