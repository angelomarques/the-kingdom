import Head from "next/head";

import AppHeader from "../components/header/AppHeader";

function home() {
  return (
    <div className="container">
      <Head>
        <title>The Kingdom | Home</title>
      </Head>
      <AppHeader/>
      <h1>Welcome, "user"</h1>
      {/*Countdown */}
      {/*SoldierImage */}
    </div>
  );
}

export default home;
