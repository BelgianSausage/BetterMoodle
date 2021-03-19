import React from 'react';
import Page from '../page';
import RequestHandler from '../../api/RequestHandler';

import IModule from '../../interfaces/module.interface';
import ILesson from '../../interfaces/lesson.interface';
import withRouterProps, { WithRouterProps } from '../../components/withRouterProps';
import { LessonCard, ModuleCard } from '../../components/Cards';
import { Spinner } from 'react-bootstrap';

const data = require('../../api/data.json');

interface ModuleProps extends WithRouterProps { }

interface ModuleState {
  module: IModule;
  lessons: ILesson[];
}

class Module extends React.Component<ModuleProps, ModuleState> {

  state: ModuleState = {
    module: data.modules[0],
    lessons: data.lessons,
  }

  async getModule() {
    const response = await RequestHandler.get(`/modules/${this.props.params.slug}`);
    const module = response as IModule;
    if (module != null) {
      this.setState({ module: module });
    }
  }

  async getLessons() {
    if (this.state.module != null) {
      if (this.state.module.id != null) {
        const response = await RequestHandler.get(`/modules/lessons/${this.state.module.id}`);
        const lessons = response as ILesson[];
        if (lessons != null) {
          this.setState({ lessons: lessons });
        }
      }
    }
  }

  async componentDidMount() {
    await this.getModule();
    await this.getLessons();
  }

  render() {
    return (
      <Page id="modules" context="lessons" content={this.state.lessons}>
        <ModuleCard {...this.state.module} />
        {this.state.lessons ? this.state.lessons.map((lesson: ILesson, n: number) => <LessonCard {...lesson} key={n} />) : <Spinner animation="border" variant="primary" />}
      </Page>
    )
  }
}

export default withRouterProps(Module);