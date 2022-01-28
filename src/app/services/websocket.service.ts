import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: any;

  constructor() { 
    this.socket = io(environment.SOCKET_ENDPOINT);
  }
  on(eventName: string) {
    return new Observable((subcriber) => {
      this.socket.on(eventName, (data:any) => {
        subcriber.next(data);
      })
    })
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
