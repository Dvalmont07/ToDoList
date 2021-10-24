import { MyTask } from 'src/app/interfaces/myTask';

export const TODOTASKSLIST: MyTask[] = [
  { TaskName: 'Task 01', Order: 1, Done: false, Today: false },
  { TaskName: 'Task 02', Order: 2, Done: false, Today: true },
  { TaskName: 'Done Task 01', Order: 4, Done: true, Today: false },
  { TaskName: 'Done Task 02', Order: 5, Done: true, Today: false },
  { TaskName: 'Done Task 03', Order: 6, Done: true, Today: false },
];

// export const DONETASKSLIST: MyTask[] = [
//   { TaskName: 'Done Task 01', Order: 1, Done: true, Today: false },
//   { TaskName: 'Done Task 02', Order: 2, Done: true, Today: false },
//   { TaskName: 'Done Task 03', Order: 3, Done: true, Today: false },
// ];
