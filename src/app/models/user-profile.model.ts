// import { AchievedSkill, Achievement } from "./achievement.model";
export interface userProfile {
  _id?: string,
  displayName?: string,
  email?: string,
  photoURL?: string,
  uid?: string,
  friends?: [{ room: string, friend: userProfile }],
  req?: userProfile,
}