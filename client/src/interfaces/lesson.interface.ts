import INavigable from "./navigable.interface";
import IUser from "./user.interface";

export default interface ILesson extends INavigable {
  id?: number;
  title: string;
  author: IUser;
  description: string;
  sanitisedHTML: string;
  createdAt: Date;
  body?: string;
}