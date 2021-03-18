import React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import RequestHandler from '../api/RequestHandler';
import ICalendarEvent from '../interfaces/calendarEvent.interface';

interface EditEventModalProps extends ICalendarEvent { 
  show: boolean;
  handleShow: () => void;
  handleHide: () => void;
  handleEditEvent: () => void;
}

export default class EditEventModal extends React.PureComponent<EditEventModalProps> {

  /**
   * Convert the ISO date string for the end time of the event into a string
   * that can be used as the default value for the end time time input control.
   */
  get endString(): string {
    if (typeof this.props.end === "object") {
      return (new Date(this.props.end).toISOString().split("T")[1].substring(0, 5))
    }
    return this.props.end as unknown as string;
  }

  /**
   * Convert the ISO date string for the start time of the event into a string
   * that can be used as the default value for the start time time input control.
   */
  get startString(): string {
    if (typeof this.props.start === "object") {
      return (new Date(this.props.start).toISOString().split("T")[1].substring(0, 5))
    }
    return this.props.start as unknown as string;
  }

  /**
   * Called when the edit event form is submitted. As we don't want to redirect, capture
   * the event and submit it through a seperate fetch request. This edits the event on the 
   * server side. If this was successful, close the modal and trigger a reloading of events.
   * 
   * @param event 
   */
  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await RequestHandler.post("/events/edit", event); 
    this.props.handleHide();
    this.props.handleEditEvent();
  }

  /**
   * Called when the delete event button is clicked. Add the currently selected event id to the
   * form data and post this as a DELETE request. Once the event is delete server side, update the
   * events displayed to show that this has occured.
   */
  async handleDeleteEvent() {
    const formData = new FormData();
    formData.append("id", this.props.id);
    const response = await RequestHandler.delete("/events/delete", formData);
    const json = await response.json();
    this.props.handleHide();
    this.props.handleEditEvent();
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleHide}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Control type="hidden" name="id" defaultValue={this.props.id} />
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Edit event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" placeholder="Event title" defaultValue={this.props.title} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Date / time</Form.Label>
                <Row>
                  <Form.Control name="date" type="date" defaultValue={this.props.date} />
                  <Form.Control name="start" type="time" defaultValue={this.startString} />
                  <Form.Control name="end" type="time" defaultValue={this.endString} />
                </Row>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" placeholder="Event title" defaultValue={this.props.description} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit">Edit event</Button>
              <Button variant="tertiary" onClick={this.handleDeleteEvent.bind(this)}>Delete event</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Form>
      </Modal>
    )
  }

}