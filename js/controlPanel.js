class ControlPanel {
  constructor() {
    this.startPage = document.createElement("div");
    this.playGame = document.createElement("button");
    this.reStartGame = document.createElement("button");
  }

  buttonPlayGame() {
    this.playGame.innerHTML = "PLAY";
    this.playGame.onclick = game.start;
    document.body.insertBefore(this.startPage, document.body.childNodes[1]);
    document.getElementsByTagName("div")[0].appendChild(this.playGame);
  }
}
