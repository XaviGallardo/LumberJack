class TheTree {
  constructor(lumberjack) {
    this.branchRight = [];
    this.branchLeft = [];
    this.lumberjack = lumberjack;
    this._createTree(lumberjack);

    this.BranchD = new Image();
    this.BranchD.src = "/public/RamaD.png";
    this.BranchI = new Image();
    this.BranchI.src = "/public/RamaI.png";
    this.TrunkBig = new Image();
    this.TrunkBig.src = "/public/Arbol.png";
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

  // attackTree() // Pasar el metodo de ataque de GAME a
}
