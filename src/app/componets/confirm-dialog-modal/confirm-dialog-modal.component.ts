import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogData } from 'src/app/interfaces/iDialogData';
@Component({
  selector: 'app-dialog-modal',
  templateUrl: './confirm-dialog-modal.component.html',
  styleUrls: ['./confirm-dialog-modal.component.scss']
})
export class ConfirmDialogModalComponent implements OnInit {

  Result: boolean = false;
  Title: string = "";
  Message: string = "";

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
