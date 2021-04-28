import { ModalProvider } from "../contexts/ModalContext";
import "../styles/base.scss";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  );
}

export default MyApp;
