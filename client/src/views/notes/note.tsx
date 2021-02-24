import './note.css';

import Card from '../../components/Card';
import ReactHtmlParser from 'react-html-parser';
import Navigation from '../../components/Navigation';
import UserPreview from '../../components/UserPreview';

import { useParams } from 'react-router-dom';
import { fakeNotes } from '../../data/notes';
import { INote } from '../../api/Interfaces';

const NoteView = (): JSX.Element => {

  let { slug }: any = useParams();

  const noteContent: INote = fakeNotes.find(n => n.slug === slug) || fakeNotes[0];

  return (
    <div className="app">
      <div className="app-page">
        <Navigation currentPage="notes" />
        <div className="app-page__inner">
          <div className="app-panel"></div>
          <div className="app-content">
            <div className="app-content__wrapper">
              <Card className="app-card--note-view" {...noteContent} />
              <div className="app-note-view">
                <div className="app-note__content">
                  {ReactHtmlParser(noteContent.sanitisedHTML)}
                </div>
              </div>
              <UserPreview {...noteContent.author} />
            </div>
          </div>
          <div className="app-panel"></div>
        </div>
      </div>
    </div>
  )

}

export default NoteView;