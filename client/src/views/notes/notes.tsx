import React from 'react';
import Page from '../page';
import Card from 'react-bootstrap/esm/Card';
import RequestHandler from '../../api/RequestHandler';

import { INote } from '../../api/Interfaces';
import { Link } from 'react-router-dom';

interface NotesProps { }

interface NotesState {
  notes: INote[];
}

export default class NotesView extends React.Component<NotesProps, NotesState> {

  public state: NotesState;

  constructor(props: NotesProps) {
    super(props);

    this.state = {
      notes: [],
    }
  }

  public componentDidMount() {
    RequestHandler.get('/notes/all').then((notes: any) => {
      this.setState({ notes: notes as INote[] });
    })
  }

  public render() {
    return (
      <Page id="notes" content={this.state.notes}>
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
        {
          this.state.notes.map((note: INote, n: number) => {
            return (
              <Link to={note.slug}>
                <Card className="note" key={n}>
                  <Card.Title>{note.title}</Card.Title>
                  <Card.Body>
                    <Card.Text>{note.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div>{note.author.firstName} {note.author.lastName}</div>
                    <div>{note.createdAt.toLocaleDateString()}</div>
                  </Card.Footer>
                </Card>
              </Link>
            )
          })
        }
      </Page>
    )
  }

}