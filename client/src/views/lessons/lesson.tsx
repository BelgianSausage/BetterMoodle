import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import Panel from '../../components/Panel';
import Card from 'react-bootstrap/esm/Card';
import Navigation from '../../components/Navigation';
import UserPreview from '../../components/UserPreview';
import RequestHandler from '../../api/RequestHandler';

import { ILesson } from '../../api/Interfaces';
import { Redirect, useParams } from 'react-router-dom';


interface LessonProps {
  slug: string;
}

interface LessonState {
  lesson: ILesson | undefined;
  lessonRetrievalError: boolean;
}

class Lesson extends React.Component<LessonProps, LessonState> {

  public state: LessonState;

  constructor(props: LessonProps) {
    super(props);

    this.state = {
      lesson: undefined,
      lessonRetrievalError: false,
    };
  }

  public componentDidMount() {
    RequestHandler.get(`/lessons/${this.props.slug}`).then((response: Object) => {
      response.hasOwnProperty('error')
        ? this.setState({ lessonRetrievalError: true })
        : this.setState({ lesson: response as ILesson });
    })
  }

  private getLoadedView(lesson: ILesson) {
    return (
      <div className="app">
        <div className="app-page">
          <Navigation />
          <div className="app-page__inner">
            <Panel />
            <div className="app-content">
              <div className="app-content__wrapper">
                <Card className="app-filterable">
                  <Card.Title>{lesson.title}</Card.Title>
                  <Card.Body>
                    <Card.Text>{lesson.description}</Card.Text>
                  </Card.Body>
                </Card>
                <div className="app-note-view">
                  <div className="app-note__content">
                    {ReactHtmlParser(lesson.sanitisedHTML)}
                  </div>
                </div>
                <UserPreview {...lesson.author} />
              </div>
            </div>
            <Panel />
          </div>
        </div>
      </div>
    )
  }

  private getLoadingView() {
    return (<></>)
  }

  public render() {
    if (this.state.lesson === undefined) return this.getLoadingView();
    if (this.state.lessonRetrievalError) return <Redirect to='/error' />;
    return this.getLoadedView(this.state.lesson);
  }

}

const LessonView = (): JSX.Element => {
  let { slug }: any = useParams();
  return <Lesson slug={slug} />
}

export default LessonView;