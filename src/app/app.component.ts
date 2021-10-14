import { Component, OnInit } from '@angular/core';
import { MyTask } from './interfaces/myTask';
import { TasksService } from './services/tasks.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogModalComponent } from './componets/confirm-dialog-modal/confirm-dialog-modal.component';
import { Input, IterableDiffers, DoCheck } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {

  constructor(
    private tasksService: TasksService,
    private dialog: MatDialog,
    differs: IterableDiffers) {
    this.differ = differs.find([]).create(undefined);
  }


  title = 'ToDoList';
  taskName: string = "";
  taskNameEdited: string = "";
  activeLine: number = -1;
  searchText: string = "";

  taskList: MyTask[] = [];
  toDoTaskList: MyTask[] = []
  doneTaskList: MyTask[] = []

  // readonly toDoTaskName: string = "toDoTaskList";
  // readonly doneTaskName: string = "doneTaskList";
  message: string = "";
  differ: any;

  ngOnInit(): void {
    this.getTaskList();
  }

  ngDoCheck(): void {
    const change = this.differ.diff(this.taskList);
console.log("Dooo",change);

    this.getToDoTaskList();
    this.getDoneTaskList();
  }

  addTask(task: MyTask) {

    if (this.tasksService.add(task)) {
      this.taskName = "";
      this.message = "";
    } else {
      this.message = "This field cannot be empty";
    }
  }

  removeTask(task: any): boolean {
    return this.tasksService.remove(task);

  }
  // removeDoneTask(task: any): boolean {
  //   return this.tasksService.remove(task);
  // }
  markAsDone(task: any) {
    task.Done = true;
    this.tasksService.update(task);
    // this.getToDoTaskList();
    // this.getDoneTaskList();
    // if (this.removeToDoTask(task)) {
    //   this.addDoneTask(task);
    // }
  }
  revertDoneTask(task: any) {
    task.Done = false;
    this.tasksService.update(task);
    // this.getToDoTaskList();
    // this.getDoneTaskList();
    // if (this.removeDoneTask(task)) {
    //   this.addToDoTask(task);
    // }
  }
  renameTaskName(task: any) {
    if (task.TaskName == "") { return; }
    this.tasksService.rename(task);
    this.taskNameEdited = "";
    this.activeLine = -1;
  }
  drop(list: any[], event: any) {
    this.tasksService.moveItemInArray(list, event);
  }

  getTaskList() {
    this.tasksService.get().subscribe(t => this.taskList = t);
  }
  getToDoTaskList() {
    // return this.tasksService.getToDoTaskList().subscribe(t => this.toDoTaskList = t);
    //return this.tasksService.get().subscribe(t => this.taskList = t);
    this.toDoTaskList = this.taskList.filter(x => { return !x.Done })
  }
  getDoneTaskList() {
    this.doneTaskList = this.taskList.filter(x => { return x.Done })
  }
  openConfirmRemoveDialog(task: MyTask) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { Title: "Remove Task", Message: 'Are you sure you want to remove this task?', Result: false }
    const dialogRef = this.dialog.open(ConfirmDialogModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.tasksService.remove(task);
      }
    });
  }
}


