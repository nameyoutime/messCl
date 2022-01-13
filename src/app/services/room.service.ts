import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  public currentRoom: any = null;
  private limit:number = 20;
  public currentRoomUpdated: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  setCurrentRoom(value: any) {
    
    this.currentRoom = value;
    this.currentRoomUpdated.emit(this.currentRoom);
    // console.log(value)
  }

  getCurrentRoom(){
    this.currentRoomUpdated.subscribe(data=>{
      console.log(data);
    })
  }
  getRoom(room:string,count:number):Observable<any>{
    return this.http.get(environment.endpoint+`room/chat?limit=${this.limit}&room=${room}&count=${count}`);
  }

  sendMessage(payload:any):Observable<any>{
    return this.http.put(environment.endpoint+"room/chat",{data:payload});
  }

  



}
