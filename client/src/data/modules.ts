
import { IModule } from "../api/Interfaces";
import { fakeLessons } from "./lessons";
import { fakeUsers } from "./users";

export const fakeModules: IModule[] = [
  {
    code: "CM20255",
    slug: "/modules/databases",
    title: "Databases",
    description: `Quisque vel mollis leo. Sed cursus augue a nisl egestas, a placerat 
    massa molestie. Aliquam lacinia, tortor eu sodales commodo.`,
    lessons: fakeLessons,
    teachers: fakeUsers.slice(0, 2),
  },
  {
    code: "CM20220",
    slug: "/modules/fundamentals-of-machine-learning",
    title: "Fundamentals of Machine Learning",
    description: `Quisque vel mollis leo. Sed cursus augue a nisl egestas, a placerat 
    massa molestie. Aliquam lacinia, tortor eu sodales commodo.`,
    lessons: fakeLessons,
    teachers: fakeUsers.slice(0, 2),
  },
  {
    code: "CM20253",
    slug: "/modules/comparative-programming-languages",
    title: "Comparative programming languages",
    description: `Quisque vel mollis leo. Sed cursus augue a nisl egestas, a placerat 
    massa molestie. Aliquam lacinia, tortor eu sodales commodo.`,
    lessons: fakeLessons,
    teachers: fakeUsers.slice(0, 2),
  },
  {
    code: "CM20257",
    slug: "/modules/integrated-group-based-project",
    title: "Integrated Group Based Project",
    description: `Quisque vel mollis leo. Sed cursus augue a nisl egestas, a placerat 
    massa molestie. Aliquam lacinia, tortor eu sodales commodo.`,
    lessons: fakeLessons,
    teachers: fakeUsers.slice(0, 2),
  },
  {
    code: "CM20252",
    slug: "/modules/artificial-intelligence",
    title: "Artificial Intelligence",
    description: `Quisque vel mollis leo. Sed cursus augue a nisl egestas, a placerat 
    massa molestie. Aliquam lacinia, tortor eu sodales commodo.`,
    lessons: fakeLessons,
    teachers: fakeUsers.slice(0, 2),
  },
]
