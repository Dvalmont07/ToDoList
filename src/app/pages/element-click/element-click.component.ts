import { Component, OnDestroy, OnInit } from '@angular/core';
import { TODOTASKSLIST } from 'src/app/services/mocks/TasksList';

@Component({
  selector: 'app-element-click',
  templateUrl: './element-click.component.html',
  styleUrls: ['./element-click.component.scss']
})
export class ElementClickComponent implements OnInit, OnDestroy {

  constructor() { }


  private firstClick: boolean = true;
  private activeElemnt: any;

  public activeTask: any;
  public tasks: any = [
    { Title: "One", Active: false, Identification: 1 },
    { Title: "Two", Active: false, Identification: 2 },
    { Title: "Three", Active: false, Identification: 3 },
    { Title: "Four", Active: false, Identification: 4 },
  ]
  ngOnDestroy(): void {
  }


  ngOnInit() {

    setTimeout(() => {
      let internalElements = document.querySelectorAll('.internal-element');
      internalElements.forEach(button => button.addEventListener('click', this.handleCardButtonClick.bind(this)));
    }, 200);

    this.watchForEscapeKey();

  }

  private watchForEscapeKey() {
    document.addEventListener("keydown", (e) => {
      if (e.key === 'Escape') {
        console.log('escape');
        this.activeTask.Active = false;
        this.activeElemnt = null;
      }
    });
  }

  private handleCardButtonClick(event: any) {
    event.stopPropagation();

    this.checkIfFirstClick(event);

    if (this.activeElemnt === event.currentTarget) {
      console.log("The same", event);
      return;
    }
    else {

      this.deactiveAllTasks(event);

      this.activeTask.Active = true;
      this.activeElemnt = event.currentTarget;

      const body = this.activeElemnt.closest('body');
      //const parentElement = this.activeElemnt.closest('#externalElement');

      this.watchElementClick(body);
      //this.watchElementClick(parentElement);
    }    
  }

  private watchElementClick(element: any) {
    element.addEventListener('click', (e: any) => {
      this.activeTask.Active = false;
      this.activeElemnt = null;
      e.stopPropagation();
      return;
    });
  }

  private deactiveAllTasks(event: any) {
    this.tasks.forEach((task: { Indetification: any; Active: boolean; }) => {
      task.Active = false;
    });
  }

  private checkIfFirstClick(event: any) {
    if (this.firstClick) {
      this.activeElemnt = event.currentTarget;
      this.activeTask.Active = true;
      this.firstClick = false;
    }
  }

  setActiveTask(task: any) {
    this.activeTask = task;
  }


}
