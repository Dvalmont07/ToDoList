import { Component, OnInit } from '@angular/core';
import { MyTask } from './interfaces/myTask';
import { TasksService } from './services/tasks.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogModalComponent } from './componets/confirm-dialog-modal/confirm-dialog-modal.component';
import { IterableDiffers, DoCheck } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { Category } from './interfaces/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private tasksService: TasksService,
    private dialog: MatDialog,
    private categoriesService: CategoriesService,
    //differs: IterableDiffers
  ) {
    // this.differ = differs.find([]).create(undefined);
  }

  title = 'ToDoList';
  taskName: string = '';
  taskNameEdited: string = '';
  activeLine: number = -1;
  searchText: string = '';

  taskList: MyTask[] = [];
  toDoTaskList: MyTask[] = [];
  doneTaskList: MyTask[] = [];
  categoriesList: Category[] = [];
  selectedIdCategory: number = -1;
  message: string = '';
  differ: any;

  ngOnInit(): void {
    this.getTaskList();
    this.getCategoriesList();
  }

  // ngDoCheck(): void {
  //const change = this.differ.diff(this.taskList);
  //this.getTaskList();
  //}

  addTask(task: MyTask) {
    if (this.tasksService.add(task)) {
      this.taskName = '';
      this.message = '';
    } else {
      this.message = 'This field cannot be empty';
    }
  }

  removeTask(task: any): void {
    this.tasksService.remove(task).add(() => {
      console.log('task removed');
    });
  }

  markAsDone(task: any) {
    task.Done = true;
    this.tasksService.update(task);

  }
  revertDoneTask(task: any) {
    task.Done = false;
    this.tasksService.update(task);
  }
  renameTaskName(task: any) {
    if (task.TaskName == '') {
      return;
    }
    this.tasksService.rename(task);
    this.taskNameEdited = '';
    this.activeLine = -1;
  }

  update(task: MyTask) {
    console.log("task", task);

    if (task) {
      this.tasksService.update(task);
    }
  }
  drop(list: any[], event: any) {
    this.tasksService.moveItemInArray(list, event);
  }

  getTaskList() {
    this.tasksService.get().subscribe((t) => (this.taskList = t));
  }

  getCategoriesList() {
    this.categoriesService.get().subscribe((c) => (this.categoriesList = c));
  }

  openConfirmRemoveDialog(task: MyTask) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      Title: 'Remove Task',
      Message: 'Are you sure you want to remove this task?',
      Result: false,
    };
    const dialogRef = this.dialog.open(
      ConfirmDialogModalComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.tasksService.remove(task);
      }
    });
  }

  trackTask(index: number, task: MyTask) {
    return task ? task.Order : undefined;
  }
}
