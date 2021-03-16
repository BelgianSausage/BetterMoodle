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

  get endString(): string {
    const split: string[] = this.props.end.split("T");
    return split.length > 1 ? split[1].substring(0, 5): this.props.end;
  }

  get startString(): string {
    const split: string[] = this.props.start.split("T");
    return split.length > 1 ? split[1].substring(0, 5): this.props.start;
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await RequestHandler.post("/events/edit", event); 
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
              <Button type="submit">Edit event</Button>
              <Button variant="tertiary">Delete event</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Form>
      </Modal>
    )
  }

}