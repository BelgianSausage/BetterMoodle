import React from 'react';
import Page from '../page';
import Card from 'react-bootstrap/esm/Card';
import RequestHandler from '../../api/RequestHandler';
import ILesson from "../../interfaces/lesson.interface";
import IProfile from '../../interfaces/profile.interface';
import INavigable from '../../interfaces/navigable.interface';
import withRouterProps, { WithRouterProps } from '../../components/withRouterProps';
import { Spinner } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { AuthorCard, LessonCard } from '../../components/Cards';

interface HeadingProps {
  value: string;
}

interface HeadingObjectProps {
  props: HeadingProps;
}

interface HeadingRenderProps {
  level: number;
  children: HeadingObjectProps[];
}

interface LessonProps extends WithRouterProps { }

interface LessonState {
  content: INavigable[];
  lesson: ILesson | undefined;
  author: IProfile | undefined;
}

class Lesson extends React.Component<LessonProps, LessonState> {

  state: LessonState = {
    content: [],
    author: undefined ,
    lesson: undefined,
  }

  async getAuthor() {
    const response = await RequestHandler.get(`/profile/${this.state.lesson?.author}`);
    const author = response as IProfile;
    if (author != null) {
      this.setState({ author: author });
    }
  }

  async getLesson() {
    const response = await RequestHandler.get(`/lessons/${this.props.params.slug}`);
    const lesson = response as ILesson;
    if (lesson != null) {
      this.setState({ lesson: lesson });
    }
  }

  async componentDidMount() {
    await this.getLesson();
    await this.getAuthor();
  }

  headingRender = (props: HeadingRenderProps) => {
    return React.createElement("h" + props.level, { id: this.makeId(props.children[0].props.value) ?? "" }, props.children);
  }

  makeId(str: string): string {
    return str ? str.toLowerCase().replace(/ /g, "-") : "";
  }

  parseContent(lesson: ILesson) {
    const content: INavigable[] = [];
    if (lesson != null) {
      if (lesson.body != null) {
        let match;
        let regex = /# [^"\n"]+/g;
        while (match = regex.exec(lesson.body)) {
          const title = lesson.body.substring(match.index + 2, regex.lastIndex);
          content.push({ title: title, slug: "#" + this.makeId(title) });
        }
      }
    }
    return content;
  }

  renderLesson(lesson: ILesson): JSX.Element {
    return (
      <>
        <LessonCard {...lesson} />
        <Card>
          <Card.Body className="article">
            <ReactMarkdown source={lesson.body ?? ""} renderers={{heading: this.headingRender.bind(this)}} />
          </Card.Body>
        </Card>
        <AuthorCard {...this.state.author} />
      </>
    )
  }

  render() {
    return (
      <Page id="lesson" context="lesson" content={this.state.content}>
        {this.state.lesson ? this.renderLesson(this.state.lesson as ILesson) : <Spinner animation="border" variant="primary" />}
      </Page>
    )
  }

}

export default withRouterProps(Lesson);