import './TimetableEvent.css';

import React from 'react';

interface TimetableEventProps {
  start: string;
  end: string;
  title: string;
}

interface TimetableEventState { }

export default class TimetableEvent extends React.Component<TimetableEventProps, TimetableEventState> {

  private getDurationDisplayText(): string {
    const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    if (this.props.start === this.props.end) {
      return new Date(this.props.start).toLocaleDateString("en-UK", options);
    }
    return `${this.props.start} - ${this.props.end}`;
  }

  public render() {
    return (
      <div className="timetable-event">
        <h3>{this.props.title || "No title"}</h3>
        <div className="timetable-datetime">
          <span>{this.getDurationDisplayText()}</span>
        </div>
      </div>
    )
  }

}