import React from 'react';
import Navigation from '../../components/Navigation';
import Timetable from '../../components/Timetable';

export default class TimetableView extends React.Component {

  public render() {
    return (
      <div className="app">
        <div className="app-page">
          <Navigation currentPage="timetable" />
          <Timetable />
        </div>
      </div>
    )
  }

}