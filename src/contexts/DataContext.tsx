import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

import { db } from "../services/firebase";
import { ContextProviderProps } from "../types/ContextProviderProps";
import { Label } from "../types/Label";
import { Task } from "../types/Task";

type DataContextType = {
  labels: Label[];
  setLabels: Dispatch<SetStateAction<Label[]>>;
  isBreakActive: boolean;
  setIsBreakActive: Dispatch<SetStateAction<boolean>>;
  isTimerRunning: boolean;
  setIsTimerRunning: Dispatch<SetStateAction<boolean>>;
  lastTask: Task;
  setLastTask: Dispatch<SetStateAction<Task>>;
  getLabels: (user: string) => Promise<Label[]>;
}

export const DataContext = createContext({} as DataContextType);

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }: ContextProviderProps) {
  const [labels, setLabels] = useState([] as Label[]);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // this state is for use on the cancel task for remove of the firestore
  const [lastTask, setLastTask] = useState({} as Task);

  async function getLabels(user: string) {
    let labels: Label[];
    await db
      .collection("users")
      .doc(user)
      .get()
      .then((doc) => {
        labels = doc.data().labels;
      })
      .catch((err) => alert(err.message));
      console.log(labels)
    return labels;
  }

  function addLabel() {}

  return (
    <DataContext.Provider
      value={{
        labels,
        setLabels,
        getLabels,
        lastTask,
        setLastTask,
        isTimerRunning,
        setIsTimerRunning,
        isBreakActive,
        setIsBreakActive,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
