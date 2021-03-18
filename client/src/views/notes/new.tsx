import React from 'react';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import RequestHandler from '../../api/RequestHandler';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IModule from '../../interfaces/module.interface';
import withRouterProps, { WithRouterProps } from '../../components/withRouterProps';
import { Col, Row } from 'react-bootstrap';

interface NewNoteViewProps extends WithRouterProps { }

interface NewNoteViewState {
  modules: IModule[];
}

class NewNote extends React.Component<NewNoteViewProps, NewNoteViewState> {

  state: NewNoteViewState = {
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
    const response = await RequestHandler.post("/notes/new", event);
    if (response != null) {
      this.props.history.push("/notes");
    }
  }

  componentDidMount() {
    this.getModules();
  }

  render() {
    return (
      <div>
        <Modal show={true}>
          <Form className="form" method="POST" onSubmit={this.onSubmit.bind(this)}>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Create a new note</Modal.Title>
                <FontAwesomeIcon icon={faTimes} onClick={this.props.history.goBack} />
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" placeholder="Title" />
                </Form.Group>
                <Form.Group>
                  <Row style={{ gridTemplateColumns: "1fr 1fr" }}>
                    <Col>
                      <Form.Label>Module</Form.Label>
                      <Form.Control as="select" name="moduleId">
                        {this.state.modules?.map((module: IModule, index: number) => (
                          <option value={module.id} key={index}>{module.title}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col>
                      <Form.Label>Visibility</Form.Label>
                      <Form.Control as="select" name="published" defaultValue="TRUE">
                        <option value="FALSE">Hidden</option>
                        <option value="TRUE">Visible</option>
                      </Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" name="description" placeholder="Description" />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Body</Form.Label>
                  <Form.Control as="textarea" name="body" placeholder="Body" />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Form.Group>
                  <Button variant="primary" type="submit">Create</Button>
                </Form.Group>
              </Modal.Footer>
            </Modal.Dialog>
          </Form>
        </Modal>
      </div>
    )
  }

}

export default withRouterProps(NewNote);