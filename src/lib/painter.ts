import { Event } from 'data/types';

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
    events.forEach(event => {
      this.paintEvent(event);
    });
  }

  private paintEvent(event: Event): void {
    const startAngle = this.getAngleFromTime(event.start);
    const endAngle = this.getAngleFromTime(event.end);
    this.context.beginPath();
    this.context.arc(this.centerX, this.centerY, 100, startAngle, endAngle);
    this.context.stroke();
  }

  private getMidnight(time: Date): Date {
    const midnight = new Date(time.getTime());
    midnight.setUTCHours(0, 0, 0, 0);
    return midnight;
  }

  private getAngleFromTime(time: Date): number {
    const midnight = this.getMidnight(time);
    const timeDiff = this.getTimeDifference(time, midnight);
    return this.convertToAngle(timeDiff);
  }

  private getTimeDifference(timeA: Date, timeB: Date): number {
    return Math.abs(timeA.getTime() - timeB.getTime());
  }

  private convertToAngle(ms: number): number {
    return (ms / (24 * 60 * 60 * 1000)) * 2 * Math.PI;
  }
}
