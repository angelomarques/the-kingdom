import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt">
        <Head>
          {/* <link
            rel="shortcut icon"
            href="/document-icon.svg"
            type="image/x-icon"
          /> */}
          <link rel="icon" href="/images/helmet-favicon.png" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Montserrat:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />

          {/* styles for the loader */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
