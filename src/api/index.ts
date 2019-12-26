import { DAY_URL } from 'api/constants';
import { Event, Activity } from 'data/types';

interface ServerEvent {
  start: string;
  end: string;
  activity: string;
  duration: number;
  quantity: number;
}

function deserializeDays(res: ServerEvent[]): { [key: string]: Event[] } {
  const date = new Date('2019-11-01').toISOString();
  console.log(res);
  const result: { [key: string]: Event[] } = {};
  result[date] = res.map(event => ({
    start: new Date(event.start),
    end: new Date(event.end),
    activity: event.activity as Activity,
    duration: event.duration,
  }));
  return result;
}

export function fetchDays() {
  return fetch(DAY_URL)
    .then(res => res.json())
    .then(res => deserializeDays(res));
}
