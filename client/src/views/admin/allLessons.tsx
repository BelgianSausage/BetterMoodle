import React from 'react';
import RequestHandler from '../../api/RequestHandler';
import ILesson from '../../interfaces/lesson.interface';

interface AllLessonsViewProps {}

interface AllLessonsViewState {
  lessons: ILesson[];
}

export default class AllLessonsView extends React.Component<AllLessonsViewProps, AllLessonsViewState> {

  state: AllLessonsViewState = {
    lessons: [],
  }

  async getLesson() {
    const response = await RequestHandler.get("/lessons/all");
    const lessons = response as ILesson[];
    if (lessons != null) {
      this.setState({ lessons: lessons });
    }
  }

  componentDidMount() {
    this.getLesson();
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.state.lessons.map((lesson: ILesson, index: number) => {
              return (
                <li key={index}>
                  <a className="link" href={lesson.slug}>{lesson.title}</a>&nbsp;&nbsp;
                  <a className="link" href={`/admin/lessons/edit/${lesson.slug}`}>Edit</a>&nbsp;&nbsp;
                  <a className="link" href={`/admin/lessons/delete/${lesson.slug}`}>Delete</a>
                </li>
              )
            })
          }
        </ul>
        <a className="link" href="/admin">Back</a>
      </div>
    )
  }

}