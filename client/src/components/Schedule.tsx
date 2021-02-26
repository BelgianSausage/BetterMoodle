import './Schedule.css';

import React from 'react';
import Card from "react-bootstrap/esm/Card";
import GoogleCalendarAPI from '../api/GoogleCalendarAPI';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import TimetableEvent from './TimetableEvent';
import Button from 'react-bootstrap/esm/Button';

interface ScheduleProps {

}

interface ScheduleState {
  events: any[];
}

export class Schedule extends React.Component<ScheduleProps, ScheduleState> {

  public state: ScheduleState;

  constructor(props: ScheduleProps) {
    super(props);

    this.state = {
      events: []
    };
  }

  public componentDidMount() {
    GoogleCalendarAPI.getEvents().then((events) => {
      this.setState({ events: events as any[] });
    });
  }

  public render() {
    return (
      <Card id="schedule">
        <Card.Title>
          <div className="schedule-title">
            <h4>Schedule</h4>
            <Link to="/timetable" title="View in timetable">
              <FontAwesomeIcon icon={faCalendar} />
            </Link>
          </div>
        </Card.Title>
        <Card.Body className="schedule-body">
          {
            this.state.events.map((event: any, index: number) => {
              return <TimetableEvent key={index} { ...event} />
            })
          }
        </Card.Body>
        <Card.Footer>
          <Button>Add to schedule</Button>
        </Card.Footer>
      </Card>
    )
  }

}