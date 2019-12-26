import * as React from 'react';

import { Canvas } from 'component/canvas';
import { Event } from 'data/types';
import { Painter } from 'lib/painter';

import * as styles from './styles.css';

interface ViewProps {
  days: { [key: string]: Event[] };
}

export class View extends React.Component<ViewProps, {}> {
  painter: Painter;

  constructor(props: ViewProps) {
    super(props);
    // this.painter = new Painter();
    this.drawCanvas = this.drawCanvas.bind(this);
  }

  private drawCanvas(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ): void {
    // this.painter.setDimensions(canvas);
    //
    // this.painter.paintBoard({
    //   canvas,
    //   context,
    //   board: this.props.board,
    // });
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
