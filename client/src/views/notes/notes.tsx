import React from 'react';
import Panel from '../../components/Panel';
import Navigation from '../../components/Navigation';
import QuickLinks from '../../components/QuickLinks';
import RequestHandler from '../../api/RequestHandler';
import PageFilter from '../../components/PageFilter';

import { INote } from '../../api/Interfaces';
import Card from 'react-bootstrap/esm/Card';
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
      <div className="app">
        <div className="app-page">
          <Navigation currentPage="notes" />
          <div className="app-page__inner">
            <Panel>
              <PageFilter />
              <QuickLinks links={this.state.notes} />
            </Panel>
            <div className="app-content">
              <div className="app-content__wrapper">
                <Card className="app-filterable">
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
                  // Render all the node previews as a series of cards.
                  // TO-DO: 
                  // - order cards by module
                  // - allow filtering of cards by module
                  // - allow different modules to be coloured

                  this.state.notes.map((note: INote, n: number) => {
                    return (
                      <Link className="app-filterable" to={`/notes/${note.slug}`}>
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
              </div>
            </div>
            <Panel />
          </div>
        </div>
      </div>
    )
  }

}