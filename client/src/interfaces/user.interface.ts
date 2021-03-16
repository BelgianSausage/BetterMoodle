import INavigable from "./navigable.interface";

export default interface IUser extends INavigable {
  id: number;
  firstName: string;
  lastName: string; 
  profilePic?: string;
  createdAt?: Date;
}