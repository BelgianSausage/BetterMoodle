import React from 'react';
import Navigation from '../components/Navigation';

interface NotificationsViewProps {}

interface NotificationsViewState {}

export default class NotificationsView extends React.Component<NotificationsViewProps, NotificationsViewState> {

  public state: NotificationsViewState;

  constructor(props: NotificationsViewProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div className="app">
        <div className="app-page">
          <Navigation />
        </div>
      </div>
    )
  }

}