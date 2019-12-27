import { DAY_URL } from 'api/constants';
import { Event, Activity } from 'data/types';

interface ServerEvent {
  start: string;
  end: string;
  activity: string;
}

function deserializeDays(res: ServerEvent[]): Event[] {
  return res.map(event => ({
    start: new Date(event.start),
    end: new Date(event.end),
    activity: (<any>Activity)[event.activity],
  }));
}

export function fetchDays() {
  return fetch(DAY_URL)
    .then(res => res.json())
    .then(res => deserializeDays(res));
}
