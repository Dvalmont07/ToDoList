import { Component, OnInit } from '@angular/core';
import { MyTask } from './interfaces/myTask';
import { TasksService } from './services/tasks.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogModalComponent } from './componets/confirm-dialog-modal/confirm-dialog-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private tasksService: TasksService, private dialog: MatDialog) { }

  title = 'ToDoList';
  taskName: string = "";
  taskNameEdited: string = "";
  activeLine: number = -1;
  searchText: string = "";

  toDoTaskList: MyTask[] = []
  doneTaskList: MyTask[] = []

  readonly toDoTaskName: string = "toDoTaskList";
  readonly doneTaskName: string = "doneTaskList";
  message: string = "";

  ngOnInit(): void {
    this.getToDoTaskList();
    this.getDoneTaskList();
  }

  addToDoTask(task: MyTask) {
    if (this.tasksService.add(this.toDoTaskName, task)) {
      this.taskName = "";
      this.message = "";
    } else {
      this.message = "This field cannot be empty";
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
  drop(list: any[], event: any, listName: string) {

    this.tasksService.moveItemInArray(list, event, listName);
  }
  getToDoTaskList() {
    return this.tasksService.get(this.toDoTaskName).subscribe(t => this.toDoTaskList = t);
  }
  getDoneTaskList() {
    return this.tasksService.get(this.doneTaskName).subscribe(t => this.doneTaskList = t);
  }
  openConfirmRemoveDialog(task: MyTask, listName: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { Title: "Remove Task", Message: 'Are you sure you want to remove this task?', Result: false }
    const dialogRef = this.dialog.open(ConfirmDialogModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.tasksService.remove(listName, task);
      }
    });
  }
}


