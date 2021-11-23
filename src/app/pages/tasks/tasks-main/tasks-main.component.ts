import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ITask } from 'src/app/interfaces/iTask';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-main',
  templateUrl: './tasks-main.component.html',
  styleUrls: ['./tasks-main.component.scss']
})
export class TasksMainComponent implements OnInit, OnDestroy {

  taskList: ITask[] = [];
  task: any;
  //tela: string = "list";

  constructor(private tasksService: TasksService, private renderer: Renderer2, private el: ElementRef) { }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList() {
    this.tasksService.get().subscribe((t) => (this.taskList = t));
  }

  openTaskDetails(task: any) {
    console.log(task);

    this.task = task;

  }



}
