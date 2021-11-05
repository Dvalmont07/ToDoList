import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITask } from 'src/app/interfaces/iTask';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-main',
  templateUrl: './tasks-main.component.html',
  styleUrls: ['./tasks-main.component.scss']
})
export class TasksMainComponent implements OnInit, OnDestroy {
  taskList: ITask[] = [];
  constructor(private tasksService: TasksService,) { }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.tasksService.get().subscribe((t) => (this.taskList = t));
  }


}
