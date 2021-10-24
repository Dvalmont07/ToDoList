import { MyTask } from 'src/app/interfaces/myTask';

export const TODOTASKSLIST: MyTask[] = [
  { Id: 1, TaskName: 'Task 01', Order: 0, Done: false, Today: false, Category: 1 },
  { Id: 2, TaskName: 'Task 02', Order: 1, Done: false, Today: true, Category: 1 },
  { Id: 3, TaskName: 'Done Task 01', Order: 2, Done: true, Today: false, Category: 2 },
  { Id: 4, TaskName: 'Done Task 02', Order: 3, Done: true, Today: false, Category: 1 },
  { Id: 5, TaskName: 'Done Task 03', Order: 4, Done: true, Today: false, Category: 2 },
];