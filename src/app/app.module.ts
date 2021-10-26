import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MultipleSearchFilterPipe } from './pipes/multiple-search-filter.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider/';
import { BoolFilterPipe } from './pipes/bool-filter.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

//pages
import { ConfirmDialogModalComponent } from './componets/confirm-dialog-modal/confirm-dialog-modal.component';
import { TasksListComponent } from './pages/tasks/tasks-list/tasks-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskDetailsComponent } from './pages/tasks/task-details/task-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MultipleSearchFilterPipe,
    FilterPipe,
    ConfirmDialogModalComponent,
    BoolFilterPipe,
    TasksListComponent,
    TaskDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSlideToggleModule

  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
