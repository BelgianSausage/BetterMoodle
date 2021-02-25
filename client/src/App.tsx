import React from 'react';
import NotFoundErrorView from './views/404';
import NotesView from './views/notes/notes';
import SignUpView from './views/signup';
import SignInView from './views/signin';
import NotificationsView from './views/notifications';
import TimetableView from './views/timetable/timetable';
import PrivateRoute from './components/PrivateRoute';
import NoteView from './views/notes/note';
import NewNoteView from './views/notes/new';
import ModuleView from './views/modules/module';
import ModulesView from './views/modules/modules';
import LessonView from './views/lessons/lesson';
import EditNoteView from './views/notes/edit';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default class App extends React.Component {

  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={SignInView} exact />
          <Route path="/signup" component={SignUpView} exact />
          <Route path="/signin" component={SignInView} exact />
          <PrivateRoute path="/dashboard" component={TimetableView} />
          <PrivateRoute path="/notes/new" component={NewNoteView} />
          <PrivateRoute path="/notes/edit/:slug" component={EditNoteView} />
          <PrivateRoute path="/notes/:slug" component={NoteView} />
          <PrivateRoute path="/notes" component={NotesView} />
          <PrivateRoute path="/modules/:slug" component={ModuleView} />
          <PrivateRoute path="/lessons/:slug" component={LessonView} />
          <PrivateRoute path="/modules" component={ModulesView} />
          <PrivateRoute path="/timetable" component={TimetableView} />
          <PrivateRoute path="/notifications" component={NotificationsView} />
          <Route component={NotFoundErrorView} />
        </Switch>
      </BrowserRouter>
    )
  }

}