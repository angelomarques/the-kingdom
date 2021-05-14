import { createContext, useContext, useState } from "react";

import { db } from "../services/firebase";

export const DataContext = createContext({});

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children, ...rest }) {
  const [labels, setLabels] = useState([]);

 async function getLabels(user) {
    let labels;
    await db.collection("users")
      .doc(user)
      .get()
      .then((doc) => {
        labels = doc.data().labels;
      })
      .catch((err) => alert(err.message));
    return labels;
  }

  function addLabel(){}

  return (
    <DataContext.Provider value={{ labels, setLabels, getLabels }}>{children}</DataContext.Provider>
  );
}
