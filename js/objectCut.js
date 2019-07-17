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

          console.log(
            "TCL: ObjectCut -> createObject -> game.theTree.objectsToFly.length",
            game.theTree.objectsToFly.length
          );
          if (
            game.theTree.objectsToFly.length > 0 &&
            game.gameOverStatus === false
          ) {
            game.sounds[1].play();
          }
          console.log("1");
          break;

        case "Branch":
          this.name = "branch";
          this.object.src = "public/RamaI.png";
          if (
            game.theTree.objectsToFly.length > 0 &&
            game.gameOverStatus === false
          ) {
            game.sounds[2].play();
          }
          console.log("2");
          break;
        default:
          break;
      }
    } else {
      switch (game.theTree.branchRight[1]) {
        case "NoBranch":
          this.name = "trunk";
          this.object.src = "public/StrokeBlock.png";
          if (
            game.theTree.objectsToFly.length > 0 &&
            game.gameOverStatus === false
          ) {
            game.sounds[1].play();
          }

          console.log("3");
          break;

        case "Branch":
          this.name = "branch";
          this.object.src = "public/RamaD.png";
          if (
            game.theTree.objectsToFly.length > 0 &&
            game.gameOverStatus === false
          ) {
            game.sounds[2].play();
          }
          console.log("4");
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
