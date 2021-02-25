import React from 'react';
import Page from '../page';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import { IModule } from '../../api/Interfaces';
import { fakeModules } from '../../data/modules';

interface ModulesProps { }

interface ModulesState {
  modules: IModule[];
}

export default class ModulesView extends React.Component<ModulesProps, ModulesState> {

  public state: ModulesState;

  constructor(props: ModulesProps) {
    super(props);

    this.state = {
      modules: fakeModules,
    }
  }

  public render() {
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
        {
          this.state.modules.map((m: IModule, n: number) => {
            return (
              <Link to={m.slug} key={n}> 
                <Card className="module">
                  <Card.Title>{m.title}</Card.Title>
                  <Card.Body>
                    <Card.Text>{m.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            )
          })
        }
      </Page>
    )
  }
}