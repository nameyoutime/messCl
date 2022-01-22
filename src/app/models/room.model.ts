import { userProfile } from "./user-profile.model";

export interface room {
  _id?: string,
  user?:userProfile,
  isGroup?:boolean,
}