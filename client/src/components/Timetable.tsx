import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Timetable.css';

import React from 'react';
import moment from 'moment';
import GoogleCalendarAPI from '../api/GoogleCalendarAPI';
import { Calendar, momentLocalizer } from 'react-big-calendar';

const localizer = momentLocalizer(moment);

interface IEvent {
  end: Date;
  start: Date;
  title: string;
  desc?: string;
}

interface TimetableProps { }

interface TimetableState { 
  events: IEvent[];
}

export default class Timetable extends React.Component<TimetableProps, TimetableState> {

  public state: TimetableState;


  constructor(props: TimetableProps) {
    super(props);

    this.state = {
      events: []
    };
  }

  componentDidMount() {
    GoogleCalendarAPI.getEvents().then((events: any[]): void => {
      this.setState({ events: (events as IEvent[])})
    })
  }
  
  render() {
    return (
      <Calendar 
        step={30}
        localizer={localizer}
        events={this.state.events} 
        defaultDate={new Date()}
        views={["month", "work_week", "day", "agenda"]}
      />
    )
  }

}