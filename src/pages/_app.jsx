import AuthProvider from "../contexts/AuthContext";
import { ModalProvider } from "../contexts/ModalContext";
import "../styles/base.scss";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </AuthProvider>
  );
}

export default MyApp;
