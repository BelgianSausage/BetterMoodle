import { INote } from "../api/Interfaces";
import { fakeUsers } from "./users";

export const fakeNotes: INote[] = [
  {
    slug: "double-your-notes-react-coding-speed-with-this-simple-trick",
    title: "Double Your React Coding Speed With This Simple Trick",
    description: `
      In suscipit tristique quam, in tempus est tincidunt nec. Curabitur non est eu tortor 
      molestie rutrum in in lectus. Nulla aliquam diam a eros dictum accumsan. Donec ac nisl 
      vel tortor eleifend lacinia. Proin eget mauris et sapien eleifend ornare nec et tortor. 
    `,
    author: fakeUsers[0],
    createdAt: new Date(),

    markdown: `
### Introduction

If you work with React or React Native, feel that your coding speed is slow, 
spend your time catching bugs, and not adding new features, work with long 
source files and have a hard time finding stuff, and implement the same logic 
over and over again, you will double your coding speed if you refactor your 
code into reusable building blocks.

### How you will learn

We will look at a React component, that has been written by a developer like you. 
And we will step by step refactor it to the superior level. Expect to receive lots 
of insights, that will boost your React coding speed.

* This article will contain lots of React code. Do not be afraid of the code. Take your time reading and understanding it. If you have any questions feel free to ask them in the comments, I will reply 10  times of 10.

* It’s a big article. The content is comprehensive. Feel free to save this article in your tabs and read it in several attempts.

* Even though the code will be in React Native you can easily use this article to boost your React skills.

Good luck and have fun!
    `,

    sanitisedHTML: `

<h3>Introduction</h3>

<p>
  If you work with React or React Native, feel that your coding speed is slow, 
  spend your time catching bugs, and not adding new features, work with long 
  source files and have a hard time finding stuff, and implement the same logic 
  over and over again, you will double your coding speed if you refactor your 
  code into reusable building blocks.
</p>

<h3>How you will learn</h3>

<p>
  We will look at a React component, that has been written by a developer like you. 
  And we will step by step refactor it to the superior level. Expect to receive lots 
  of insights, that will boost your React coding speed.
</p>

<ul>
  <li>
    This article will contain lots of React code. Do not be afraid of the code. Take your time reading 
    and understanding it. If you have any questions feel free to ask them in the comments, I will reply 10 
    times of 10.
  </li>
  <li>
    It’s a big article. The content is comprehensive. Feel free to save this article in your tabs and read 
    it in several attempts.
  </li>
  <li>
    Even though the code will be in React Native you can easily use this article to boost your React skills.
  </li>
</ul>

<p>
  Good luck and have fun!
</p>

    `,
  },
  {
    slug: "note-title-2",
    title: "Note title",
    description: "Note description",
    author: fakeUsers[0],
    createdAt: new Date(),
    markdown: `
    
    `,
    sanitisedHTML: `

    `,
  },
];