import React from 'react';
import Navigation from '../components/Navigation';

export default class ScheduleView extends React.Component {

  public render() {
    return (
      <div className="app">
        <div className="app-page">
          <Navigation currentPage="schedule" />
        </div>
      </div>
    )
  }

}