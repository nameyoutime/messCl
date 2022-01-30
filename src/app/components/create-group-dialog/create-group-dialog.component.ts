import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataUrl, DOC_ORIENTATION, NgxImageCompressService, UploadResponse, } from 'ngx-image-compress';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.scss']
})
export class CreateGroupDialogComponent implements OnInit {
  createFrm: any;
  public currentImg: any;
  constructor(private authSer:AuthService,private roomSer:RoomService,private imageCompress: NgxImageCompressService, private fb: FormBuilder, public dialogRef: MatDialogRef<CreateGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.createFrm = this.fb.group({
      name: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.required),
      photoURL: new FormControl(null, Validators.required),
      /*
      password:['', Validators.required],
      confirmpassword:['', Validators.required]
      },{
      validator: MustMatch('password', 'confirmpassword')}//hàm tự viết SV có thể bỏ qua không kiểm tra cũng được
      */
    })
  }
  upload() {
    return this.imageCompress.uploadFile().then(({ image, orientation }: UploadResponse) => {
      this.imageCompress
        .compressFile(image, orientation, 50, 50, 96, 96)
        .then(
          (result: DataUrl) => {
            // this.imgResultAfterResize = result;
            this.currentImg = result;
            this.createFrm.controls['photoURL'].setValue(result);
            console.warn(
              'Size in bytes is now:',
              this.imageCompress.byteCount(result)
            );
          }
        );
    })

  }
  onSubmit() {
    if (this.createFrm.invalid) {
      return;
    }
    let payload = {
      ...this.createFrm.value,
      user:this.data._id,
      isGroup:true
    }
    this.roomSer.createGroup(payload).subscribe(res=>{
      let data = res.data;
      let payload = {
        user:data.user[0],
        room:data._id
      }
      this.authSer.addToGroup(payload).subscribe(res=>{
        // console.log(res);
        this.authSer.updateUser();
        this.dialogRef.close();
      })
    });
  }
}
