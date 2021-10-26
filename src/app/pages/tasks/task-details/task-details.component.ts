import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from 'src/app/interfaces/iDialogData';
import { ITask } from 'src/app/interfaces/iTask';
import { TasksService } from 'src/app/services/tasks.service';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  Result: boolean = false;
  Title: string = "";
  Message: string = "";
  taskValue: ITask = { TaskName: '', Done: false, Today: false };

  constructor(
    public dialogRef: MatDialogRef<TaskDetailsComponent>,
    private taskService: TasksService,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  @Input() idTask: any;

  ngOnInit() {
    this.getTaskById();
  }

  getTaskById() {
    this.taskService.getById(this.data.Id).subscribe(t => this.taskValue = t);
  }



  onNoClick(): void {
    this.dialogRef.close();
  }
}
