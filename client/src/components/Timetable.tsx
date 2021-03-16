import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Timetable.css';

import React from 'react';
import moment from 'moment';
import AddEventModal from './AddEventModal';
import EditEventModal from './EditEventModal';
import RequestHandler from '../api/RequestHandler';
import ICalendarEvent from '../interfaces/calendarEvent.interface';
import { dateStringsToDate } from '../api/util';
import { Calendar, momentLocalizer } from 'react-big-calendar';

const localizer = momentLocalizer(moment);

interface TimetableProps { }

interface TimetableState {
  events: ICalendarEvent[];
  showNewEventModal: boolean;
  showEditEventModal: boolean;
  selectedEvent: ICalendarEvent;
  selectedDate: string | undefined;
  selectedStart: string | undefined;
  selectedEnd: string | undefined;
}

export default class Timetable extends React.Component<TimetableProps, TimetableState> {

  state: TimetableState = {
    events: [],
    showNewEventModal: false,
    showEditEventModal: false,
    selectedDate: undefined,
    selectedStart: undefined,
    selectedEnd: undefined,
    selectedEvent: { id: "", date: "", start: "", end: "", title: "", description: "" }
  }

  async getEvents() {
    const response = await RequestHandler.get("/events/all");
    const events = response as ICalendarEvent[];
    if (events != null) {
      const calendarEvents = events.map((event: ICalendarEvent) => {
        const end = dateStringsToDate(event.date, event.end);
        const start = dateStringsToDate(event.date, event.start);
        event.end = end.toISOString()
        event.start = start.toISOString()
        return event;
      })
      this.setState({ events: calendarEvents });
    }
  }

  handleSelectSlot(event: any) {
    if (event.action === "doubleClick") {
      this.setState({
        showNewEventModal: true,
        selectedDate: new Date(event.start).toISOString().split("T")[0],
        selectedStart: new Date(event.start).toISOString().split("T")[1].substring(0, 5),
        selectedEnd: new Date(event.end).toISOString().split("T")[1].substring(0, 5),
      });
    }
  }

  handleSelectEvent(event: ICalendarEvent) {
    this.setState({ showEditEventModal: true, selectedEvent: event });
  }

  componentDidMount() {
    this.getEvents();
  }

  render() {
    return (
      <>
        <AddEventModal
          show={this.state.showNewEventModal}
          defaultDate={this.state.selectedDate}
          defaultStart={this.state.selectedStart}
          defaultEnd={this.state.selectedEnd}
          handleShow={() => this.setState({ showNewEventModal: true })}
          handleHide={() => this.setState({ showNewEventModal: false })}
          handleEventAdded={this.getEvents.bind(this)}
        />

        <EditEventModal 
          {...this.state.selectedEvent}
          show={this.state.showEditEventModal}
          handleShow={() => this.setState({ showEditEventModal: true })}
          handleHide={() => this.setState({ showEditEventModal: false })}
          handleEditEvent={this.getEvents.bind(this)}
        />

        <Calendar
          selectable
          step={30}
          localizer={localizer}
          events={this.state.events}
          defaultDate={new Date()}
          onSelectSlot={this.handleSelectSlot.bind(this)}
          onSelectEvent={this.handleSelectEvent.bind(this)}
          views={["month", "work_week", "day", "agenda"]}
        />
      </>
    )
  }

}