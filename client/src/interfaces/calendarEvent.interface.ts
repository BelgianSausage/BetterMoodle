export interface ICalendarEventDate {
  dateTime: string;
}

export default interface ICalendarEvent {
  id: string;
  title?: string;
  summary?: string;
  description?: string;
  date: string;
  end: string;
  start: string; 
}