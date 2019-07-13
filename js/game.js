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
    this.Hposition = this.columns - 70; // 70
    this.gameOverStatus = false;
    this.score = { points: 0, text: "Points:", level: 1, counter: 0 };
    this.controlPanel = options.controlpanel;
    this.starting = options.starting;
    this.gameInterval = undefined;
    this.counterFrames = 0;
    this.counterAttack = 0;
    this.Tposition = 0;
    this.counterMoving = 0;
    this.sound = options.sound;

    this.objectToFly = new ObjectCut();
  }

  _clear() {
    this.canvas.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _clearPage() {
    let element = document.getElementsByTagName("div")[0];
    document.getElementsByTagName("div")[0].parentNode.removeChild(element);
  }

  start() {
    game._clearPage();
    game._createBoard();
    game._drawTree(this.Tposition);
    game._drawLumberJack();
    game._drawBranches();
    game._assignControlsToKeys();

    game.sound.play();

    game._updateGameArea();
  }

  _stop() {
    window.cancelAnimationFrame(this.gameInterval);
  }

  reStart() {
    game.starting()();
    let element = document.getElementsByTagName("canvas")[0];
    document.getElementsByTagName("canvas")[0].parentNode.removeChild(element);
    game.start();
  }

  _createBoard() {
    this.canvas.width = this.rows;
    this.canvas.height = this.columns;
    this.canvas.id = "myGameZone";
    this.canvas.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this._createControls();
    game._drawScore();
    this.objectToFly.createObject(game);
  }

  _attack(event) {
    if (
      (this.lumberjack.position === "right" &&
        event.target.innerText === "LEFT") ||
      (this.lumberjack.position === "right" && event.keyCode === 37)
    ) {
      //   console.log("De derecha a izquierda");
      this.lumberjack._changeSide();
    } else if (
      (this.lumberjack.position === "left" &&
        event.target.innerText === "RIGHT") ||
      (this.lumberjack.position === "left" && event.keyCode === 39)
    ) {
      //   console.log("De izquierda a derecha");
      this.lumberjack._changeSide();
    }

    this.lumberjack.attacking = true;
    this.objectToFly = new ObjectCut();
    this.objectToFly.createObject(game);
    this.objectToFly.startFly(game);

    this.counterMoving = 0;

    this._attackTree();
    this.Tposition += 50;
    if (this.Tposition === 700) {
      this.Tposition = 0;
    }
  }

  _drawLife() {
    this.canvas.context.fillStyle = "white";
    this.canvas.context.fillRect(15, 30, this.lumberjack.life / 3, 5); // ( x inicial , y inicial, aancho, alto)
  }

  _updateGameArea() {
    this.gameInterval = window.requestAnimationFrame(
      this._updateGameArea.bind(this)
    );
    this.counterFrames++;
    this.counterAttack++;
    this.counterMoving++;

    game._clear();
    game._drawTree();
    game.theTree.drawStones(this.canvas.context);
    game._drawLumberJack();
    game._drawBranches();

    // console.log(
    //   "TCL: Game -> _updateGameArea -> game.theTree.objectsToFly[0].moving",
    //   game.theTree.objectsToFly[0].moving
    // );
    game.theTree.drawFlyObjects(this.canvas.context, this.lumberjack);
    // game.theTree.objectsToFly.forEach(
    //   function(elementToFly) {
    //     if (elementToFly.moving === true) {
    //       if (elementToFly.counterMoving <= 60) {
    //         elementToFly.moveStroke(this.canvas.context);
    //         elementToFly.updateCoordinates();
    //         elementToFly.counterMoving++;
    //       }
    //       if (elementToFly.counterMoving >= 60) {
    //         elementToFly.moving = false;
    //         elementToFly.resetCoordinates();
    //       }
    //     }
    //   }.bind(this)
    // );
    // if (game.theTree.objectsToFly[0].moving === true) {
    //   console.log(
    //     "TCL: Game -> _updateGameArea -> this.counterMoving",
    //     this.counterMoving
    //   );
    //   if (game.theTree.objectsToFly[0].counterMoving <= 60) {
    //     // game.theTree.moveStroke(this.canvas.context, this.x, this.y);
    //     game.theTree.objectsToFly[0].moveStroke(this.canvas.context);
    //     // Funcion para mover el elemento
    //     // this.x += 3.75;
    //     // console.log("TCL: Game -> _updateGameArea -> this.x", this.x);
    //     // this.y = Math.sin((1 / 75) * this.x) * 80;
    //     // console.log("TCL: Game -> _updateGameArea -> this.y", this.y);
    //     game.theTree.objectsToFly[0].updateCoordinates();
    //   }
    //   if (game.theTree.objectsToFly[0].counterMoving >= 60) {
    //     game.theTree.objectsToFly[0].moving = false;

    //     game.theTree.objectsToFly[0].resetCoordinates();
    //     // this.x = 0;
    //     // console.log("TCL: Game -> _updateGameArea -> this.x ", this.x);
    //     // this.y = 0;
    //   }
    // }

    game._gameOver();
    game._drawScore();
    game._drawLife();
    if (this.counterFrames < 60) {
      game._drawLevel();
    }
    if (this.counterAttack === 10) {
      this.lumberjack.attacking = false;
      this.counterAttack = 0;
    }
  }

  _gameOver() {
    if (this._BranchHitHead() === true || this.lumberjack.life <= 0) {
      // window.alert("Golpe en la cabeza");
      this.gameOverStatus = true;
      this._stop();
      game._clearPage();
      game._createBoard();
      game._drawTree();
      game.theTree.drawStones(this.canvas.context);
      game._drawBranches();
      game._drawLumberJack();
      this.controlPanel.gameOverPanel(this.score);
    } else {
      this.lumberjack.life = this.lumberjack.life - (1 + this.score.level / 20);
    }
  }

  _assignControlsToKeys() {
    document.onkeydown = e => {
      switch (e.keyCode) {
        case 32: // spacebar
          if (game.gameOverStatus) {
            game.reStart();
            break;
          } else {
            break;
          }
        case 37: // arror left
          if (!game.gameOverStatus) {
            this._attack(e);
            break;
          }
        case 39: // arrow right
          if (!game.gameOverStatus) {
            this._attack(e);
            break;
          }
        case 80: // p pause
          // this.snake.intervalId ? this.snake.stop() : this.snake.move();
          break;
      }
    };
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

  _drawTree(Tposition) {
    // console.log(this);
    // Rect to make the Tree
    // this.canvas.context.fillStyle = "brown";
    // this.canvas.context.fillRect(225, 0, 50, 700); // ( x inicial , y inicial, aancho, alto)
    this.canvas.context.drawImage(
      this.theTree.TrunkBig,
      225,
      0 + this.Tposition
    );
    this.canvas.context.drawImage(
      this.theTree.TrunkBig,
      225,
      -700 + this.Tposition
    );
  }

  _drawBranchR(Hposition) {
    // this.canvas.context.fillStyle = "blue";
    // this.canvas.context.fillRect(275, Hposition, 100, 40);
    this.canvas.context.drawImage(this.theTree.BranchD, 275, Hposition);
  }

  _drawBranchL(Hposition) {
    // this.canvas.context.fillStyle = "red";
    // this.canvas.context.fillRect(125, Hposition, 100, 40);
    this.canvas.context.drawImage(this.theTree.BranchI, 17, Hposition); // 225 - 208 ancho imagen
  }

  _drawBranches() {
    let Hposition = this.columns - 140; // Este valor ajusta la altura donde empezar a dibujar las ramas Valor correcto 70 para altura de 80 si altura 160, valor 150<- 40 es altura de la rama
    // let Lposition = this.columns - 40;
    // console.log(
    //   "TCL: Game -> _drawBranches -> this.theTree  Dibujando las Ramas",
    //   this.theTree
    // );

    for (let i = 0; i < this.theTree.branchRight.length; i++) {
      if (this.theTree.branchRight[i] === "Branch") {
        this._drawBranchR(Hposition);
        // console.log(`Derecha ${i} ${Hposition}`);

        if (this.lumberjack.position === "right") {
          if (Hposition + 40 >= this.columns - this.lumberjack.height) {
            this.gameOverStatus = true;
            // console.log(
            //   "TCL: Game -> _drawBranches -> Hposition + 40",
            //   Hposition + 40
            // );
            // console.log(
            //   "TCL: Game -> _drawBranches -> this.columns - this.lumberjack.height",
            //   this.columns - this.lumberjack.height
            // );
            // console.log(
            //   "TCL: Game -> _drawBranches -> this.lumberjack.position",
            //   this.lumberjack.position
            // );
            // console.log(
            //   "TCL: Game -> _drawBranches -> this.gameOverStatus",
            //   this.gameOverStatus
            // );
          }
        }
        // Rposition -= 5; // Separación entre ramas
        // Hposition -= 40;
      } else {
        // Hposition -= 40; // Altura del espacio de la No Rama
      }
      if (this.theTree.branchLeft[i] === "Branch") {
        this._drawBranchL(Hposition);
        // console.log(`Izquierda ${i} ${Hposition}`);

        if (this.lumberjack.position === "left") {
          if (Hposition + 40 >= this.columns - this.lumberjack.height) {
            this.gameOverStatus = true;
          }
        }
        // Lposition -= 5; // Separación entre ramas
        // Hposition -= 40;
      } else {
        // Hposition -= 40; // Altura del espacio de la No Rama
      }
      Hposition -= 50; //30
    }
  }

  _drawLumberJack() {
    // console.log(this);
    // this.canvas.context.fillStyle = "yellow";

    if (this.lumberjack.position === "right") {
      // this.canvas.context.fillRect(
      //   290,
      //   this.canvas.height - this.lumberjack.height,
      //   this.lumberjack.width,
      //   this.lumberjack.height
      // );
      // DRAW LUMBERJACK
      if (this.lumberjack.attacking === false) {
        if (game.gameOverStatus === true) {
          this.canvas.context.drawImage(
            this.lumberjack.LumberJackImageDGOver,
            290,
            this.canvas.height - this.lumberjack.height
          );
        } else {
          this.canvas.context.drawImage(
            this.lumberjack.LumberJackImageD,
            290,
            this.canvas.height - this.lumberjack.height
          );
        }
      } else {
        if (game.gameOverStatus === true) {
          this.canvas.context.drawImage(
            this.lumberjack.LumberJackImageDGOver,
            290,
            this.canvas.height - this.lumberjack.height
          );
        } else {
          //DRAW ATTACK
          this.canvas.context.drawImage(
            this.lumberjack.LumberJackImageDA,
            230,
            this.canvas.height - this.lumberjack.height
          );
        }
      }
    } else {
      // this.canvas.context.fillRect(
      //   225 - 15 - this.lumberjack.width,
      //   this.canvas.height - this.lumberjack.height,
      //   this.lumberjack.width,
      //   this.lumberjack.height
      // );
      if (this.lumberjack.attacking === false) {
        if (game.gameOverStatus === true) {
          this.canvas.context.drawImage(
            this.lumberjack.LumberJackImageIGOver,
            225 - 15 - this.lumberjack.width,
            this.canvas.height - this.lumberjack.height
          );
        } else {
          // DRAW LUMBERJACK
          this.canvas.context.drawImage(
            this.lumberjack.LumberJackImageI,
            225 - 15 - this.lumberjack.width,
            this.canvas.height - this.lumberjack.height
          );
        }
      } else {
        if (game.gameOverStatus === true) {
          this.canvas.context.drawImage(
            this.lumberjack.LumberJackImageIGOver,
            225 - 15 - this.lumberjack.width,
            this.canvas.height - this.lumberjack.height
          );
        } else {
          //DRAW ATTACK
          this.canvas.context.drawImage(
            this.lumberjack.LumberJackImageIA,
            110,
            this.canvas.height - this.lumberjack.height
          );
        }
      }
    }
  }

  _attackTree() {
    let random = 0;
    this.theTree.branchRight.shift();
    console.log(
      "TCL: Game -> _attackTree -> this.theTree.branchRight",
      this.theTree.branchRight
    );
    this.theTree.branchLeft.shift();
    console.log(
      "TCL: Game -> _attackTree -> this.theTree.branchLeft",
      this.theTree.branchLeft
    );

    if (this.lumberjack.position === "right") {
      this.theTree.branchLeft[0] = "NoBranch";
    } else {
      this.theTree.branchRight[0] = "NoBranch";
    }

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
    if (!this.gameOverStatus) {
      this.score.points++;
      this.score.counter++;
      if (this.score.counter === 15) {
        this.score.level++;
        this.counterFrames = 0;
        // game._drawLevel();
        this.score.counter = 0;
      }
      if (this.lumberjack.life < this.lumberjack.maxLife) {
        this.lumberjack.life += 15;
      }
    }
  }

  _BranchHitHead() {
    // console.log(
    //   "TCL: Game -> _BranchHitHead -> this.gameOverStatus",
    //   this.gameOverStatus
    // );
    return this.gameOverStatus;
  }

  _drawScore() {
    this.canvas.context.fillStyle = "black";
    this.canvas.context.font = "15px Arial";
    this.canvas.context.fillText(this.score.text + this.score.points, 15, 15);
  }

  _drawLevel() {
    // let procesoID;
    // procesoID = setInterval(this._drawLevel, 10);
    console.log("he llamado DRAW LEVEL");
    this.canvas.context.fillStyle = "black";
    this.canvas.context.font = "15px Arial";
    this.canvas.context.fillText("LEVEL:  " + this.score.level, 15, 75);
    console.log("Deberia haber DRAW LEVEL");
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
