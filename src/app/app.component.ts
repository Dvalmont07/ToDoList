import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ToDoList';
  taskName: string = "";

  taskList: any[] = [];

  addTask() {
    let order = this.taskList.length > 0 ? Math.max(...this.taskList.map(x => { return x.Order })) + 1 : 1;

    this.taskList.push({ TaskName: this.taskName, Order: order });
    this.taskName = "";
    if (this.taskList.length > 0) {
      console.log("AAA", this.taskList);
      console.log("PPP", this.taskList.map(x => { return x.Order }));

    }
  }
  removeTask(order: any) {

    this.taskList = this.taskList.filter(task => {
      return task.Order != order;
    });
  }

}
