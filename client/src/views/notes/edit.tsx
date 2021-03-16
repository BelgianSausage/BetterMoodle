import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import INote from '../../interfaces/note.interface';
import withRouterProps, { WithRouterProps } from '../../components/withRouterProps';
import RequestHandler from '../../api/RequestHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/esm/Button';
import IModule from '../../interfaces/module.interface';

interface EditNoteViewProps extends WithRouterProps { }

interface EditNoteViewState {
  note: INote | undefined;
  modules: IModule[];
}

class EditView extends React.Component<EditNoteViewProps, EditNoteViewState> {

  state: EditNoteViewState = {
    note: undefined,
    modules: [],
  }

  async onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    RequestHandler.post("/notes/edit", event);
  }

  async getNote() {
    const response = await RequestHandler.get(`/notes/${this.props.params.slug}`);
    const note = response as INote;
    if (note != null) {
      this.setState({ note: note });
    }
  }

  async getModules() {
    const response = await RequestHandler.get("/modules/all");
    const modules = response as IModule[];
    if (modules != null) {
      this.setState({ modules: modules });
    }
  }

  navigateBack() {
    this.props.history.goBack();
  }

  async componentDidMount() {
    await this.getNote();
    await this.getModules();
  }

  render() {
    return (
      <div>
        <Modal show={true}>
          <Form className="form" method="POST" onSubmit={this.onSubmit.bind(this)}>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Edit note</Modal.Title>
                <FontAwesomeIcon icon={faTimes} onClick={this.navigateBack.bind(this)} />
              </Modal.Header>
              <Modal.Body>
                <Form.Control name="id" type="hidden" defaultValue={this.state.note?.id} />
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="title" placeholder="Title" defaultValue={this.state.note?.title} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Module</Form.Label>
                  <Form.Control as="select" name="moduleId">
                    {this.state.modules?.map((module: IModule, index: number) => (
                      <option value={module.id} key={index}>{module.title}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" name="description" placeholder="Description" defaultValue={this.state.note?.description} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Body</Form.Label>
                  <Form.Control as="textarea" name="body" placeholder="Body" defaultValue={this.state.note?.body} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Form.Group>
                  <Button variant="primary" type="submit">Save</Button>
                </Form.Group>
              </Modal.Footer>
            </Modal.Dialog>
          </Form>
        </Modal>
      </div>
    )
  }

}

export default withRouterProps(EditView);