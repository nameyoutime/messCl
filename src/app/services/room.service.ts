import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  public currentRoom: any = null;

  private limit: number = 20;
  public currentRoomUpdated: EventEmitter<any> = new EventEmitter();



  constructor(private http: HttpClient, private socket: WebsocketService) { }

  setCurrentRoom(value: any) {
    if (this.currentRoom !== value) {
      this.leave();
      this.currentRoom = value;
      this.currentRoomUpdated.emit(this.currentRoom);
    }
  }

  join(room: string) {
    // console.log("join room:", room);
    this.socket.emit("join", room);
  }
  leave() {
    if (this.currentRoom !== null) {
      // console.log("leave room:", this.currentRoom);
      this.socket.emit("leave", this.currentRoom);

    }
  }

  getMessage(room: string, count: number): Observable<any> {
    return this.http.get(environment.endpoint + `mess/chat?limit=${this.limit}&room=${room}&count=${count}`);
  }

  getRoom(room: string): Observable<any> {
    return this.http.get(environment.endpoint + `room/${room}`);
  }
  updateRoom(payload:any):Observable<any>{
    return this.http.put(environment.endpoint+"room/update"+`/${payload._id}`,{data:payload});
  }

  sendMessage(payload: any): Observable<any> {
    return this.http.post(environment.endpoint + "mess/chat", { data: payload });
  }

  deleteUser(payload:any):Observable<any>{
    return this.http.put(environment.endpoint+"room/deleteUser",{data:payload});
  }
  addUser(payload:any):Observable<any>{
    return this.http.put(environment.endpoint+"room/addUser",{data:payload});
  }

  createGroup(payload:any):Observable<any>{
    return this.http.post(environment.endpoint+"room",{room:payload});
  }




}
