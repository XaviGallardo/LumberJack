class LumberJack {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.position = "right";
    this.maxLife = 300; // 300 ha de ser , se amplia para poder ajustar
    this.life = 300; // 300 ha de ser , se amplia para poder ajustar

    this.attacking = false;

    this.LumberJackImageDGOver = new Image();
    this.LumberJackImageDGOver.src = "/public/lumberAccidentD.png";
    this.LumberJackImageIGOver = new Image();
    this.LumberJackImageIGOver.src = "/public/lumberAccidenteIzq.png";
    this.LumberJackImageD = new Image();
    this.LumberJackImageD.src = "/public/lumberjack_No.png";
    this.LumberJackImageI = new Image();
    this.LumberJackImageI.src = "/public/lumberIzquierda.png";
    this.LumberJackImageDA = new Image();
    this.LumberJackImageDA.src = "/public/lumberDerechaAtack.png";
    this.LumberJackImageIA = new Image();
    this.LumberJackImageIA.src = "/public/lumberIzqAtack.png";
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
