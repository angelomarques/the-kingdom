import Head from "next/head";
import { useEffect, useState } from "react";

import BreakCountdown from "../components/BreakCountdown";
import Countdown from "../components/Countdown";
import AppHeader from "../components/header/AppHeader";
import HomeModal from "../components/modals/HomeModal";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { useModalContext } from "../contexts/ModalContext";
import { auth, db } from "../services/firebase";
import { getDate } from "../utils/taskSection";

import styles from "../styles/Home.module.scss";

function home() {
  const { user, setUser } = useAuth();
  const { setLabels, isBreakActive, isTimerRunning } = useData();
  const { modal, isModalActive } = useModalContext();

  const [showModal, setShowModal] = useState(false);
  const [titleMessage, setTitleMessage] = useState(
    "Welcome, today you have focused for 0 min"
  );
  const [year, month, day] = getDate();

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

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user)
        .collection("tasksCompleted")
        .doc(year)
        .onSnapshot((doc) => {
          if (doc.exists) {
            const todayObject = doc.data().months[month][day];

            if (todayObject) {
              const tasksCompletedLength =
                todayObject.tasksCompletedLength || 1;

              let minutesFocused = 0;
              for (let i = 0; i < tasksCompletedLength; i++) {
                const time = todayObject.tasksCompleted[i].taskTime;
                minutesFocused += time / 60;
              }
              setTitleMessage(`Today you focused for ${minutesFocused} min`);
            }
          }
        });
    }
  }, [user]);
  if (!user) {
    // set the user state
    setUserLogged();
  }

  useEffect(() => {
    if (isBreakActive) {
      const date = new Date();
      const breakOverTime = date.getTime();
      setTitleMessage(
        `Break time! you next session starts at ${breakOverTime}`
      );
    } else if (isTimerRunning) {
      setTitleMessage("Focus!");
    }
  }, [isBreakActive, isTimerRunning]);

  useEffect(() => {
    if (isModalActive) {
      setShowModal(true);
      return;
    }

    setTimeout(() => {
      setShowModal(false);
    }, 500);
  }, [isModalActive]);

  return (
    <div className={`${styles.home} container modalActive`}>
      <Head>
        <title>The Kingdom | Home</title>
      </Head>
      <AppHeader />

      <h1 className={styles.home__header}>{titleMessage}</h1>

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
      {showModal && <HomeModal modalName={modal} />}
    </div>
  );
}

export default home;
