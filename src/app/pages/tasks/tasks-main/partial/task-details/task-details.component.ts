import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ITask } from 'src/app/interfaces/iTask';
import { CategoriesService } from 'src/app/services/categories.service';
import { TasksService } from 'src/app/services/tasks.service';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnChanges {
  Result: boolean = false;
  Title: string = "";
  Message: string = "";
  //taskValue: ITask = { TaskName: '', Done: false, Today: false, Favorite: false };

  constructor(
    private tasksService: TasksService,
    private categoriesService: CategoriesService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

  }

  @Input() taskValue: any;

  //@Output() onBack: EventEmitter<any> = new EventEmitter<any>();


  ngOnInit() {
    this.getTaskById();
  }

  getTaskById() {
    //this.taskService.getById(this.data.Id).subscribe(t => this.taskValue = t);
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }

  update(task: ITask) {
    if (task) {
      this.tasksService.update(task);
    }
  }


}
