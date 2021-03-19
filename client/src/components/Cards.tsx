import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ILesson from "../interfaces/lesson.interface";
import IModule from "../interfaces/module.interface";
import INote from "../interfaces/note.interface";
import IProfile from "../interfaces/profile.interface";

export const LessonCard = (lesson: ILesson) => (
  <Link to={`/lessons/${lesson.slug}`}>
    <Card className="lesson">
      <Card.Title>{lesson.title}</Card.Title>
      <Card.Body>
        <Card.Text>{lesson.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div>{lesson.author.firstName} {lesson.author.lastName}</div>
        <div>{lesson.createdAt}</div>
      </Card.Footer>
    </Card>
  </Link>
)

export const ModuleCard = (module: IModule) => (
  <Link to={`/modules/${module.slug}`}>
    <Card className="module">
      <Card.Title>{module.title}</Card.Title>
      <Card.Body>
        <Card.Text>{module.description}</Card.Text>
      </Card.Body>
    </Card>
  </Link>
)

export const NoteCard = (note: INote) => (
  <Link to={`/notes/${note.slug}`}>
    <Card className="note">
      <Card.Title>{note.title}</Card.Title>
      <Card.Body>
        <Card.Text>{note.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div>{note.createdAt}</div>
      </Card.Footer>
    </Card>
  </Link>
)

export const AuthorCard = (author: IProfile) => (
  <Link to={`/users/${author.username}`}>
    <Card>
      <Card.Title>{author.username}</Card.Title>
    </Card>
  </Link>
)