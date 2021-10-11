import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MultipleSearchFilterPipe } from './pipes/multiple-search-filter.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModalComponent } from './componets/confirm-dialog-modal/confirm-dialog-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider/';
@NgModule({
  declarations: [
    AppComponent,
    MultipleSearchFilterPipe,
    FilterPipe,
    ConfirmDialogModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
