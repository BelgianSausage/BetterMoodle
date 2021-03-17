import React from 'react';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import IModule from '../../interfaces/module.interface';
import withRouterProps, { WithRouterProps } from '../../components/withRouterProps';
import RequestHandler from '../../api/RequestHandler';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface EditModuleViewProps extends WithRouterProps { }

interface EditModuleViewState {
  module: IModule | undefined;
}

class EditModuleView extends React.Component<EditModuleViewProps, EditModuleViewState> {

  state: EditModuleViewState = {
    module: undefined,
  }

  async getModule() {
    const response = await RequestHandler.get(`/modules/${this.props.params.slug}`);
    const module = response as IModule;
    if (module != null) {
      this.setState({ module: module });
    }
  }

  async onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await RequestHandler.post("/modules/edit", event);
  }

  componentDidMount() {
    this.getModule();
  }

  render() {
    return (
      <div>
        <Modal show={true}>
          <Form method="POST" action="/modules/edit" onSubmit={this.onSubmit.bind(this)}>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Edit module</Modal.Title>
                <FontAwesomeIcon icon={faTimes} onClick={this.props.history.goBack} />
              </Modal.Header>
              <Modal.Body>
                <Form.Control type="hidden" name="id" defaultValue={this.state.module?.id} />
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    placeholder="Name"
                    defaultValue={this.state.module?.title}></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    placeholder="Description"
                    defaultValue={this.state.module?.description}></Form.Control>
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

export default withRouterProps(EditModuleView);