import React from 'react';
import Page from '../page';
import Card from 'react-bootstrap/Card';
import RequestHandler from '../../api/RequestHandler';

import { Link } from 'react-router-dom';
import IModule from '../../interfaces/module.interface';
import ILesson from '../../interfaces/lesson.interface';
import withRouterProps, { WithRouterProps } from '../../components/withRouterProps';

const data = require('../../api/data.json');

interface ModuleProps extends WithRouterProps {}

interface ModuleState  {
  module: IModule;
  lessons: ILesson[];
}

class Module extends React.Component<ModuleProps, ModuleState> {

  public state: ModuleState;

  constructor(props: ModuleProps) {
    super(props);

    this.state = {
      module: data.modules[0],
      lessons: data.lessons,
    }
  }

  private async getModule() {
    const response = await RequestHandler.get(`/modules/${this.props.params.slug}`);
    const module = response as IModule;
    if (module != null) {
      this.setState({ module: module });
    }
  }

  private async getLessons() {
    if (this.state.module != null) {
      if (this.state.module.id != null) {
        const response = await RequestHandler.get(`/lessons/${this.state.module.id}`);
        const lessons = response as ILesson[];
        if (lessons != null) {
          this.setState({ lessons: lessons });
        }
      }
    }
  }
  
  componentDidMount() {
    this.getModule();
    this.getLessons();
  }

  private getLessonCards() {
    if (this.state.lessons == null) return;
    
    return this.state.lessons.map((lesson: ILesson, n: number) => {
      return (
        <Link to={lesson.slug} key={n}>
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
    })
  }

  public render() {
    return (
      <Page id="modules" content={this.state.lessons}>
        <Card>
          <Card.Title>
            {this.state.module.title}
          </Card.Title>
          <Card.Body>
            <Card.Text>
              {this.state.module.description}
            </Card.Text>
          </Card.Body>
        </Card>
        {this.getLessonCards()}
      </Page>
    )
  }
}

export default withRouterProps(Module);