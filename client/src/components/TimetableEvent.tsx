import './TimetableEvent.css';

import React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';

interface TimetableEventProps {
  start: string;
  end: string;
  title: string;
}

interface TimetableEventState {
  showModal: boolean;
}


export default class TimetableEvent extends React.Component<TimetableEventProps, TimetableEventState> {

  public state: TimetableEventState = {
    showModal: false,
  }

  private showModal() {
    this.setState({ showModal: true });
  }

  private hideModal() {
    this.setState({ showModal: false });
  }

  private editEvent() {
    // edit the event
    this.hideModal();
  }

  private getDurationDisplayText(): string {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    return (this.props.start === this.props.end)
      ? new Date(this.props.start).toLocaleDateString("en-UK", options)
      : `${this.props.start} - ${this.props.end}`;
  }

  public render() {
    return (
      <>
        <div className="timetable-event" onClick={this.showModal.bind(this)}>
          <h3>{this.props.title || "No title"}</h3>
          <div className="timetable-datetime">
            <span>{this.getDurationDisplayText()}</span>
          </div>
        </div>

        <Modal id="edit-echedule-event" show={this.state.showModal} onHide={this.hideModal.bind(this)}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Edit scheduled event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control placeholder="Event title" defaultValue={this.props.title} />
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
              <Button onClick={this.editEvent.bind(this)}>Edit event</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </>
    )
  }

}