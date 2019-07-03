class Game {
  constructor(options) {
    this.canvas = document.createElement("canvas");
    this.rows = options.rows;
    this.columns = options.columns;
    this.lumberjack = options.lumberjack;
    this.controls = document.createElement("div");
    this.buttonLeft = document.createElement("button");
    this.buttonRight = document.createElement("button");
    this.theTree = options.theTree;
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
    this._createControls();
  }
  _createControls() {
    this.buttonLeft.innerHTML = "LEFT";
    this.buttonLeft.onclick = function() {
      this.lumberjack._changeSide();
    }.bind(this);
    this.buttonRight.innerHTML = "RIGHT";
    document.body.insertBefore(this.controls, document.body.childNodes[1]);
    document.getElementsByTagName("div")[0].appendChild(this.buttonLeft);
    document.getElementsByTagName("div")[0].appendChild(this.buttonRight);
    // document.body.insertBefore(this.buttonLeft, document.body.childNodes[1]);
    // document.body.insertBefore(this.buttonRight, document.body.childNodes[2]);
  }
  _drawTree() {
    console.log(this);
    // Rect to make the Tree
    this.canvas.context.fillStyle = "brown";
    this.canvas.context.fillRect(225, 0, 50, 700); // ( x inicial , y inicial, aancho, alto)
  }
  _drawBranchR(Hposition) {
    this.canvas.context.fillStyle = "blue";
    this.canvas.context.fillRect(275, Hposition, 100, 40);
  }
  _drawBranchL(Hposition) {
    this.canvas.context.fillStyle = "red";
    this.canvas.context.fillRect(125, Hposition, 100, 40);
  }
  _drawBranches() {
    let Hposition = this.columns - 40; // 45 es altura de la rama
    // let Lposition = this.columns - 40;
    console.log(
      "TCL: Game -> _drawBranches -> this.theTree  Dibujando las Ramas",
      this.theTree
    );
    for (let i = 0; i < this.theTree.branchRight.length; i++) {
      if (this.theTree.branchRight[i] === "Branch") {
        this._drawBranchR(Hposition);
        console.log(`Derecha ${i} ${Hposition}`);
        // Rposition -= 5; // Separación entre ramas
        // Hposition -= 40;
      } else {
        // Hposition -= 40; // Altura del espacio de la No Rama
      }
      if (this.theTree.branchLeft[i] === "Branch") {
        this._drawBranchL(Hposition);
        console.log(`Izquierda ${i} ${Hposition}`);
        // Lposition -= 5; // Separación entre ramas
        // Hposition -= 40;
      } else {
        // Hposition -= 40; // Altura del espacio de la No Rama
      }
      Hposition -= 30;
    }
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
