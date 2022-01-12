import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchDialogComponent } from 'src/app/components/search-dialog/search-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() _id: any;
  @Input() data: any;

  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }
  openDialog() {
    let config = {
      width: '250px',
      data: { data:this.data,_id:this._id },
    }
    const dialogRef = this.dialog.open(SearchDialogComponent,config);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });

  }

}
