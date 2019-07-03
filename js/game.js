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
    this.Hposition = this.columns - 70;
    this.gameOver = false;
    this.score = { points: 0, text: "Points:" };
    // this.interval = setInterval(updateGameArea, 20);

    //   this.maxCells = options.maxCells;
    //   this.food = undefined;
    //   this.ctx = options.ctx;
    //   this.snake = options.snake;
    //   this.gameOver = undefined;
  }
  _clear() {
    // this.canvas.context = this.canvas.getContext("2d");
    this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _update() {}

  _createBoard() {
    this.canvas.width = this.rows;
    this.canvas.height = this.columns;
    this.canvas.id = "myGameZone";
    this.canvas.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this._createControls();
    game._drawScore();
  }
  _attack(event) {
    // event.target;
    // console.log("TCL: Game -> _attack -> event.target", event.target);
    // console.log("TCL: Game -> _attack -> this.buttonLeft", this.buttonLeft);
    // console.log("TCL: Game -> _attack -> this.buttonRight", this.buttonRight);
    if (
      this.lumberjack.position === "right" &&
      event.target.innerText === "LEFT"
    ) {
      //   console.log("De derecha a izquierda");
      this.lumberjack._changeSide();
    } else if (
      this.lumberjack.position === "left" &&
      event.target.innerText === "RIGHT"
    ) {
      //   console.log("De izquierda a derecha");
      this.lumberjack._changeSide();
    }
    // this.lumberjack.position;
    // console.log(
    //   "TCL: Game -> _attack -> this.lumberjack.position",
    //   this.lumberjack.position
    // );
    // console.log(
    //   "TCL: Game -> _attack -> this.buttonLeft.value",
    //   this.buttonLeft.value
    // );
    // console.log(
    //   "TCL: Game -> _attack -> this.lumberjack.position",
    //   this.lumberjack.position
    // );

    this._attackTree();
    game._clear();
    game._drawTree();
    game._drawLumberJack();
    game._drawBranches();
    if (this._BranchHitHead() === true) {
      window.alert("Golpe en la cabeza");
    } else {
      this.score.points++;
    }
    console.log("TCL: Game -> _attack -> this.score.points", this.score.points);
    game._drawScore();
  }

  _createControls() {
    this.buttonLeft.innerHTML = "LEFT";
    this.buttonLeft.onclick = this._attack.bind(this);
    // this.buttonLeft.onclick = function() {
    //   this.lumberjack._changeSide();
    // }.bind(this);

    this.buttonRight.innerHTML = "RIGHT";
    this.buttonRight.onclick = this._attack.bind(this);
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
    let Hposition = this.columns - 70; // 40 es altura de la rama
    // let Lposition = this.columns - 40;
    console.log(
      "TCL: Game -> _drawBranches -> this.theTree  Dibujando las Ramas",
      this.theTree
    );

    for (let i = 0; i < this.theTree.branchRight.length; i++) {
      if (this.theTree.branchRight[i] === "Branch") {
        this._drawBranchR(Hposition);
        console.log(`Derecha ${i} ${Hposition}`);

        if (this.lumberjack.position === "right") {
          if (Hposition + 40 >= this.columns - this.lumberjack.height) {
            this.gameOver = true;
            console.log(
              "TCL: Game -> _drawBranches -> Hposition + 40",
              Hposition + 40
            );
            console.log(
              "TCL: Game -> _drawBranches -> this.columns - this.lumberjack.height",
              this.columns - this.lumberjack.height
            );
            console.log(
              "TCL: Game -> _drawBranches -> this.lumberjack.position",
              this.lumberjack.position
            );
            console.log(
              "TCL: Game -> _drawBranches -> this.gameOver",
              this.gameOver
            );
          }
        }
        // Rposition -= 5; // Separación entre ramas
        // Hposition -= 40;
      } else {
        // Hposition -= 40; // Altura del espacio de la No Rama
      }
      if (this.theTree.branchLeft[i] === "Branch") {
        this._drawBranchL(Hposition);
        console.log(`Izquierda ${i} ${Hposition}`);

        if (this.lumberjack.position === "left") {
          if (Hposition + 40 >= this.columns - this.lumberjack.height) {
            this.gameOver = true;
          }
        }
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
  _attackTree() {
    let random = 0;
    this.theTree.branchRight.shift();
    this.theTree.branchLeft.shift();
    random = Math.floor(Math.random() * (2 - 0)) + 0;
    if (random === 1) {
      this.theTree.branchRight.push("Branch");
      this.theTree.branchRight.push("NoBranch");
      this.theTree.branchLeft.push("NoBranch");
      this.theTree.branchLeft.push("NoBranch");
    } else {
      this.theTree.branchRight.push("NoBranch");
      this.theTree.branchRight.push("NoBranch");
      this.theTree.branchLeft.push("Branch");
      this.theTree.branchLeft.push("NoBranch");
    }
  }
  _BranchHitHead() {
    console.log("TCL: Game -> _BranchHitHead -> this.gameOver", this.gameOver);
    return this.gameOver;
  }
  _drawScore() {
    this.canvas.context.fillStyle = "black";
    this.canvas.context.font = "15px Arial";
    this.canvas.context.fillText(this.score.text + this.score.points, 15, 15);
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
