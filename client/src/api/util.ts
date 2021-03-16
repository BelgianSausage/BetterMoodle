/**
 * Take a date, stored as a string, and a time, stored as string, and
 * return the date object associated with their combination.
 * 
 * @param date 
 * @param time 
 * @returns 
 */
export function dateStringsToDate(dateString: string, timeString: string): Date {
  const date = new Date(dateString);
  const [sHours, sMins] = timeString.split(':');
  date.setHours(date.getHours() + Number.parseInt(sHours));
  date.setMinutes(date.getMinutes() + Number.parseInt(sMins));

  return date;
}