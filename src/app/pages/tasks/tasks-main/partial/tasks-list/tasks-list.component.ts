import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogModalComponent } from 'src/app/componets/confirm-dialog-modal/confirm-dialog-modal.component';
import { ICategory } from 'src/app/interfaces/iCategory';
import { ITask } from 'src/app/interfaces/iTask';
import { CategoriesService } from 'src/app/services/categories.service';
import { TasksService } from 'src/app/services/tasks.service';
import { Editor } from 'ngx-editor';

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

  title = 'ToDoList';
  taskName: string = '';
  activeLine: number = -1;
  searchText: string = '';

  toDoTaskList: ITask[] = [];
  doneTaskList: ITask[] = [];
  categoriesList: ICategory[] = [];
  selectedIdICategory: number = -1;
  message: string = '';
  differ: any;
  editor: Editor = new Editor();
  html: string = '';



  ngOnDestroy(): void {
  }

  @Input() taskList: ITask[] = [];

  @Output() onEdit: EventEmitter<ITask> = new EventEmitter<any>();

  ngOnInit(): void {
    //TODO contruir sistema de rebalanceamento de carteira de ações

    window.onbeforeunload = function(){
      myfun();
      return 'Are you sure you want to leave?';
    };

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
      // console.log('task removed');
    });
  }
  updateTask(task: ITask) {
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
  getCategoriesList() {
    this.categoriesService.get().subscribe((c) => (this.categoriesList = c));
  }

  trackTask(index: number, task: ITask) {
    return task ? task.Id : undefined;
  }
  drop(list: any[], event: any) {
    this.tasksService.moveItemInArray(list, event);
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

  openConfirmRemoveDialogTeste() {
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
        // console.log("hey ater close");

        //this.tasksService.remove(task);
      }
    });
  }


  // openDetailsDialog(task: ITask) {
  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.data = {
  //     Title: 'Task Detailsx',
  //     Message: '',
  //     Result: false,
  //     Id: task.Id
  //   };
  //   const dialogRef = this.dialog.open(
  //     TaskDetailsComponent,
  //     dialogConfig
  //   );

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === true) {
  //       this.tasksService.remove(task);
  //     }
  //   });
  // }

  emitTask(task: any) {
    this.onEdit.emit(task);
  }

}
function myfun() {
  alert('hello');
}

