import React from 'react';
import Card from '../components/Card';
import Navigation from '../components/Navigation';

import { IModule } from '../api/Interfaces';
import { fakeModules } from '../data/modules';

interface ModulesProps {}

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
            <div className="app-panel"></div>
            <div className="app-content">
              <div className="app-content__wrapper">
                {this.state.modules.map((m: IModule, n: number) => <Card className="app-card--module" key={n} {...m} /> )}
              </div>
            </div>
            <div className="app-panel"></div>
          </div>
        </div>
      </div>
    )
  }

}