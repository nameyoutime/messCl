import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDelDialogComponent } from 'src/app/components/confirm-del-dialog/confirm-del-dialog.component';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-side-chat',
  templateUrl: './side-chat.component.html',
  styleUrls: ['./side-chat.component.scss']
})
export class SideChatComponent implements OnInit {
  @Input() item: any;
  @Output() replyEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  constructor(private roomSer: RoomService, public dialog: MatDialog) { }
  public uid: any = localStorage.getItem("uid");

  ngOnInit(): void {

  }
  async clickDelete(id: string) {
    await this.roomSer.deleteMessage(id).toPromise();
  }
  openDialog(id: string) {
    let config = {
      data: { data: id },
    }
    const dialogRef = this.dialog.open(ConfirmDelDialogComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clickDelete(result.data).then(() => this.deleteEvent.emit(result.data));
      }
    });
  }
  clickReply() {
    this.replyEvent.emit(this.item);
  }
}
