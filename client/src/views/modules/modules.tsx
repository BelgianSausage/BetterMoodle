import React from 'react';
import Card from 'react-bootstrap/Card';
import Panel from '../../components/Panel';
import PageFilter from '../../components/PageFilter';
import QuickLinks from '../../components/QuickLinks';
import Navigation from '../../components/Navigation';

import { IModule } from '../../api/Interfaces';
import { fakeModules } from '../../data/modules';
import { Link } from 'react-router-dom';

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
      <div className="app">
        <div className="app-page">
          <Navigation currentPage="modules" />
          <div className="app-page__inner">
            <Panel>
              <PageFilter />
              <QuickLinks links={this.state.modules} />
            </Panel>
            <div className="app-content">
              <div className="app-content__wrapper">
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
                      <Link to={`/modules/${m.slug}`}>
                        <Card className="module" key={n}>
                          <Card.Title>{m.title}</Card.Title>
                          <Card.Body>
                            <Card.Text>{m.description}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                    )
                  })
                }
              </div>
            </div>
            <Panel />
          </div>
        </div>
      </div>
    )
  }
}