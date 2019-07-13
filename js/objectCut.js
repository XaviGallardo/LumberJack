class ObjectCut {
  constructor() {
    this.object = new Image();

    this.name = "";
    this.x = 0;
    this.y = 0;
    this.counterMoving = 0;
    this.moving = false;
    this.position;
  }

  createObject(game) {
    if (game.lumberjack.position === "right") {
      console.log("cuando creo los objetos como estoy: XXXXXXXXX");
      console.log(
        "TCL: ObjectCut -> createObject -> game.theTree.branchLeft[0]",
        game.theTree.branchLeft[1]
      );
      console.log(
        "TCL: ObjectCut -> createObject -> game.theTree.branchLeft",
        game.theTree.branchLeft
      );

      switch (game.theTree.branchLeft[1]) {
        case "NoBranch":
          this.name = "trunk";
          this.object.src = "public/StrokeBlock.png";
          break;

        case "Branch":
          this.name = "branch";
          this.object.src = "public/RamaI.png";
          break;
        default:
          break;
      }
    } else {
      switch (game.theTree.branchRight[1]) {
        case "NoBranch":
          this.name = "trunk";
          this.object.src = "public/StrokeBlock.png";
          break;

        case "Branch":
          this.name = "branch";
          this.object.src = "public/RamaD.png";
          break;
        default:
          break;
      }
    }
    this.position = game.lumberjack.position;
    game.theTree.objectsToFly.push(game.objectToFly);
  }
  moveStrokeToRight(context) {
    console.log("TCL: ObjectCut -> moveStrokeToRight -> this.name", this.name);
    if (this.name === "trunk") {
      context.drawImage(this.object, 225 + this.x, 700 - 120 - this.y);
    } else {
      context.drawImage(this.object, 275 + this.x, 700 - 120 - this.y);
    }
  }
  moveStrokeToLeft(context) {
    console.log("TCL: ObjectCut -> moveStrokeToLeft -> this.name", this.name);
    if (this.name === "trunk") {
      context.drawImage(this.object, 225 - this.x, 700 - 120 - this.y);
    } else {
      context.drawImage(this.object, 17 - this.x, 700 - 120 - this.y);
    }
  }
  startFly(game) {
    game.theTree.objectsToFly[
      game.theTree.objectsToFly.length - 1
    ].moving = true;
  }
  updateCoordinates() {
    this.x += 3.75;
    this.y = Math.sin((1 / 75) * this.x) * 80;
  }
  resetCoordinates() {
    this.x = 0;
    this.y = 0;
  }
}
