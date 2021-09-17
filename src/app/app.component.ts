import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ToDoList';
  taskName: string = "";

  toDoTaskList: any[] = [];
  doneTaskList: any[] = [];

  addToDoTask(task: any) {
    task.Order = this.toDoTaskList.length > 0 ? Math.max(...this.toDoTaskList.map(x => { return x.Order })) + 1 : 1;
    if (task.Name) {
      this.toDoTaskList.push(task);
      this.taskName = "";
    }
  }

  addDoneTask(task: any) {

    task.Order = this.doneTaskList.length > 0 ? Math.max(...this.doneTaskList.map(x => { return x.Order })) + 1 : 1;
    this.doneTaskList.push(task);
  }

  removeTask(task: { Order: any; }) {
    this.toDoTaskList = this.toDoTaskList.filter(t => {
      return t.Order != task.Order;
    });

    // this.doneTaskList.push(task);
  }

}
