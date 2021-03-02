import './settings.css';

import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import RequestHandler from '../api/RequestHandler';
import Navigation from '../components/Navigation';

import { IModule } from '../api/Interfaces';

interface TimetableColourSettingProps extends IModule { }

interface TimetableColourSettingState { }

class TimetableColourSetting extends React.Component<TimetableColourSettingProps, TimetableColourSettingState> {

  state = {};

  render() {
    return (
      <Card className="colour-setting">
        <Card.Header>
          <span>{this.props.title}</span>
          <span>
            <input type="color" />
          </span>
        </Card.Header>
      </Card>
    )
  }

}


interface SettingsViewProps { }

interface SettingsViewState {
  modules: IModule[];
}

export default class SettingsView extends React.Component<SettingsViewProps, SettingsViewState> {

  state = {
    modules: [],
  }

  getModules() {
    RequestHandler.get("/modules/all").then((modules: any) => {
      if (!(modules.hasOwnProperty('error'))) {
        this.setState({ modules: (modules as IModule[]) })
      }
    })
  }

  componentDidMount() {
    this.getModules();
  }

  render() {
    return (
      <div className="app">
        <div className="app-page">
          <Navigation />
          <div className="app-page__inner">
            <div className="app-panel">
              <div className="app-panel__wrapper">
              </div>
            </div>
            <div className="app-content">
              <div className="app-content__wrapper">
                <Card className="settings-card" id="timetable-settings">
                  <Card.Header>
                    <Card.Title>Timetable Settings</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    {this.state.modules.map((module: IModule) => <TimetableColourSetting {...module} />)}
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div className="app-panel"></div>
          </div>
        </div>
      </div>
    )
  }

}