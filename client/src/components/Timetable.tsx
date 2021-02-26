import './Timetable.css';

import React from 'react';
import moment from 'moment';
import GoogleCalendarAPI from '../api/GoogleCalendarAPI';

import { Calendar, momentLocalizer } from 'react-big-calendar';

const localizer = momentLocalizer(moment);

interface TimetableProps { }

interface TimetableState { 
  events: any[];
}

export default class Timetable extends React.Component<TimetableProps, TimetableState> {

  public state: TimetableState;


  constructor(props: TimetableProps) {
    super(props);

    this.state = {
      events: []
    };
  }

  public componentDidMount() {
    GoogleCalendarAPI.getEvents().then((events: any[]) => {
      this.setState({ events: events });
    });
  }

  public render() {
    return (
      <Calendar 
        localizer={localizer}
        endAccessor="end"
        startAccessor="start"
        events={this.state.events} 
      />
    )
  }

}