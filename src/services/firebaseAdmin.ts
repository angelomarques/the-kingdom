import * as firebaseAdmin from "firebase-admin";

const serviceAccount = require("../../firebase-secret-key.json");

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://the-productivity-app.firebaseio.com",
  });
}

export { firebaseAdmin };
