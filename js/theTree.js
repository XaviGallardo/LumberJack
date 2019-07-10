class TheTree {
  constructor(lumberjack) {
    this.branchRight = [];
    this.branchLeft = [];
    this.lumberjack = lumberjack;
    this._createTree(lumberjack);

    this.movingBlock = false;

    this.BranchD = new Image();
    this.BranchD.src = "/public/RamaD.png";
    this.BranchI = new Image();
    this.BranchI.src = "/public/RamaI.png";
    this.TrunkBig = new Image();
    this.TrunkBig.src = "/public/Arbol.png";
    this.Stones = new Image();
    this.Stones.src = "/public/Stones.png";
    this.StrokeBlock = new Image();
    this.StrokeBlock.src = "/public/StrokeBlock.png";
  }
  _createTree(position) {
    console.log(lumberjack);
    let random = 0;
    if (this.lumberjack.position === "right") {
      for (let i = 0; i < 30; i++) {
        if (i <= 3) {
          this.branchRight.push("NoBranch");
          this.branchLeft.push("NoBranch");
        }

        if (random === 1 && i > 3) {
          this.branchRight.push("Branch");
          this.branchRight.push("NoBranch");
          this.branchLeft.push("NoBranch");
          this.branchLeft.push("NoBranch");
        } else if (random === 0 && i > 3) {
          this.branchRight.push("NoBranch");
          this.branchRight.push("NoBranch");
          this.branchLeft.push("Branch");
          this.branchLeft.push("NoBranch");
        }
        {
        }
        random = Math.floor(Math.random() * (2 - 0)) + 0;
      }
    }
    console.log(
      "TCL: TheTree -> constructor -> this.branchRight",
      this.branchRight
    );
    console.log(
      "TCL: TheTree -> constructor -> this.branchLeft",
      this.branchLeft
    );
  }

  // _drawTree(Tposition) {
  //   // console.log(this);
  //   // Rect to make the Tree
  //   // this.canvas.context.fillStyle = "brown";
  //   // this.canvas.context.fillRect(225, 0, 50, 700); // ( x inicial , y inicial, aancho, alto)
  //   this.canvas.context.drawImage(
  //     this.theTree.TrunkBig,
  //     225,
  //     0 + this.Tposition
  //   );
  //   this.canvas.context.drawImage(
  //     this.theTree.TrunkBig,
  //     225,
  //     -700 + this.Tposition
  //   );
  // }

  drawStones(context) {
    context.drawImage(this.Stones, 220, 660);
  }

  moveStroke(context, x, y) {
    context.drawImage(this.StrokeBlock, 225 + x, 700 - 120 - y);
  }

  moveBranchR() {}

  moveBranchL() {}
  // attackTree() // Pasar el metodo de ataque de GAME a
}
