import React from 'react';
import Page from '../page';
import ReactMarkdown from 'react-markdown';
import Card from 'react-bootstrap/esm/Card';
import INote from '../../interfaces/note.interface';
import RequestHandler from '../../api/RequestHandler';

import { Link } from 'react-router-dom';
import withRouterProps, { WithRouterProps } from '../../components/withRouterProps';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spinner } from 'react-bootstrap';

interface NoteProps extends WithRouterProps { }

interface NoteState {
  note: INote | undefined;
  editable: boolean;
}

class Note extends React.Component<NoteProps, NoteState> {

  public state: NoteState;

  constructor(props: NoteProps) {
    super(props);

    this.state = {
      note: undefined,
      editable: true,
    };
  }

  async getNote() {
    const response = await RequestHandler.get(`/notes/${this.props.params.slug}`);
    if (response != null) {
      this.setState({ note: response as INote });
    }
  }

  async onDeleteNote() {
    const response = await RequestHandler.get(`/notes/delete/${this.state.note?.id}`)
    this.props.history.push("/notes");
  }

  componentDidMount() {
    this.getNote();
  }

  renderEditOptions() {
    if (this.state.editable) {
      return (
        <>
          <Link to={`/notes/edit/${this.props.params.slug}`}>
            <FontAwesomeIcon icon={faPen} title="Edit note" />
          </Link>
          <FontAwesomeIcon icon={faTrash} title="Delete note" onClick={this.onDeleteNote.bind(this)} />
        </>
      )
    }
  }

  renderNote(note: INote) {
    return (
      <>
        <Card>
          <Card.Title>{note.title} {this.renderEditOptions()}</Card.Title>
          <Card.Body>
            <Card.Text>{note.description}</Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <ReactMarkdown source={note.body ?? ""} />
          </Card.Body>
        </Card>
      </>
    )
  }

  render() {
    return (
      <Page id="notes">
        {this.state.note ? this.renderNote(this.state.note as INote) : <Spinner animation="border" variant="primary" />}
      </Page>
    )
  }

}

export default withRouterProps(Note);