import React from 'react';
import Page from '../page';
import Card from 'react-bootstrap/esm/Card';
import ReactHtmlParser from 'react-html-parser';
import UserPreview from '../../components/UserPreview';

import { useParams } from 'react-router-dom';
import { fakeNotes } from '../../data/notes';
import { INote } from '../../api/Interfaces';
import AuthService from '../../api/AuthService';

interface NoteProps {
  slug: string;
}

interface NoteState {
  note: INote;
  editable: boolean;
}

class Note extends React.Component<NoteProps, NoteState> {

  public state: NoteState;

  constructor(props: NoteProps) {
    super(props);

    this.state = {
      note: fakeNotes[0],
      editable: false,
    };
  }


  public componentDidMount() {
    if (AuthService.instance.isSelf(this.state.note.author.id)) {
      this.setState({ editable: true });
    }
  }

  public render() {
    return (
      <>
        <Page id="notes">
          <Card>
            <Card.Title>{this.state.note.title}</Card.Title>
            <Card.Body>
              <Card.Text>
                {this.state.note.description}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card id="article">
            <Card.Body>
              {ReactHtmlParser(this.state.note.sanitisedHTML)}
            </Card.Body>
          </Card>
          <UserPreview {...this.state.note.author} />
        </Page>
      </>
    )
  }

}

const NoteView = (): JSX.Element => {
  let { slug }: any = useParams();
  return <Note slug={slug} />
}

export default NoteView;