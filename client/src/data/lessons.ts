import { ILesson } from "../api/Interfaces";
import { fakeUsers } from "./users";

export const fakeLessons: ILesson[] = [
  {
    slug: "lesson-1-example-example",
    title: "Lesson 1 - Example example",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet 
    imperdiet dui, vel pretium purus. Phasellus vel tempor massa. Aliquam eu pulvinar eros. Sed 
    neque diam, aliquam sed enim at, vulputate aliquam leo. In hac habitasse platea dictumst. 
    Aliquam vel enim ante. Proin nec leo id massa luctus tincidunt.`,
    sanitisedHTML: `
      <h1>Lesson 1 - Example example</h1>
    `,
    author: fakeUsers[0],
    createdAt: new Date(),
  },
  {
    slug: "lesson-2-example-example",
    title: "Lesson 2 - Example example",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet 
    imperdiet dui, vel pretium purus. Phasellus vel tempor massa. Aliquam eu pulvinar eros. Sed 
    neque diam, aliquam sed enim at, vulputate aliquam leo. In hac habitasse platea dictumst. 
    Aliquam vel enim ante. Proin nec leo id massa luctus tincidunt.`,
    sanitisedHTML: `
      <h1>Lesson 2 - Example example</h1>
    `,
    author: fakeUsers[0],
    createdAt: new Date(),
  },
  {
    slug: "lesson-3-example-example",
    title: "Lesson 3 - Example example",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet 
    imperdiet dui, vel pretium purus. Phasellus vel tempor massa. Aliquam eu pulvinar eros. Sed 
    neque diam, aliquam sed enim at, vulputate aliquam leo. In hac habitasse platea dictumst. 
    Aliquam vel enim ante. Proin nec leo id massa luctus tincidunt.`,
    sanitisedHTML: `
      <h1>Lesson 3 - Example example</h1>
    `,
    author: fakeUsers[0],
    createdAt: new Date(),
  },
  {
    slug: "lesson-3-example-example",
    title: "Lesson 3 - Example example",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet 
    imperdiet dui, vel pretium purus. Phasellus vel tempor massa. Aliquam eu pulvinar eros. Sed 
    neque diam, aliquam sed enim at, vulputate aliquam leo. In hac habitasse platea dictumst. 
    Aliquam vel enim ante. Proin nec leo id massa luctus tincidunt.`,
    sanitisedHTML: `
      <h1>Lesson 3 - Example example</h1>
    `,
    author: fakeUsers[0],
    createdAt: new Date(),
  },
  {
    slug: "lesson-4-example-example",
    title: "Lesson 4 - Example example",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet 
    imperdiet dui, vel pretium purus. Phasellus vel tempor massa. Aliquam eu pulvinar eros. Sed 
    neque diam, aliquam sed enim at, vulputate aliquam leo. In hac habitasse platea dictumst. 
    Aliquam vel enim ante. Proin nec leo id massa luctus tincidunt.`,
    sanitisedHTML: `
      <h1>Lesson 4 - Example example</h1>
    `,
    author: fakeUsers[0],
    createdAt: new Date(),
  },
  {
    slug: "lesson-5-example-example",
    title: "Lesson 5 - Example example",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet 
    imperdiet dui, vel pretium purus. Phasellus vel tempor massa. Aliquam eu pulvinar eros. Sed 
    neque diam, aliquam sed enim at, vulputate aliquam leo. In hac habitasse platea dictumst. 
    Aliquam vel enim ante. Proin nec leo id massa luctus tincidunt.`,
    sanitisedHTML: `
      <h1>Lesson 5 - Example example</h1>
    `,
    author: fakeUsers[0],
    createdAt: new Date(),
  }
]