import React from 'react';
import NotesView from './views/notes/notes';
import SignUpView from './views/signup';
import SignInView from './views/signin';
import ModulesView from './views/modules';
import ScheduleView from './views/schedule';
import DashboardView from './views/dashboard';
import TimetableView from './views/timetable';
import PrivateRoute from './components/PrivateRoute';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NoteView from './views/notes/note';
import ModuleView from './views/module';
import NewNoteView from './views/notes/new';

export default class App extends React.Component {

  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={SignInView} exact />
          <Route path="/signup" component={SignUpView} exact />
          <Route path="/signin" component={SignInView} exact />
          <PrivateRoute path="/dashboard" component={DashboardView} />
          <PrivateRoute path="/notes/new" component={NewNoteView} />
          <PrivateRoute path="/notes/:slug" component={NoteView} />
          <PrivateRoute path="/notes" component={NotesView} />
          <PrivateRoute path="/modules/:slug" component={ModuleView} />
          <PrivateRoute path="/modules" component={ModulesView} />
          <PrivateRoute path="/schedule" component={ScheduleView} />
          <PrivateRoute path="/timetable" component={TimetableView} />
        </Switch>
      </BrowserRouter>
    )
  }

}