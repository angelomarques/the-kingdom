import Head from "next/head";
import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import nookies from 'nookies';
import { firebaseAdmin } from "../services/firebaseAdmin";

import BreakCountdown from "../components/BreakCountdown";
import Countdown from "../components/Countdown";
import AppHeader from "../components/header/AppHeader";
import HomeModal from "../components/modals/HomeModal";
import { useAuth } from "../contexts/AuthContext";
import { useData } from "../contexts/DataContext";
import { useModalContext } from "../contexts/ModalContext";
import { db } from "../services/firebase";
import {
  convertSecondsToTime,
  convertTimeToSeconds,
  getDate,
} from "../utils/taskSection";

import styles from "../styles/Home.module.scss";
import { Label } from "../types/Label";
import { handleTasksCompleted } from "../services/handleFirebaseData";
import { TasksData } from "../types/Task";
import moment from "moment";
interface HomeProps {
  labels: Label[]; 
  tasksCompletedLength: number;
  minutesFocused?: number;
}

function home({labels, tasksCompletedLength, minutesFocused}: HomeProps) {
  const { user, setUser } = useAuth();
  const { setLabels, isBreakActive, isTimerRunning } = useData();
  const { modal, isModalActive } = useModalContext();

  const [showModal, setShowModal] = useState(false);
  const [titleMessage, setTitleMessage] = useState(
    "Welcome, today you haven't focused yet"
  );
  const [year, month, day] = getDate();

  useEffect(() => {
    setLabels(labels)
    if(minutesFocused && !isBreakActive) {
      setTitleMessage(`Today you focused for ${minutesFocused} min`);
      return;
    } 
  }, [user]);

  useEffect(() => {
    if (isBreakActive) {
      const date = new Date();
      const breakOverTimeInSeconds = convertTimeToSeconds(
        date.toTimeString().split(" ")[0]
      );
      const breakOverTime = convertSecondsToTime(
        breakOverTimeInSeconds + 10 * 60
      )
        .split(":")
        .slice(0, 2)
        .join(":");
      setTitleMessage(
        `Break time! you next session starts at ${breakOverTime}`
      );
    } else if (isTimerRunning) {
      setTitleMessage("Focus!");
    } else if (user) {
      handleTasksCompleted(year, user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const currentMonthData = doc.data().months[month];

          if (currentMonthData && !isBreakActive) {
            if (currentMonthData[day]) {
              const minutesFocused = currentMonthData[day].totalTime / 60;
              setTitleMessage(`Today you focused for ${minutesFocused} min`);
            }
          }
        }
      });
    }
  }, [isBreakActive, isTimerRunning, user]);

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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    
    const { uid, email } = token;
    const user = await firebaseAdmin.auth().getUser(uid);

    let labels: Label[] = [];
    await firebaseAdmin.firestore().collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        labels = doc.data().labels;
      } 
    }).catch(err => console.error(err));

    const [year, month, day] = getDate();
    let tasksCompletedLength: number = 0;
    let minutesFocused: number = 0;

    await firebaseAdmin.firestore().collection("users")
        .doc(uid)
        .collection("tasksCompleted")
        .doc(year).get()
        .then((doc) => {
          const data = doc.data() as TasksData
          if (doc.exists && data?.months[month]) {
            const currentMonthData = data.months[month];

            if (currentMonthData) {
              if (currentMonthData[day]) {
                minutesFocused = currentMonthData[day].totalTime / 60;
              }
            }

            if (!data.months[month][day]) {
              tasksCompletedLength = 0;
              return;
            }
             tasksCompletedLength = data.months[month][day].tasksCompletedLength
          }

          const todaysDate = new Date().toDateString();
          const dateDifference = moment(todaysDate).diff(data.lastSessionDate, 'days');
          if (dateDifference > 1 && data.daysInARow !== 0) {
            handleTasksCompleted(year, uid).update({
              daysInARow: 0
            })
          }
          console.log(data.daysInARow)
        }).catch(error => console.error(error));
    
    return {
      props: { labels, tasksCompletedLength },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.error(err)
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();

    // `as never` prevents inference issues
    // with InferGetServerSidePropsType.
    // The props returned here don't matter because we've
    // already redirected the user.
    return { props: {} as never };
  }
}

export default home;
