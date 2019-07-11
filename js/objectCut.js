class ObjectCut {
  constructor() {
    this.object = new Image();

    this.x = 0;
    this.y = 0;
    this.counterMoving = 0;
    this.moving = false;
  }

  createObject(game) {
    if (game.lumberjack.position === "right") {
      switch (game.theTree.branchRight[0]) {
        case "NoBranch":
          this.object.src = "/public/StrokeBlock.png";
          break;

        case "Branch":
          this.object.src = "/public/RamaI.png";
          break;
        default:
          break;
      }
    } else {
      switch (game.theTree.branchLeft[0]) {
        case "NoBranch":
          this.object.src = "/public/StrokeBlock.png";
          break;

        case "Branch":
          this.object.src = "/public/RamaD.png";
          break;
        default:
          break;
      }
    }
    game.theTree.objectsToFly.push(game.objectToFly);
  }
  moveStroke(context) {
    context.drawImage(this.object, 225 + this.x, 700 - 120 - this.y);
    console.log("LLEGO a dibujar");
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
