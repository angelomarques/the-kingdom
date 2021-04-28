import Head from "next/head";
import Image from "next/image"

import Countdown from "../components/Countdown";
import AppHeader from "../components/header/AppHeader";

import styles from "../styles/Home.module.scss";

function home() {
  return (
    <div className={`${styles.home} container`}>
      <Head>
        <title>The Kingdom | Home</title>
      </Head>
      <AppHeader />

      <h1 className={styles.home__header}>Welcome, "user"</h1>

      <section className={styles.home__content}>
        <Countdown />
        <img src="/images/soldier.png" alt="soldier" className={styles.home__image}/>
      </section>
    </div>
  );
}

export default home;
