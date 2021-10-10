import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { arrayHelper } from './helper/arrayHelper';
import { MyTask } from './interfaces/myTask';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private tasksService: TasksService) { }

  title = 'ToDoList';
  taskName: string = "";
  taskNameEdited: string = "";
  activeLine: number = -1;
  searchText: string = "";

  toDoTaskList: MyTask[] = []
  doneTaskList: MyTask[] = []

  toDoTaskName: string = "toDoTaskList";
  doneTaskName: string = "doneTaskList";

  ngOnInit(): void {
    this.getToDoTaskList();
    this.getDoneTaskList();
  }


  addToDoTask(task: MyTask) {
    if (this.tasksService.add(this.toDoTaskName, task)) {
      this.taskName = "";
    }
  }

  addDoneTask(task: MyTask) {
    this.tasksService.add(this.doneTaskName, task);
  }

  removeToDoTask(task: any): boolean {
    return this.tasksService.remove(this.toDoTaskName, task);
  }

  removeDoneTask(task: any): boolean {
    return this.tasksService.remove(this.doneTaskName, task);
  }

  markAsDone(task: any) {
    if (this.removeToDoTask(task)) {
      this.addDoneTask(task);
    }
  }

  revertDoneTask(task: any) {
    if (this.removeDoneTask(task)) {
      this.addToDoTask(task);
    }
  }

  renameTaskName(task: any) {
    if (task.TaskName == "") { return; }

    this.tasksService.rename(this.toDoTaskName, task);
    this.taskNameEdited = "";
    this.activeLine = -1;
  }

  drop(list: any[], event: any) {

    moveItemInArray(list, event.previousIndex, event.currentIndex);
    arrayHelper.saveToSession(list);
  }
  getToDoTaskList() {
    return this.tasksService.get(this.toDoTaskName).subscribe(t => this.toDoTaskList = t);
  }
  getDoneTaskList() {
    return this.tasksService.get(this.doneTaskName).subscribe(t => this.doneTaskList = t);
  }
}
