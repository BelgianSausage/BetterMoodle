import IUser from "./user.interface";
import INavigable from "./navigable.interface";

export default interface INote extends INavigable {
  id?: string;
  title: string;
  description: string;
  createdAt: Date;
  markdown: string;
  sanitisedHTML: string;
  author: IUser;
  body?: string;
  flagged?: number;
}