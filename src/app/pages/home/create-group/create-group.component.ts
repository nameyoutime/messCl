import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupDialogComponent } from 'src/app/components/create-group-dialog/create-group-dialog.component';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  @Input() data: any;
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(){
    let config = {
      data: this.data,
    }
    const dialogRef = this.dialog.open(CreateGroupDialogComponent, config);
  }
}
