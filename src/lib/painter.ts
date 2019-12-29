import { Event } from 'data/types';
import { DEFAULT_COLOR, COLOR_MAP, BACKGROUND_COLOR } from 'data/constants';
import * as DateUtil from 'lib/date';

interface PaintOptions {
  events: Event[];
  context: CanvasRenderingContext2D;
}

interface Dimensions {
  width: number;
  height: number;
}

interface PainterOptions {
  birthDate: Date;
}

export class Painter {
  birthDate: Date;
  width: number;
  height: number;
  numDays: number;

  context: CanvasRenderingContext2D;

  constructor(options: PainterOptions) {
    this.birthDate = options.birthDate;
  }

  get centerX() {
    return this.width / 2;
  }

  get centerY() {
    return this.height / 2;
  }

  setDimensions({ width, height }: Dimensions) {
    this.width = width;
    this.height = height;
  }

  setDays(days: number) {
    this.numDays = days;
  }

  paintEvents({ events, context }: PaintOptions): void {
    this.context = context;
    if (BACKGROUND_COLOR) {
      context.fillStyle = BACKGROUND_COLOR;
      context.fillRect(0, 0, this.width, this.height);
    } else {
      context.clearRect(0, 0, this.width, this.height);
    }
    events.forEach(event => {
      this.paintEvent(event);
    });
  }

  private paintEvent(event: Event): void {
    const startAngle = DateUtil.getAngleFromTime(event.start) - Math.PI / 2;
    const endAngle = DateUtil.getAngleFromTime(event.end) - Math.PI / 2;
    const radius = this.getRadius(event.start);
    this.context.strokeStyle = COLOR_MAP[event.activity] || DEFAULT_COLOR;
    this.context.beginPath();
    this.context.arc(this.centerX, this.centerY, radius, startAngle, endAngle);
    this.context.stroke();
  }

  private getRadius(date: Date) {
    return DateUtil.radiusFromDates(this.birthDate, date);
  }
}
