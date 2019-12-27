import * as React from 'react';

import * as styles from './styles.css';

interface CanvasProps {
  drawCanvas?(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ): void;
}

export class Canvas extends React.PureComponent<CanvasProps, {}> {
  private canvas: React.RefObject<HTMLCanvasElement>;

  constructor(props: CanvasProps) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  private drawCanvas() {
    const { drawCanvas } = this.props;
    if (!drawCanvas) return;
    const canvas = this.canvas.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;
    drawCanvas(canvas, context);
  }

  render() {
    return (
      <canvas
        className={styles.canvas}
        ref={this.canvas}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    );
  }
}
