export interface Navigable {
  slug: string;
}

export interface IUser extends Navigable {
  firstName: string;
  lastName: string; 
  profilePic?: string;
  createdAt?: Date;
}

export interface INote extends Navigable {
  title: string;
  description: string;
  createdAt: Date;
  sanitisedHTML: string;
  author: IUser;
}

export interface IModule extends Navigable {
  code: string;
  title: string;
  description: string;
  lessons: ILesson[];
  teachers: IUser[];
}

export interface ILesson extends Navigable {
  title: string;
  author: IUser;
  description: string;
  sanitisedHTML: string;
}