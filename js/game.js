class Game {
  constructor(options) {
    this.canvas = document.createElement("canvas");
    this.rows = options.rows;
    this.columns = options.columns;
    this.lumberjack = options.lumberjack;
    //   this.maxCells = options.maxCells;
    //   this.food = undefined;
    //   this.ctx = options.ctx;
    //   this.snake = options.snake;
    //   this.gameOver = undefined;
  }

  _createBoard() {
    this.canvas.width = this.rows;
    this.canvas.height = this.columns;
    this.canvas.id = "myGameZone";
    this.canvas.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  }
  _drawTree() {
    console.log(this);
    // Draw two lines to separate tree
    // this.context.moveTo(225, 0);
    // this.context.lineTo(225, 700);

    // this.context.moveTo(275, 0);
    // this.context.lineTo(275, 700);
    // this.context.stroke();
    // Rect to make the Tree
    this.canvas.context.fillStyle = "brown";
    this.canvas.context.fillRect(225, 0, 50, 700); // ( x inicial , y inicial, aancho, alto)
  }

  _drawLumberJack() {
    console.log(this);
    this.canvas.context.fillStyle = "yellow";
    if (this.lumberjack.position === "right") {
      this.canvas.context.fillRect(
        290,
        this.canvas.height - this.lumberjack.height,
        this.lumberjack.width,
        this.lumberjack.height
      );
    } else {
      this.canvas.context.fillRect(
        225 - 15 - this.lumberjack.width,
        this.canvas.height - this.lumberjack.height,
        this.lumberjack.width,
        this.lumberjack.height
      );
    }
  }
  //   _drawBoard() {
  //     this.ctx.fillStyle = "brown";
  //     this.ctx.fillRect(
  //       0,
  //       0,
  //       this.rows * this.maxCells,
  //       this.columns * this.maxCells
  //     );
  //   }
}
