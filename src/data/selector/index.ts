import { StoreShape, Event, VizType } from 'data/types';

export function getEvents(store: StoreShape): Event[] {
  return store.events;
}

export function getVizType(store: StoreShape): VizType {
  return store.vizType;
}
