import { LINE_SPACING } from 'data/constants';

export function getAngleFromTime(time: Date) {
  const midnight = getMidnight(time);
  const diff = getTimeDifference(time, midnight);
  return convertToAngle(diff);
}

function getTimeDifference(timeA: Date, timeB: Date): number {
  return Math.abs(timeA.getTime() - timeB.getTime());
}

function convertToAngle(ms: number): number {
  return (ms / (24 * 60 * 60 * 1000)) * 2 * Math.PI;
}

export function daysDifference(timeA: Date, timeB: Date) {
  const diff = getTimeDifference(timeA, timeB);
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
function getMidnight(time: Date): Date {
  const midnight = new Date(time.getTime());
  midnight.setUTCHours(0, 0, 0, 0);
  return midnight;
}

export function getDateSinceDay(date: Date, days: number): Date {
  return new Date(date.getTime() + days * 1000 * 60 * 60 * 24);
}

export function radiusFromDates(dateA: Date, dateB: Date) {
  return daysDifference(dateA, dateB) * LINE_SPACING;
}
