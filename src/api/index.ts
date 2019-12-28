import { eventsUrl, eventRangeUrl } from 'api/constants';
import { Event, Activity } from 'data/types';

interface ServerEvent {
  start: string;
  end: string;
  activity: string;
}

function deserializeEvents(res: ServerEvent[]): Event[] {
  return res.map(event => ({
    start: new Date(event.start),
    end: new Date(event.end),
    activity: (<any>Activity)[event.activity],
  }));
}

export function fetchEvents(date: Date, activity: Activity) {
  return fetch(eventsUrl(date, activity))
    .then(res => res.json())
    .then(res => deserializeEvents(res));
}

export function fetchEventRange(start: Date, end: Date, activity: Activity) {
  return fetch(eventRangeUrl(start, end, activity))
    .then(res => res.json())
    .then(res => deserializeEvents(res));
}
