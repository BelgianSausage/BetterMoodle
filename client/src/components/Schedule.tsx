import './Schedule.css';

import React from 'react';
import Card from "react-bootstrap/esm/Card";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface ScheduleProps {

}

interface ScheduleState {

}

export class Schedule extends React.Component<ScheduleProps, ScheduleState> {

  public state: ScheduleState;

  constructor(props: ScheduleProps) {
    super(props);

    this.state = {};
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
        <Card.Body>

        </Card.Body>
      </Card>
    )
  }

}