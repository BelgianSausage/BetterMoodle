function formatDate(date: string): string {
  if (date.length === 0) return "";
  const split: string[] = date.split("T");
  return split[0];
}

export interface CalendarEvent {
  start: string;
  end: string;
  title: string;
}

export default class GoogleCalendarAPI {

  static getEvents(): Promise<any> {
    const CALENDAR_ID = '<YOUR CALENDAR ID>'
    const API_KEY = '<YOUR API KEY>'
    
    return new Promise((resolve, reject) => {
      fetch(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`)
      .then(response => response.json())
      .then(response => {
        resolve(response.items.map((event: any) => {
          return ({
            title: event.summary,
            end: formatDate(event.end.date || event.end.dateTime),
            start: formatDate(event.start.date || event.start.dateTime),
          })
        }));
      })
    });
  }

}