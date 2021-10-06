import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
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

  toDoTaskList: MyTask[] = [];
  doneTaskList: MyTask[] = [];

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

  removeToDoTask(task: any) {
    this.tasksService.remove(this.toDoTaskName, task);

  }

  removeDoneTask(task: any) {
    this.tasksService.remove(this.doneTaskName, task);
  }

  markAsDone(task: any) {
    this.removeToDoTask(task);
    this.addDoneTask(task);
  }

  revertDoneTask(task: any) {
    this.removeDoneTask(task);
    this.addToDoTask(task);
  }

  renameTaskName(task: any) {
    if (task.TaskName == "") { return; }

    for (let i = 0; i < this.toDoTaskList.length; i++) {
      if (this.toDoTaskList[i].Order == task.Order) {
        this.toDoTaskList[i].TaskName = task.TaskName;
      }
    }
    this.taskNameEdited = "";
    this.activeLine = -1;

  }

  drop(list: any[], event: any) {
    moveItemInArray(list, event.previousIndex, event.currentIndex);
  }
  getToDoTaskList() {
    return this.toDoTaskList = this.tasksService.getList(this.toDoTaskName);
  }
  getDoneTaskList() {
    return this.doneTaskList = this.tasksService.getList(this.doneTaskName);
  }
}
