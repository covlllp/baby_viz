import * as React from 'react';

import { Canvas } from 'component/canvas';
import { Event } from 'data/types';
import { Painter } from 'lib/painter';

import * as styles from './styles.css';

interface ViewProps {
  birthDate: Date;
  sleepEvents: Event[];
}

export class View extends React.Component<ViewProps, {}> {
  painter: Painter;
  canvas: HTMLCanvasElement;
  canvasContext: CanvasRenderingContext2D;

  constructor(props: ViewProps) {
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
      events: this.props.sleepEvents,
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.board}>
          <Canvas drawCanvas={this.drawCanvas} />
        </div>
      </div>
    );
  }
}
