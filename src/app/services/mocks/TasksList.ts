import { ITask } from 'src/app/interfaces/iTask';

export const TODOTASKSLIST: ITask[] = [
  { Id: 1, TaskName: 'Task 01', Done: false, Today: false, Category: 1 },
  { Id: 2, TaskName: 'Task 02', Done: false, Today: true, Category: 1 },
  { Id: 3, TaskName: 'Done Task 01', Done: true, Today: false, Category: 2 },
  { Id: 4, TaskName: 'Done Task 02', Done: true, Today: false, Category: 1 },
  { Id: 5, TaskName: 'Done Task 03', Done: true, Today: false, Category: 2 },
];