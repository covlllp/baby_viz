export interface StoreShape {
  events: Event[];
  vizType: VizType;
}

export enum VizType {
  Canvas = 'Canvas',
  Svg = 'Svg',
}

export interface Event {
  start: Date;
  end: Date;
  activity: Activity;
}

export enum Activity {
  Sleep = 'Sleep',
  Bottle = 'Bottle',
  Nursing = 'Nursing',
}

export interface Action {
  type: string;
  payload: any;
}
