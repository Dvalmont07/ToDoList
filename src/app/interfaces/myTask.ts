import { Category } from "./category";

export interface MyTask {
  Id?: number;
  TaskName: string;
  //Order: number;
  Done: boolean;
  Today: boolean;
  Category?: number
  //TODO  ScheduledTo?: boolean
  //TODO RepeatyType Enum [daily, weekdeays, weekly, monthly, annualy, custom ]
  //if custum
  //TODO RepeatQuntity:
  //TODO RepeatUnit: Number

  //TODO remindMe: Date
}
