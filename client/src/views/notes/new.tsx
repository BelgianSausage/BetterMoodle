import './new.css';

import React from 'react';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

interface NewNoteViewProps {
  history: any;
}

interface NewNoteViewState {
  title: string;
  markdown: string;
  showModal: boolean;
  description: string;
}

class NewNote extends React.Component<NewNoteViewProps, NewNoteViewState> {

  public state: NewNoteViewState;

  constructor(props: NewNoteViewProps) {
    super(props);

    this.state = {
      title: "",
      markdown: "",
      description: "",
      showModal: false
    };
  }

  private showModal() {
    this.setState({ showModal: true });
  }

  private hideModal() {
    this.setState({ showModal: false });
  }

  private onChange(editor: any, data: string, value: string) {
    this.setState({ markdown: value });
  }

  private updateTitle(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ title: event.target.value });
  }

  private updateDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ title: event.target.value });
  }

  private onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form: HTMLFormElement = event.target as HTMLFormElement;
    const data: FormData = new FormData(form);
    data.append('title', this.state.title);
    data.append('editor', this.state.markdown);
    data.append('description', this.state.description);
  }

  public render() {
    return (
      <div className="app" id="new-note">
        <form onSubmit={this.onSubmit.bind(this)}>
          <MarkdownEditor
            name="editor"
            visible={true}
            onChange={(editor: any, data: string, value: string) => this.onChange(editor, data, value)} />
          <div className="fabs">
            <button className="fab theme-1" title="Upload note">
              <FontAwesomeIcon icon={faUpload} />
            </button>
            <button title="Close note" className="fab theme-3" onClick={this.props.history.goBack}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </form>

        <Modal show={this.state.showModal} onHide={this.hideModal.bind(this)}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Confirm publish options</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control placeholder="Note title" onChange={this.updateTitle.bind(this)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={this.updateDescription.bind(this)} />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.hideModal.bind(this)}>Save changes</Button>
              <Button variant="tertiary" onClick={this.hideModal.bind(this)}>Close</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>
    )
  }

}

const NewNoteView = (): JSX.Element => {
  let history = useHistory();
  return <NewNote history={history} />
}

export default NewNoteView;