import './Timetable.css';

import React from 'react';
import moment from 'moment';

import { Calendar, momentLocalizer } from 'react-big-calendar';

const localizer = momentLocalizer(moment);

interface TimetableProps {}

interface TimetableState {}

export default class Timetable extends React.Component<TimetableProps, TimetableState> {

  public state: TimetableState;

  constructor(props: TimetableProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <Calendar events={[]} localizer={localizer} startAccessor="start" endAccessor="end" />
    )
  }

}