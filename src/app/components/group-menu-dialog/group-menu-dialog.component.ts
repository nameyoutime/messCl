import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataUrl, DOC_ORIENTATION, NgxImageCompressService, UploadResponse, } from 'ngx-image-compress';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-group-menu-dialog',
  templateUrl: './group-menu-dialog.component.html',
  styleUrls: ['./group-menu-dialog.component.scss']
})
export class GroupMenuDialogComponent implements OnInit {
  frm: any;

  public selectedObject: any;
  public currentImg: any;
  public users: any;
  public friends: any;
  public doneLoading: boolean = false;
  constructor(private socket:WebsocketService,public authSer: AuthService, private roomSer: RoomService, private imageCompress: NgxImageCompressService, private fb: FormBuilder, public dialogRef: MatDialogRef<GroupMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.authSer.renderUser();
    // console.log(this.data.room.);
    this.roomSer.getRoom(this.data.room._id).subscribe((res:any)=>{
      let data = res.data;

      this.currentImg = data.photoURL;
      this.users = data.user;
      this.friends = this.data.friends;
      this.frm = this.fb.group({
        name: new FormControl(data.name, Validators.required),
        desc: new FormControl(data.desc, Validators.required),
        photoURL: new FormControl(data.photoURL, Validators.required),
        /*
        password:['', Validators.required],
        confirmpassword:['', Validators.required]
        },{
        validator: MustMatch('password', 'confirmpassword')}//hàm tự viết SV có thể bỏ qua không kiểm tra cũng được
        */
      })
      this.doneLoading = true;
    })
    // console.log(this.selectedObject);

    // this.authSer.updatedUser.subscribe(()=>{
    //   // localStorage.setItem('uid', this.uid);
    //     // this.uid = user.uid;
    //     this.authSer.getUser(this.authSer.uid).subscribe(data => {
    //       console.log(this.data);
    //       // this.loadData = true;
    //     })
    // })
  }
  onChange(val: any, i: any) {
    // console.log(val.target.value);
    // console.log(i);
    let index = this.friends.findIndex((item: any) => item.friend.displayName == i);
    this.selectedObject = this.friends[index].friend;

    // console.log(this.selectedObject);
  }

  clickAdd() {
    if (this.selectedObject == undefined) {
      this.selectedObject = this.friends[0].friend;
      // console.log(this.friends[0].friend);
    }
    let index = this.users.findIndex((item: any) => item._id == this.selectedObject._id);
    if (index == -1) {
      // this.users.push(this.selectedObject);
      let payload = {
        user: this.selectedObject._id,
        room: this.data.room._id
      }
      this.roomSer.addUser(payload).subscribe();
      this.authSer.addToGroup(payload).subscribe(()=>{

        this.roomSer.getRoom(this.data.room._id).subscribe((res: any) => {
          let temp = res.data.user;
          this.users = temp;
          this.socket.emit("touch",this.selectedObject.uid);
        })
      });
      // console.log(this.selectedObject.uid);

    }
    // console.log(this.selectedObject);
  }

  deleteUser(index: number,user:any) {
    console.log(user.uid);
    let payload = {
      user: this.users[index]._id,
      room: this.data.room._id
    }
    this.authSer.deleteGroup(payload).subscribe();
    this.roomSer.deleteUser(payload).subscribe(()=>{
      this.authSer.updateUser();
      this.roomSer.getRoom(this.data.room._id).subscribe((res: any) => {
        let temp = res.data.user;
        this.users = temp;
        this.socket.emit("touch",user.uid);
      })
    });
    // console.log(payload);

    // this.authSer.renderUser();

  }
  upload() {
    return this.imageCompress.uploadFile().then(({ image, orientation }: UploadResponse) => {
      this.imageCompress
        .compressFile(image, orientation, 50, 50, 96, 96)
        .then(
          (result: DataUrl) => {
            // this.imgResultAfterResize = result;
            this.currentImg = result;
            this.frm.controls['photoURL'].setValue(result);
            console.warn(
              'Size in bytes is now:',
              this.imageCompress.byteCount(result)
            );
          }
        );
    })

  }
  onSubmit() {
    if (this.frm.invalid) {
      return;
    }
    let payload = {
      _id:this.data.room._id,
      ...this.frm.value
    }
    this.roomSer.updateRoom(payload).subscribe(()=>{
      this.authSer.updateUser();
      for (let i = 0; i < this.users.length; i++) {
        this.socket.emit("touch",this.users[i].uid);
      }
      this.dialogRef.close();
    });
    // this.dialogRef.close();
  }

}
