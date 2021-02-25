import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import Page from '../page';
import Card from 'react-bootstrap/esm/Card';
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
      <Page id="lessons">
        <Card>
          <Card.Title>{lesson.title}</Card.Title>
          <Card.Body>
            <Card.Text>{lesson.description}</Card.Text>
          </Card.Body>
        </Card>
        <Card id="article">
          <Card.Body>
            {ReactHtmlParser(lesson.sanitisedHTML)}
          </Card.Body>
        </Card>
        <UserPreview {...lesson.author} />
      </Page>
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