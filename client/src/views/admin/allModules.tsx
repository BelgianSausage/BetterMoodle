import React from 'react';
import RequestHandler from '../../api/RequestHandler';
import IModule from '../../interfaces/module.interface';

interface AllModulesViewProps { }

interface AllModulesViewState {
  modules: IModule[];
}

export default class AllModulesView extends React.Component<AllModulesViewProps, AllModulesViewState> {

  state: AllModulesViewState = {
    modules: [],
  }

  async getModules() {
    const response = await RequestHandler.get("/modules/all");
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
      <div>
        <ul>
          {
            this.state.modules.map((module: IModule, index: number) => {
              return (
                <li key={index}>
                  <a className="link" href={module.slug}>{module.title}</a>&nbsp;&nbsp;
                  <a className="link" href={`/admin/modules/edit/${module.slug}`}>Edit</a>&nbsp;&nbsp;
                  <a className="link" href={`/admin/modules/delete/${module.slug}`}>Delete</a>
                </li>
              )
            })
          }
        </ul>
        <a className="link" href="/admin">Back</a>
      </div>
    )
  }

}