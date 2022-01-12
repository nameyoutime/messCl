import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alreadyFriend'
})
export class AlreadyFriendPipe implements PipeTransform {

  transform(val: any): any {
    let _id = val._id;
    let userDataFriend = val.userData.friends;
    let result = -1;
    for (let i = 0; i < userDataFriend.length; i++) {
      if (userDataFriend[i].friend._id == _id) {
        result = 0;
        break;
      }

    }
    return result;
  }

}
