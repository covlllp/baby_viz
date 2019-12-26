// interface PaintOptions {
//   canvas: HTMLCanvasElement;
//   context: CanvasRenderingContext2D;
// }

interface Dimensions {
  width: number;
  height: number;
}

interface PainterOptions {
  columns: number;
  rows: number;
}

export class Painter {
  width: number;
  height: number;
  numRows: number;
  numColumns: number;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(options: PainterOptions) {
    this.numRows = options.rows;
    this.numColumns = options.columns;
  }

  get blockWidth(): number {
    return this.width / this.numColumns;
  }

  get blockHeight(): number {
    return this.height / this.numRows;
  }

  setDimensions({ width, height }: Dimensions) {
    this.width = width;
    this.height = height;
  }

  // paintBoard({ board, canvas, context }: PaintOptions): void {
  //   this.canvas = canvas;
  //   this.context = context;
  //
  //   for (let row = 0; row < board.length; row++) {
  //     const boardRow = board[row];
  //     for (let col = 0; col < boardRow.length; col++) {
  //       const block = boardRow[col];
  //       if (!block) continue;
  //
  //       if (!this.board || this.board[row][col].color !== block.color) {
  //         this.paintBlock(row, col, block.color);
  //       }
  //     }
  //   }
  // }
  //
  // private paintBlock(row: number, col: number, color: Color): void {
  //   const { blockWidth, blockHeight } = this;
  //   this.context.fillStyle = colorToFillColor(color);
  //   const xStart = col * blockWidth;
  //   const yStart = (this.numRows - 1 - row) * blockHeight;
  //   this.context.fillRect(xStart, yStart, blockWidth, blockHeight);
  // }
}
