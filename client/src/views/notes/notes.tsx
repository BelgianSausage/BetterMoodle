import React from 'react';
import Page from '../page';
import Card from 'react-bootstrap/esm/Card';
import RequestHandler from '../../api/RequestHandler';
import INote from '../../interfaces/note.interface';
import { NoteCard } from '../../components/Cards';
import { Spinner } from 'react-bootstrap';

interface NotesProps { }

interface NotesState {
  notes: INote[];
}

export default class NotesView extends React.Component<NotesProps, NotesState> {

  state: NotesState = {
    notes: [],
  }

  async getNotes() {
    const notes: any = await RequestHandler.get('/notes/all');
    if (notes != null) {
      this.setState({ notes: notes as INote[] });
    }
  }

  componentDidMount() {
    this.getNotes();
  }

  render() {
    return (
      <Page id="notes" context="notes" content={this.state.notes}>
        <Card>
          <Card.Title>Notes</Card.Title>
          <Card.Body>
            <Card.Text>
              Below you'll find all the notes relevant to your current course's modules.
              Notes which have been published most recently, and have been recommended by
              the most users will appear at the top of the list.
            </Card.Text>
          </Card.Body>
        </Card>
        {this.state.notes ? this.state.notes.map((note: INote, n: number) => <NoteCard {...note} key={n} />) : <Spinner animation="border" variant="primary" />}
      </Page>
    )
  }

}