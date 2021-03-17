import React from 'react';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import withRouterProps, { WithRouterProps } from '../../components/withRouterProps';
import ILesson from '../../interfaces/lesson.interface';
import RequestHandler from '../../api/RequestHandler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import IModule from '../../interfaces/module.interface';

interface EditLessonViewProps extends WithRouterProps { }

interface EditLessonViewState { 
  lesson: ILesson | undefined;
  modules: IModule[];
}

class EditLessonView extends React.Component<EditLessonViewProps, EditLessonViewState> {

  state: EditLessonViewState = {
    lesson: undefined,
    modules: [],
  }

  async getLesson() {
    const response = await RequestHandler.get(`/lessons/${this.props.params.slug}`);
    const lesson = response as ILesson;
    if (lesson != null) {
      this.setState({ lesson: lesson });
    }
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
    const response = await RequestHandler.post("/lessons/edit", event);
    this.props.history.push("/admin");
  }

  componentDidMount() { 
    this.getLesson();
    this.getModules();
  }

  render() {
    return (
      <div>
        <Modal show={true} onHide={() => this.props.history.goBack()}>
          <Form onSubmit={this.onSubmit.bind(this)}>
            <Form.Control type="hidden" value={this.state.lesson?.id} />
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Edit lesson</Modal.Title>
                <FontAwesomeIcon icon={faTimes} onClick={this.props.history.goBack} />
              </Modal.Header>
              <Modal.Body>
                <Form.Control type="hidden" name="id" value={this.state.lesson?.id} />
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control 
                    name="title" 
                    placeholder="Title" 
                    defaultValue={this.state.lesson?.title} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Module</Form.Label>
                  <Form.Control as="select" name="moduleId" defaultValue={this.state.lesson?.moduleId}>
                    {this.state.modules.map((module: IModule, index: number) => (
                      <option key={index} value={module.id}>{module.title}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    name="description" 
                    placeholder="Description" 
                    defaultValue={this.state.lesson?.description} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Body</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    name="body" 
                    placeholder="Description" 
                    defaultValue={this.state.lesson?.body} />
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

export default withRouterProps(EditLessonView);