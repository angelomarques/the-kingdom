import { useEffect } from "react";

import AuthProvider from "../contexts/AuthContext";
import { DataProvider } from "../contexts/DataContext";
import { ModalProvider } from "../contexts/ModalContext";

import "../styles/base.scss";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
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
