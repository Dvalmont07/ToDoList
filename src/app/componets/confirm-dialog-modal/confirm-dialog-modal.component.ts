import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  Result: boolean;
  Title: string;
  Message: string;
}

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
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
