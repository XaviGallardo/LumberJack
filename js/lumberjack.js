class LumberJack {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.position = "right";
  }
  _changeSide() {
    if (this.position === "right") {
      this.position = "left";
    } else {
      this.position = "right";
    }
  }
}
