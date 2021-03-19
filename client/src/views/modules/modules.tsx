import React from 'react';
import Page from '../page';
import Card from 'react-bootstrap/Card';
import IModule from '../../interfaces/module.interface';
import RequestHandler from '../../api/RequestHandler';
import { ModuleCard } from '../../components/Cards';
import { Spinner } from 'react-bootstrap';

interface ModulesProps { }

interface ModulesState {
  modules: IModule[];
}

export default class ModulesView extends React.Component<ModulesProps, ModulesState> {

  state: ModulesState = {
    modules: [],
  }

  async getModules() {
    const response = await RequestHandler.get('/modules/all');
    const modules = response as IModule[];
    if (modules != null) {
      this.setState({ modules: modules });
    }
  }

  componentDidMount() {
    this.getModules();
  }

  render() {
    return (
      <Page id="modules" context="modules" content={this.state.modules}>
        <Card id="modules-page-description">
          <Card.Title>Modules</Card.Title>
          <Card.Body>
            <Card.Text>
              Below you'll find a list of all the modules listed for your course.
             </Card.Text>
          </Card.Body>
        </Card>
        {this.state.modules ? this.state.modules.map((module: IModule, n: number) => <ModuleCard {...module} key={n} />): <Spinner animation="border" variant="primary" />}
      </Page>
    )
  }
}