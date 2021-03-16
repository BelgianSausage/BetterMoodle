import IUser from "./user.interface";
import INavigable from "./navigable.interface";
import ILesson from "./lesson.interface";

export default interface IModule extends INavigable {
  id?: number;
  name?: string;
  code: string;
  title: string;
  description: string;
  lessons: ILesson[];
  teachers: IUser[];
}