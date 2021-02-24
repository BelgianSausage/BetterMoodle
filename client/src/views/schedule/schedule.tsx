import React from 'react';
import Navigation from '../../components/Navigation';
import PageFilter from '../../components/PageFilter';
import Panel from '../../components/Panel';
import QuickLinks from '../../components/QuickLinks';

export default class ScheduleView extends React.Component {

  public render() {
    return (
      <div className="app">
        <div className="app-page">
          <Navigation currentPage="schedule" />
          <div className="app-page__inner">
            <Panel>
              <PageFilter />
              <QuickLinks links={[]} />
            </Panel>
            <div className="app-content">
              <div className="app-content__wrapper">

              </div>
            </div>
            <Panel />
          </div>
        </div>
      </div>
    )
  }

}