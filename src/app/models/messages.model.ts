import { room } from "./room.model";
import { userProfile } from "./user-profile.model";

export interface messages {
  _id?: string,
  room?:room,
  user?:userProfile,
  text?:string,
  date?:number,
  image?:string,
  status?:boolean,
  reply?:any
}