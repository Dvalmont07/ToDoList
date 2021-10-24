import { MyTask } from 'src/app/interfaces/myTask';

export const TODOTASKSLIST: MyTask[] = [
  { TaskName: 'Task 01', Order: 1, Done: false, Today: false, Category: 1 },
  { TaskName: 'Task 02', Order: 2, Done: false, Today: true, Category: 1 },
  { TaskName: 'Done Task 01', Order: 4, Done: true, Today: false, Category: 2 },
  { TaskName: 'Done Task 02', Order: 5, Done: true, Today: false, Category: 1 },
  { TaskName: 'Done Task 03', Order: 6, Done: true, Today: false, Category: 2 },
];

// export const DONETASKSLIST: MyTask[] = [
//   { TaskName: 'Done Task 01', Order: 1, Done: true, Today: false },
//   { TaskName: 'Done Task 02', Order: 2, Done: true, Today: false },
//   { TaskName: 'Done Task 03', Order: 3, Done: true, Today: false },
// ];
