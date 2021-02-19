import React from 'react';
import RequestHandler from '../../api/RequestHandler';
import Card from '../../components/Card';
import Navigation from '../../components/Navigation';
import { INote } from '../../api/Interfaces';
import { fakeNotes } from '../../data/notes';

interface NotesProps { }

interface NotesState {
  notes: INote[];
}

export default class NotesView extends React.Component<NotesProps, NotesState> {

  public state: NotesState;

  constructor(props: NotesProps) {
    super(props);

    this.state = {
      notes: fakeNotes,
    }
  }

  public componentDidMount() {
    RequestHandler.get('/notes/all').then((notes: any) => {
      // this.setState({notes: notes as INote[] });
      console.log(notes);  
    })
  }

  public render() {
    return (
      <div className="app">
        <div className="app-page">
          <Navigation currentPage="notes" />
          <div className="app-page__inner">
            <div className="app-panel"></div>
            <div className="app-content">
              <div className="app-content__wrapper">
                {this.state.notes.map((note: INote, n: number) => <Card className="app-card--note" key={n} {...note} /> )}
              </div>
            </div>
            <div className="app-panel"></div>
          </div>
        </div>
      </div>
    )
  }

}