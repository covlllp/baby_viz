import * as React from 'react';

import { Event } from 'data/types';
import { COLOR_MAP, LINE_THICKNESS } from 'data/constants';
import * as DateUtil from 'lib/date';
import * as MathUtil from 'lib/math';

interface SvgVizProps {
  birthDate: Date;
  events: Event[];
  dimension: number;
}

export class SvgViz extends React.Component<SvgVizProps, {}> {
  get center() {
    return this.props.dimension / 2;
  }

  private getRadius(event: Event) {
    return DateUtil.radiusFromDates(this.props.birthDate, event.start);
  }

  render() {
    const { dimension, events } = this.props;
    return (
      <svg viewBox={`0 0 ${dimension} ${dimension}`}>
        {events.map(event => (
          <EventArc
            key={`${
              event.activity
            }-${event.start.toISOString()}-${event.end.toISOString()}`}
            startAngle={DateUtil.getAngleFromTime(event.start)}
            endAngle={DateUtil.getAngleFromTime(event.end)}
            color={COLOR_MAP[event.activity]}
            radius={this.getRadius(event)}
            center={this.center}
          />
        ))}
      </svg>
    );
  }
}

interface EventArcProps {
  startAngle: number;
  endAngle: number;
  color: string;
  radius: number;
  center: number;
}

const EventArc: React.SFC<EventArcProps> = props => {
  const { startAngle, endAngle, color, radius, center } = props;
  const angleDiff = endAngle - startAngle;
  const endCoords = MathUtil.getCoordsFromAngle(angleDiff, radius);
  const pathString = `M 0 -${radius}
                      A ${radius} ${radius} 0 0 1 ${endCoords.x} ${endCoords.y}
                      `;
  const transformString = `translate(${center} ${center})
                           rotate(${(startAngle * 180) / Math.PI})
                           `;
  return (
    <path
      d={pathString}
      stroke={color}
      strokeWidth={LINE_THICKNESS}
      fill="none"
      transform={transformString}
    />
  );
};
