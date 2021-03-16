import React from 'react';
import Page from '../page';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import IModule from '../../interfaces/module.interface';
import RequestHandler from '../../api/RequestHandler';

const data = require('../../api/data.json');

interface ModulesProps { }

interface ModulesState {
  modules: IModule[];
}

export default class ModulesView extends React.Component<ModulesProps, ModulesState> {

  public state: ModulesState;

  constructor(props: ModulesProps) {
    super(props);

    this.state = {
      modules: data.modules,
    }
  }

  private async getModules() {
    const response = await RequestHandler.get('/modules/all');
    const modules = response as IModule[];
    if (modules != null) {
      this.setState({ modules: modules });
    }
  }

  private getModuleCards() {
    if (this.state.modules == null) return;

    const cards = this.state.modules.map((m: IModule, n: number) => {
      return (
        <Link to={`/modules/${m.slug}`} key={n}>
          <Card className="module">
            <Card.Title>{m.title}</Card.Title>
            <Card.Body>
              <Card.Text>{m.description}</Card.Text>
            </Card.Body>
          </Card>
        </Link>
      )
    })

    return cards;
  }

  componentDidMount() {
    this.getModules();
  }

  render() {
    return (
      <Page id="modules" content={this.state.modules}>
        <Card id="modules-page-description">
          <Card.Title>Modules</Card.Title>
          <Card.Body>
            <Card.Text>
              Below you'll find a list of all the modules listed for your course.
             </Card.Text>
          </Card.Body>
        </Card>
        {this.getModuleCards()}
      </Page>
    )
  }
}