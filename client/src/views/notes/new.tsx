import './new.css';

import React from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

interface NewNoteViewProps { }

interface NewNoteViewState { }

export default class NewNoteView extends React.Component<NewNoteViewProps, NewNoteViewState> {

  public state: NewNoteViewState;

  constructor(props: NewNoteViewProps) {
    super(props);

    this.state = {};
  }

  private onChange() {
    
  }

  private onSubmit(event: React.FormEvent) {

  }

  public render() {
    return (
      <div className="app" id="new-note">
        <form onSubmit={this.onSubmit.bind(this)}>
          <MarkdownEditor visible={true} onChange={this.onChange.bind(this)} name="editor" />
          <button className="fab" title="Upload note" type="submit">
            <FontAwesomeIcon icon={faUpload} />
          </button>
        </form>
      </div>
    )
  }

}