import React from 'react';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import withRouterProps, { WithRouterProps } from '../../components/withRouterProps';
import RequestHandler from '../../api/RequestHandler';
import IModule from '../../interfaces/module.interface';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface NewLessonViewProps extends WithRouterProps { }

interface NewLessonViewState { 
  modules: IModule[];
}

class NewLessonView extends React.Component<NewLessonViewProps, NewLessonViewState> {

  state: NewLessonViewState = {
    modules: [],
  }

  async getModules() {
    const response = await RequestHandler.get("/modules/all");
    const modules = response as IModule[];
    if (modules != null) {
      this.setState({ modules: modules });
    }
  }

  async onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await RequestHandler.post("/lessons/new", event);
    this.props.history.goBack();
  }

  componentDidMount() {
    this.getModules();
  }

  render() {
    return (
      <div>
        <Modal show={true} onHide={() => this.props.history.goBack()}>
          <Form onSubmit={this.onSubmit.bind(this)}>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>New lesson</Modal.Title>
                <FontAwesomeIcon icon={faTimes} onClick={this.props.history.goBack} />
              </Modal.Header>
              <Modal.Body>
                <Form.Control type="hidden" name="id" />
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control name="title" placeholder="Title"></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Module</Form.Label>
                  <Form.Control as="select" name="moduleId">
                    {this.state.modules.map((module: IModule, index: number) => (
                      <option key={index} value={module.id}>{module.title}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" name="description" placeholder="Description"></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Body</Form.Label>
                  <Form.Control as="textarea" name="body" placeholder="Description"></Form.Control>
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

export default withRouterProps(NewLessonView);