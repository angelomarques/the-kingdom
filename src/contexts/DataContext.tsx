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
  finishedTask: Task;
  setFinishedTask: Dispatch<SetStateAction<Task>>;
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
  const [finishedTask, setFinishedTask] = useState({} as Task);

  // function addLabel() {}

  return (
    <DataContext.Provider
      value={{
        labels,
        setLabels,
        finishedTask,
        setFinishedTask,
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
