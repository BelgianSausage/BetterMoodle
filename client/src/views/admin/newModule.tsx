import React from 'react';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import withRouterProps, { WithRouterProps } from '../../components/withRouterProps';
import RequestHandler from '../../api/RequestHandler';

interface NewModuleViewProps extends WithRouterProps { }

interface NewModuleViewState { }

class NewModuleView extends React.Component<NewModuleViewProps, NewModuleViewState> {

  state: NewModuleViewState = {}

  async onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await RequestHandler.post("/modules/new", event);
  }

  render() {
    return (
      <div>
        <Modal show={true} onHide={() => this.props.history.goBack()}>
          <Form onSubmit={this.onSubmit.bind(this)}>
            <Modal.Dialog>
              <Modal.Header closeButton>
                <Modal.Title>New module</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Control type="hidden" name="id" />
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" placeholder="Name"></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" name="description" placeholder="Description"></Form.Control>
                </Form.Group>
                <Button type="submit">Submit</Button>
              </Modal.Body>
            </Modal.Dialog>
          </Form>
        </Modal>
      </div>
    )
  }

}

export default withRouterProps(NewModuleView);