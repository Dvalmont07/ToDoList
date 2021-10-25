import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogModalComponent } from 'src/app/componets/confirm-dialog-modal/confirm-dialog-modal.component';
import { ICategory } from 'src/app/interfaces/iCategory';
import { ITask } from 'src/app/interfaces/iTask';
import { CategoriesService } from 'src/app/services/categories.service';
import { TasksService } from 'src/app/services/tasks.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, OnDestroy {

  constructor(
    private tasksService: TasksService,
    private dialog: MatDialog,
    private categoriesService: CategoriesService
  ) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  title = 'ToDoList';
  taskName: string = '';
  activeLine: number = -1;
  searchText: string = '';

  taskList: ITask[] = [];
  toDoTaskList: ITask[] = [];
  doneTaskList: ITask[] = [];
  categoriesList: ICategory[] = [];
  selectedIdICategory: number = -1;
  message: string = '';
  differ: any;

  ngOnInit(): void {
    this.getTaskList();
    this.getCategoriesList();
  }
  addTask(task: ITask) {
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
  editTaskName(task: ITask) {
    if (task.TaskName == '') {
      return;
    }
    this.tasksService.update(task);
    this.activeLine = -1;
  }

  update(task: ITask) {

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

  trackTask(index: number, task: ITask) {
    return task ? task.Id : undefined;
  }

  //Dialogs
  openConfirmRemoveDialog(task: ITask) {
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

  openDetailsDialog(task: ITask) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      Title: 'Task Detailsx',
      Message: '',
      Result: false,
      Id: task.Id
    };
    const dialogRef = this.dialog.open(
      TaskDetailsComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.tasksService.remove(task);
      }
    });
  }

}
