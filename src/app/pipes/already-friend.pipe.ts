import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alreadyFriend'
})
export class AlreadyFriendPipe implements PipeTransform {

  transform(val: any): any {
    let _id = val._id;
    let userDataFriend = val.userData.friends;
    let result = userDataFriend.findIndex((item: any) => item.friend._id == _id);
    if (result == 0) {
      return 0;
    } else if (result == -1) {
      return -1;
    }
    return -1;
  }

}
