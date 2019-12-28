import * as React from 'react';

import { Canvas } from 'component/canvas';
import { Event } from 'data/types';
import { Painter } from 'lib/painter';

interface CanvasVizProps {
  birthDate: Date;
  events: Event[];
}

export class CanvasViz extends React.Component<CanvasVizProps, {}> {
  painter: Painter;
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;

  constructor(props: CanvasVizProps) {
    super(props);
    this.painter = new Painter({
      birthDate: props.birthDate,
    });
    this.drawCanvas = this.drawCanvas.bind(this);
  }

  componentDidUpdate() {
    this.drawCanvas(this.canvas, this.canvasContext);
  }

  private drawCanvas(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ): void {
    this.canvasContext = context;
    this.canvas = canvas;
    this.painter.setDimensions(canvas);

    this.painter.paintEvents({
      context: this.canvasContext,
      events: this.props.events,
    });
  }

  render() {
    return <Canvas drawCanvas={this.drawCanvas} />;
  }
}
