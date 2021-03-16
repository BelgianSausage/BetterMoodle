import './settings.css';

import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import RequestHandler from '../api/RequestHandler';
import Navigation from '../components/Navigation';
import IModule from '../interfaces/module.interface';


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
                </Card>
                <Card className="settings-card" id="modules-settings">
                  <Card.Header>
                    <Card.Title>Modules Settings</Card.Title>
                  </Card.Header>
                </Card>
                <Card className="settings-card" id="lesson-settings">
                  <Card.Header>
                    <Card.Title>Lesson Settings</Card.Title>
                  </Card.Header>
                </Card>
                <Card className="settings-card" id="note-settings">
                  <Card.Header>
                    <Card.Title>Note Settings</Card.Title>
                  </Card.Header>
                </Card>
                <Card className="settings-card" id="notification-settings">
                  <Card.Header>
                    <Card.Title>Notification Settings</Card.Title>
                  </Card.Header>
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