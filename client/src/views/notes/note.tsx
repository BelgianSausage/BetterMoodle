import React from 'react';
import Page from '../page';
import Card from 'react-bootstrap/esm/Card';
import { Link } from 'react-router-dom';
import INote from '../../interfaces/note.interface';
import RequestHandler from '../../api/RequestHandler';
import withRouterProps, { WithRouterProps } from '../../components/withRouterProps';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  render() {
    return (
      <Page id="notes">
        <Card>
          <Card.Title>
            {this.state.note?.title}
            {this.renderEditOptions()}
          </Card.Title>
          <Card.Body>
            <Card.Text>
              {this.state.note?.description}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card id="article">
          <Card.Body>
            {this.state.note?.body}
          </Card.Body>
        </Card>
      </Page>
    )
  }

}

export default withRouterProps(Note);