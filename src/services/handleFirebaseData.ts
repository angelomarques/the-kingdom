import { db } from "./firebase";

export const handleTasksCompleted = (docYear: string, userUid: string) => {
  return db
    .collection("users")
    .doc(userUid)
    .collection("tasksCompleted")
    .doc(docYear);
};
