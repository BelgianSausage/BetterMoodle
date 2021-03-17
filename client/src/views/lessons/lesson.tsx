import React from 'react';
import Page from '../page';
import Card from 'react-bootstrap/esm/Card';
import RequestHandler from '../../api/RequestHandler';
import ILesson from "../../interfaces/lesson.interface";
import withRouterProps, { WithRouterProps } from '../../components/withRouterProps';
import { Spinner } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

interface LessonProps extends WithRouterProps { }

interface LessonState {
  lesson: ILesson | undefined;
}

class Lesson extends React.Component<LessonProps, LessonState> {

  public state: LessonState;

  constructor(props: LessonProps) {
    super(props);

    this.state = {
      lesson: undefined,
    };
  }

  async getLesson() {
    const response = await RequestHandler.get(`/lessons/${this.props.params.slug}`);
    const lesson = response as ILesson;
    if (lesson != null) {
      this.setState({ lesson: lesson });
    }
  }

  componentDidMount() {
    this.getLesson();
  }

  renderLesson(lesson: ILesson): JSX.Element {
    return (
      <>
        <Card>
          <Card.Title>{lesson.title}</Card.Title>
          <Card.Body>
            <Card.Text>{lesson.description}</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Text>
              <ReactMarkdown source={lesson.body ?? ""} />
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    )
  }

  render() {
    return (
      <Page id="lessons">
        {this.state.lesson ? this.renderLesson(this.state.lesson as ILesson) : <Spinner animation="border" variant="primary" />}
      </Page>
    )
  }

}

export default withRouterProps(Lesson);