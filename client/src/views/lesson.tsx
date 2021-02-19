import React from 'react';

interface LessonProps {}

interface LessonState {}

export default class Lesson extends React.Component<LessonProps, LessonState> {

  public state: LessonState;

  constructor(props: LessonProps) {
    super(props);

    this.state = {}
  }

  public render() {
    return (
      <div className="app">
        <div className="app-page">
          <div className="app-page__inner">
            <div className="app-panel"></div>
            <div className="app-content">
              <div className="app-content__wrapper"></div>
            </div>
            <div className="app-panel"></div>
          </div>
        </div>
      </div>
    )
  }

}