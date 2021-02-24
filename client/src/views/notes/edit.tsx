import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import MarkdownEditor from '@uiw/react-markdown-editor';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { INote } from '../../api/Interfaces';
import { fakeNotes } from '../../data/notes';

interface EditNoteViewProps {
  slug: string;
}

interface EditNoteViewState {
  note: INote | undefined;
  showModal: boolean;
}

class EditView extends React.Component<EditNoteViewProps, EditNoteViewState> {

  public state: EditNoteViewState;

  constructor(props: EditNoteViewProps) {
    super(props);

    this.state = {
      note: undefined,
      showModal: false,
    };
  }

  private onChange() {

  }

  private onSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  private showModal() {
    this.setState({ showModal: true });
  }

  private hideModal() {
    this.setState({ showModal: false });
  }

  public componentDidMount() {
    const note: INote = fakeNotes.find((n: INote) => n.slug === this.props.slug) || fakeNotes[0];
    this.setState({ note: note });
  }

  public render() {
    return (
      <div className="app" id="new-note">
        <form onSubmit={this.onSubmit.bind(this)}>
          <MarkdownEditor name="editor" value={this.state.note?.markdown || ""} onChange={this.onChange.bind(this)} />

          <button className="fab" title="Save note" onClick={this.showModal.bind(this)}>
            <FontAwesomeIcon icon={faSave} />
          </button>

          <Modal show={this.state.showModal} onHide={this.hideModal.bind(this)}>
            <Modal.Dialog>
              <Modal.Header closeButton>
                <Modal.Title>Confirm publish options</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control placeholder="Note title" defaultValue={this.state.note?.title} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} defaultValue={this.state.note?.description} />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.hideModal.bind(this)}>Save changes</Button>
                <Button variant="tertiary" onClick={this.hideModal.bind(this)}>Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </form>
      </div>
    )
  }

}

const EditNoteView = (): JSX.Element => {
  let { slug }: any = useParams();
  return (<EditView slug={slug} />);
}

export default EditNoteView;