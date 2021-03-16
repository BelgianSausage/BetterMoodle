import React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import RequestHandler from '../api/RequestHandler';

interface AddEventModalProps {
  show: boolean;
  defaultEnd?: string;
  defaultDate?: string;
  defaultStart?: string;
  handleShow: () => void;
  handleHide: () => void;
  handleEventAdded: () => void;
}

export default class AddEventModal extends React.Component<AddEventModalProps> {

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await RequestHandler.post("/events/new", event);
    this.props.handleHide();
    this.props.handleEventAdded();
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleHide}>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Add event to schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" placeholder="Event title" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Row>
                  <Form.Control
                    id="date"
                    name="date"
                    type="date"
                    min={(new Date().toISOString().split('T')[0])}
                    defaultValue={this.props.defaultDate ?? (new Date().toISOString().split('T')[0])}
                    required />
                  <Form.Control
                    id="start"
                    name="start"
                    type="time"
                    min={(new Date().toISOString().split("T")[1].substring(0, 5))}
                    defaultValue={this.props.defaultStart ?? (new Date().toISOString().split("T")[1].substring(0, 5))}
                    required
                  />
                  <Form.Control
                    id="end"
                    name="end"
                    type="time"
                    min={(new Date().toISOString().split("T")[1].substring(0, 5))}
                    defaultValue={this.props.defaultStart ?? (new Date().toISOString().split("T")[1].substring(0, 5))}
                    required />
                </Row>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control name="description" as="textarea" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit">Add event</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Form>
      </Modal>
    )
  }

}