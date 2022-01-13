import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import firebase from '@firebase/app-compat';
import { Observable } from 'rxjs';
import { mergeMap, filter, catchError } from 'rxjs/operators'

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public uid: any;
  public currentUser: any;
  constructor(private afAuth: AngularFireAuth, private http: HttpClient) {
    this.checkUser();
  }

  defaultUser() {
    return {
      _id: '',
      email: '',
      displayName: '',
      photoURL: '',
      uid: ''
    };
  }

  checkUser() {
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        localStorage.setItem('uid', user.uid);
        this.uid = user.uid;
        this.getUser(this.uid).subscribe((data: any) => {
          this.currentUser = data.data[0];
        })

      } else {
        localStorage.removeItem('uid');
      }
    })
  }
  checkExists(uid: string): Observable<any> {
    return this.http.get(environment.endpoint + `user/checkUid/${uid}`);
  }
  sendFriendReq(data: any): Observable<any> {
    return this.http.post(environment.endpoint + "user/sendReq", { data: data });
  }
  searchUser(keyword: string): Observable<any> {
    return this.http.get(environment.endpoint + `user/search?keyword=${keyword}`);
  }
  deniedReq(data: any): Observable<any> {
    return this.http.delete(environment.endpoint + `user/deniedReq?currId=${data.currId}&_id=${data._id}`)
  }
  acceptReq(data: any): Observable<any> {
    return this.http.post(environment.endpoint + `user/acceptReq`, { data: data });
  }
  createRoom(data: any): Observable<any> {
    return this.http.post(environment.endpoint + `room`, { room: data });
  }
  getAllUser(): Observable<any> {
    return this.http.get(environment.endpoint + `user`);
  }
  checkSendReq(body: any): Observable<any> {
    return this.http.get(environment.endpoint + `user/checkSend?from=${body.from}&to=${body.to}`);
  }
  addUser(data: any): Observable<any> {
    return this.http.post(environment.endpoint + 'user', { user: data });
  }
  getUser(uid: string): Observable<any> {
    return this.http.get(environment.endpoint + `user/uid/${uid}`);
  }
  async loginWithGoogle() {
    const dataUser: any = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    // console.log(dataUser.user.uid);
    this.checkExists(dataUser.user.uid).pipe(
      filter(data => data.count == 0),
      mergeMap((data: any) => {
        let temp = {
          displayName: dataUser.user.displayName,
          email: dataUser.user.email,
          photoURL: dataUser.user.photoURL,
          uid: dataUser.user.uid,
          friends: [],
          req: []
        }
        return this.addUser(temp);
      }), catchError(error => {
        console.log(error);
        return error;
        // handle the error accordingly.
      })
    ).subscribe(data => {
      console.log(data);
    })


    // this.checkExists(dataUser.user.uid).subscribe((data: any) => {
    //   if (data.count == 0) {
    //     let temp = {
    //       displayName: dataUser.user.displayName,
    //       email: dataUser.user.email,
    //       photoURL: dataUser.user.photoURL,
    //       uid: dataUser.user.uid,
    //       friends: [],
    //       req: []
    //     }
    //     this.addUser(temp).subscribe(()=>{
    //       console.log("added user to db");
    //     })
    //   }
    // })
  }



  async logout() {
    await this.afAuth.signOut().then(() => {
      localStorage.removeItem('uid');
    });
  }
}
