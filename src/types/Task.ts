export type Task = {
  timeSet: string;
  taskTime: number;
  taskLabel: string;
  timeStandard?: string;
  taskTimeRange?: string;
  date?: string;
};

type DataInfo = {
  tasksCompletedLength: number;
  totalTime: number;
};

export interface TasksData extends DataInfo {
  months: DataInfo & {
    [month: string | number]: DataInfo & {
      [day: string | number]: DataInfo & { tasksCompleted: Task[] };
    };
  };
  lastSessionDate: string;
  daysInARow: number;
};
