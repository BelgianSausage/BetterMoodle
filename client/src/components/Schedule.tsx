import './Schedule.css';

import React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/esm/Form';
import Card from "react-bootstrap/esm/Card";
import TimetableEvent from './TimetableEvent';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import GoogleCalendarAPI from '../api/GoogleCalendarAPI';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface ScheduleProps {

}

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

  private showModal() {
    this.setState({ showModal: true });
  }

  private hideModal() {
    this.setState({ showModal: false });
  }

  public componentDidMount() {
    GoogleCalendarAPI.getEvents()
      .then((events) => this.setState({ events: events as any[] }));
  }

  public render() {
    return (
      <>
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
                return <TimetableEvent key={index} {...event} />
              })
            }
          </Card.Body>
          <Card.Footer>
            <Button onClick={this.showModal.bind(this)}>Add to schedule</Button>
          </Card.Footer>
        </Card>

        <Modal id="add-schedule" show={this.state.showModal} onHide={this.hideModal.bind(this)}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Add event to schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control placeholder="Event title" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Row>
                  <Form.Control type="date" />
                  <Form.Control type="time" />
                  <Form.Control type="time" />
                </Row>
              </Form.Group>
              <Form.Group>
                <Form.Label>Summary</Form.Label>
                <Form.Control as="textarea" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button>Add event</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </>
    )
  }

}