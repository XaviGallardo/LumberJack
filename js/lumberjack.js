class LumberJack {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.position = "right";
    this.life = 300;
  }
  _changeSide() {
    console.log("CambioLado");
    if (this.position === "right") {
      console.log("TCL: LumberJack -> _changeSide -> this", this);
      this.position = "left";
    } else {
      this.position = "right";
    }
    console.log("TCL: LumberJack -> _changeSide -> this", this);
  }
  _cutTheTree() {
    console.log("Cut the Tree");
  }
}
