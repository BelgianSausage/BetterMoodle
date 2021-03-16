import React from 'react';
import Page from '../page';
import Card from 'react-bootstrap/esm/Card';
import RequestHandler from '../../api/RequestHandler';
import ILesson from "../../interfaces/lesson.interface";
import withRouterProps, { WithRouterProps } from '../../components/withRouterProps';

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

  render() {
    return (
      <Page id="lessons">
        <Card>
          <Card.Title>{this.state.lesson?.title}</Card.Title>
          <Card.Body>
            <Card.Text>{this.state.lesson?.description}</Card.Text>
          </Card.Body>
        </Card>
        <Card id="article">
          <Card.Body>
            <Card.Text>
              {this.state.lesson?.body}
            </Card.Text>
          </Card.Body>
        </Card>
      </Page>
    )
  }

}

export default withRouterProps(Lesson);