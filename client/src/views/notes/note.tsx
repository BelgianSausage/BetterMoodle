import React from 'react';
import Page from '../page';
import ReactMarkdown from 'react-markdown';
import Card from 'react-bootstrap/esm/Card';
import INote from '../../interfaces/note.interface';
import RequestHandler from '../../api/RequestHandler';
import INavigable from '../../interfaces/navigable.interface';
import withRouterProps, { WithRouterProps } from '../../components/withRouterProps';
import { faFlag, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IProfile from '../../interfaces/profile.interface';
import { AuthorCard } from '../../components/Cards';

interface HeadingProps {
  value: string;
}

interface HeadingObjectProps {
  props: HeadingProps;
}

interface HeadingRenderProps {
  level: number;
  children: HeadingObjectProps[];
}

interface NoteProps extends WithRouterProps { }

interface NoteState {
  editable: boolean;
  content: INavigable[];
  note: INote | undefined;
  author: IProfile | undefined;
  showFlagNoteModal: boolean;
}

class Note extends React.Component<NoteProps, NoteState> {

  state: NoteState = {
    content: [],
    note: undefined,
    author: undefined,
    editable: true,
    showFlagNoteModal: false,
  }

  async getNote() {
    const response = await RequestHandler.get(`/notes/${this.props.params.slug}`);
    const note = response as INote;
    if (note != null) {
      this.setState({ note: note, content: this.parseContent(note) });
    }
  }

  async getAuthor() {
    const response = await RequestHandler.get(`/profile/${this.state.note?.author}`);
    const author = response as IProfile;
    if (author != null) {
      this.setState({ author: author });
    }
  }

  async onDeleteNote() {
    const response = await RequestHandler.get(`/notes/delete/${this.state.note?.id}`)
    this.props.history.push("/notes");
  }

  async componentDidMount() {
    await this.getNote();
    await this.getAuthor();
  }

  headingRender = (props: HeadingRenderProps) => {
    return React.createElement("h" + props.level, { id: this.makeId(props.children[0].props.value) ?? "" }, props.children);
  }

  makeId(str: string): string {
    return str ? str.toLowerCase().replace(/ /g, "-") : "";
  }

  parseContent(note: INote) {
    const content: INavigable[] = [];
    if (note != null) {
      if (note.body != null) {
        let match;
        let regex = /# [^"\n"]+/g;
        while (match = regex.exec(note.body)) {
          const title = note.body.substring(match.index + 2, regex.lastIndex);
          content.push({ title: title, slug: "#" + this.makeId(title) });
        }
      }
    }
    return content;
  }

  async handleFlagNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await RequestHandler.post("/flag/new", event);
    if (response != null) {
      this.setState({ showFlagNoteModal: false });
    }
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
    console.log(note);
    return (
      <>
        <Card>
          <Card.Title>
            {note.title}
            {this.renderEditOptions()}
            <FontAwesomeIcon 
              icon={faFlag} 
              style={{ color: note.flagged === 1 ? "var(--theme-red-1)" : "var(--theme-white-1)" }}
              onClick={() => this.setState({ showFlagNoteModal: true })} />
          </Card.Title>
          <Card.Body>
            <Card.Text>{note.description}</Card.Text>
          </Card.Body>
        </Card>
        <Card className="article">
          <Card.Body>
            <ReactMarkdown source={note.body ?? ""} renderers={{ heading: this.headingRender.bind(this) }} />
          </Card.Body>
        </Card>
        <AuthorCard {...this.state.author} />
      </>
    )
  }

  render() {
    return (
      <Page id="notes" content={this.state.content}>
        <Modal show={this.state.showFlagNoteModal} onHide={() => this.setState({ showFlagNoteModal: false })}>
          <Form onSubmit={this.handleFlagNote.bind(this)}>
            <Modal.Dialog>
              <Modal.Header closeButton>
                <Modal.Title>Flag Note</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Control type="hidden" name="noteId" defaultValue={this.state.note?.id} />
                <Form.Group>
                  <p>
                    Content uploaded to Co-Note must obide by the <a href="" className="link">Terms of Serivce</a>.
                    If you believe that this note contains the following please click submit with a comment describing
                    the issue you have with the note:

                    <ul>
                      <li>Violence</li>
                      <li>Terrorism/violent extremism</li>
                      <li>Child sexual exploitation</li>
                      <li>Abuse/harassment</li>
                      <li>Hateful conduct</li>
                      <li>Suicide or self-harm</li>
                      <li>Sensitive media, including graphic violence and adult content</li>
                      <li>Illegal or certain regulated goods or services</li>
                    </ul>

                </p>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Comment</Form.Label>
                  <Form.Control as="textarea" name="comment" placeholder="Comment" />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit">Submit</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Form>
        </Modal>
        {this.state.note ? this.renderNote(this.state.note as INote) : <Spinner animation="border" variant="primary" />}
      </Page>
    )
  }

}

export default withRouterProps(Note);