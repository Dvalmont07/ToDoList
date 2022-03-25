
import { IBaseEntity } from "./iBaseEntity";
export interface ITask extends IBaseEntity {
  Id?: number;
  TaskName: string;
  //Order: number;
  Done: boolean;
  Today: boolean;
  Category?: number
  Favorite: boolean;
  //TODO  ScheduledTo?: boolean
  //TODO RepeatyType Enum [daily, weekdeays, weekly, monthly, annualy, custom ]
  //if custum
  //TODO RepeatQuntity:
  //TODO RepeatUnit: Number

  //TODO remindMe: Date
}
