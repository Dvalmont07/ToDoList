import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlocoTextoComponent } from './pages/bloco-texto/bloco-texto.component';
import { ElementClickComponent } from './pages/element-click/element-click.component';
import { FollowingScrollComponent } from './pages/following-scroll/following-scroll.component';
import { FreezeColumnsComponent } from './pages/freeze-columns/freeze-columns.component';
import { IndexDBTestsComponent } from './pages/indexDBTests/indexDBTests.component';
import { NewPrintComponent } from './pages/new-print/new-print.component';
import { PrintComponent } from './pages/print/print.component';
import { TasksMainComponent } from './pages/tasks/tasks-main/tasks-main.component';

const routes: Routes = [
  // pages
  {
    path: "task-main",
    component: TasksMainComponent,
    data: { title: "Task Main" },
  },
  {
    path: "",
    component: TasksMainComponent,
    data: { title: "Task Main" },
  },
  {
    path: "print",
    component: PrintComponent,
    data: { title: "Print" },
  },
  {
    path: "element-click",
    component: ElementClickComponent,
    data: { title: "Element Click Test" },
  },
  {
    path: "indexDBTests",
    component: IndexDBTestsComponent,
    data: { title: "My indexDBTests Test" },
  },
  {
    path: "bloco-texto",
    component: BlocoTextoComponent,
    data: { title: "My indexDBTests Test" },
  },
  {
    path: "new-print",
    component: NewPrintComponent,
    data: { title: "My new-print Test" },
  },
  {
    path: "freeze-columns",
    component: FreezeColumnsComponent,
    data: { title: "My new-print Test" },
  },
  {
    path: "following-scroll",
    component: FollowingScrollComponent,
    data: { title: "following-scroll" },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
