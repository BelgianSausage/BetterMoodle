export default interface ICalendarEvent {
  id: string;
  title?: string;
  summary?: string;
  description?: string;
  date: string;
  end: Date;
  start: Date; 
}