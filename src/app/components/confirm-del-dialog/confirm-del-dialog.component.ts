import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-del-dialog',
  templateUrl: './confirm-del-dialog.component.html',
  styleUrls: ['./confirm-del-dialog.component.scss']
})
export class ConfirmDelDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }
  clickYes(id:string){
    this.dialogRef.close(id);
  }
  clickNo(){
    this.dialogRef.close();
  }

}
