import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  public currentRoom: any = null;

  private limit: number = 20;
  public currentRoomUpdated: EventEmitter<any> = new EventEmitter();



  constructor(private http: HttpClient) { }

  setCurrentRoom(value: any) {
    if (this.currentRoom !== value) {
      this.leave();
      this.currentRoom = value;
      this.currentRoomUpdated.emit(this.currentRoom);
    }
  }

  join(room: string) {
    console.log("join room:", room);
  }
  leave() {
    if (this.currentRoom !== null) {
      console.log("leave room:", this.currentRoom);
    }
  }

  getRoom(room: string, count: number): Observable<any> {
    return this.http.get(environment.endpoint + `mess/chat?limit=${this.limit}&room=${room}&count=${count}`);
  }

  sendMessage(payload: any): Observable<any> {
    return this.http.post(environment.endpoint + "mess/chat", { data: payload });
  }
  





}
