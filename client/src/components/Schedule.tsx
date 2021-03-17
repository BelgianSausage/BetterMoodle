import './Schedule.css';

import React from 'react';
import Card from "react-bootstrap/esm/Card";
import Button from 'react-bootstrap/esm/Button';
import AddEventModal from './AddEventModal';
import EditEventModal from './EditEventModal';
import RequestHandler from '../api/RequestHandler';
import ICalendarEvent from '../interfaces/calendarEvent.interface';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface ScheduleEventProps extends ICalendarEvent { }

interface ScheduleEventState {
  showModal: boolean;
}

class ScheduleEvent extends React.Component<ScheduleEventProps, ScheduleEventState> {

  state: ScheduleEventState = {
    showModal: false,
  };

  updateSelf() {}

  render() {
    return (
      <>
        <div className="schedule-event" onClick={() => this.setState({ showModal: true })}>
          <div className="schedule-event__title">{this.props.title}</div>
          <div className="schedule-event__description">{this.props.description}</div>
          <div className="schedule-event__datetime">{this.props.date} {this.props.start} - {this.props.end}</div>
        </div>

        <EditEventModal
          {...this.props} 
          show={this.state.showModal} 
          handleShow={() => this.setState({ showModal: true })}
          handleHide={() => this.setState({ showModal: false })} 
          handleEditEvent={this.updateSelf.bind(this)}
        />
      </>
    )
  }

}

interface ScheduleProps { }

interface ScheduleState {
  events: any[];
  showModal: boolean;
}

export class Schedule extends React.Component<ScheduleProps, ScheduleState> {

  public state: ScheduleState;

  constructor(props: ScheduleProps) {
    super(props);

    this.state = {
      events: [],
      showModal: false
    };
  }

  async getEvents() {
    const response = await RequestHandler.get("/events/all");
    const events = response as ICalendarEvent[];
    if (events != null) {
      this.setState({ events: events });
    }
  }

  componentDidMount() {
    this.getEvents();
  }

  componentWillUnmount() {
    this.setState({ events: [] });
  }

  render() {
    return (
      <>
        <Card className="schedule">
          <Card.Title>
            <div className="schedule-title">
              <h4>Schedule</h4>
              <Link to="/timetable" title="View in timetable">
                <FontAwesomeIcon icon={faCalendar} />
              </Link>
            </div>
          </Card.Title>
          <Card.Body className="schedule-body">
            {this.state.events.map((e: any, i: number) => <ScheduleEvent key={i} {...e} />)}
          </Card.Body>
          <Card.Footer>
            <Button onClick={() => this.setState({ showModal: true })}>Add to schedule</Button>
          </Card.Footer>
        </Card>

        <AddEventModal
          show={this.state.showModal}
          handleShow={() => this.setState({ showModal: true })}
          handleHide={() => this.setState({ showModal: false })}
          handleEventAdded={this.getEvents.bind(this)}
        />
      </>
    )
  }

}