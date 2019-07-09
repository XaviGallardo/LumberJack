class LumberJack {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.position = "right";
    this.maxLife = 30000; // 300 ha de ser , se amplia para poder ajustar
    this.life = 30000; // 300 ha de ser , se amplia para poder ajustar

    this.LumberJackImage = new Image();
    this.LumberJackImage.src = "/public/lumberjack_No.png";
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
