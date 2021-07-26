import { useRouter } from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";

import AuthProvider from "../contexts/AuthContext";
import { DataProvider } from "../contexts/DataContext";
import { ModalProvider } from "../contexts/ModalContext";

// styles for the progressbar
import "react-circular-progressbar/dist/styles.css";
import "../styles/base.scss";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  // this next lines of code starts and finish the loader
  const router = useRouter();

  useEffect(() => {
    let routeChangeStart = () => NProgress.start();
    let routeChangeComplete = () => NProgress.done();

    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeComplete);
    router.events.on("routeChangeError", routeChangeComplete);
    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeComplete", routeChangeComplete);
      router.events.off("routeChangeError", routeChangeComplete);
    };
  }, []);

  return (
    <AuthProvider>
      <DataProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default MyApp;
