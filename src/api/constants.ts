import { Activity } from 'data/types';

const EVENTS_URL = '/data/events/';

const EVENT_RANGE_URL = 'data/range/events/';

export function eventsUrl(date: Date, activity: Activity) {
  return `${EVENTS_URL}${date.getTime()}/${activity}`;
}

export function eventRangeUrl(start: Date, end: Date, activity: Activity) {
  return `${EVENT_RANGE_URL}${start.getTime()}/${end.getTime()}/${activity}`;
}
