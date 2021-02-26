import './new.css';

import React from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

interface NewNoteViewProps { 
  history: any;
}

interface NewNoteViewState { }

class NewNote extends React.Component<NewNoteViewProps, NewNoteViewState> {

  public state: NewNoteViewState;

  constructor(props: NewNoteViewProps) {
    super(props);

    this.state = {};
  }

  private goBack() {

  }

  private onChange() {

  }

  private onSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  public render() {
    return (
      <div className="app" id="new-note">
        <form onSubmit={this.onSubmit.bind(this)}>
          <MarkdownEditor visible={true} onChange={this.onChange.bind(this)} name="editor" />
          <div className="fabs">
            <button className="fab theme-1" title="Upload note">
              <FontAwesomeIcon icon={faUpload} />
            </button>
            <button title="Close note" className="fab theme-3" onClick={this.props.history.goBack}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </form>
      </div>
    )
  }

}

const NewNoteView = (): JSX.Element => {
  let history = useHistory();
  return <NewNote history={history} />
}

export default NewNoteView;