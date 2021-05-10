import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BiLogOut } from "react-icons/bi";

import Countdown from "../components/Countdown";
import AppHeader from "../components/header/AppHeader";
import ModalButton from "../components/ModalButton";
import { useAuth } from "../contexts/AuthContext";
import { useModalContext } from "../contexts/ModalContext";
import { auth, db } from "../services/firebase";

import styles from "../styles/Home.module.scss";

function home() {
  const router = useRouter();
  const { settingsModalClass, setSettingsModalClass } = useModalContext();
  const { signout, setIsUserLoggedIn, user, setUser } = useAuth();


  function setUserLogged(){
    auth.onAuthStateChanged(user=>{
      if(user){
        db.collection("users")
        .where("email", "==", user.email)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => setUser(doc.data().username));
        });
      }
    })
  }

  useEffect(() => {
    // set the user state
    setUserLogged();

    // handle setting modal
    if (settingsModalClass == "fade-in modal") {
      document.body.style.overflowY = "hidden";
      return;
    }
    document.body.style.overflowY = "visible";
  }, [settingsModalClass]);

  function logoutUser() {
    return signout()
      .then(() => {
        router.push("/");
        setIsUserLoggedIn(false);
        setUser("");
        setSettingsModalClass("fade-out modal");
      })
      .catch((err) => alert(err));
  }

  function closeSettingsModal(){
    return setSettingsModalClass("fade-out modal")
  }

  return (
    <div className={`${styles.home} container modalActive`}>
      <Head>
        <title>The Kingdom | Home</title>
      </Head>
      <AppHeader />

      <h1 className={styles.home__header}>Welcome, {user}</h1>

      <section className={styles.home__content}>
        <Countdown />
        <img
          src="/images/soldier.png"
          alt="soldier"
          className={styles.home__image}
        />
      </section>
      <section className={settingsModalClass}>
        <div className="modal__content">
          <ModalButton handleClick={closeSettingsModal} btnType="close" />
          <button onClick={logoutUser}>
            <BiLogOut className="buttonIcons" />
            <span>Log out</span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default home;
