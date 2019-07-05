class ControlPanel {
  constructor() {
    this.startPage = document.createElement("div");
    this.playGame = document.createElement("button");
    this.reStartGame = document.createElement("button");
    this.gameOver = document.createElement("div");
  }
  _buttonReStart() {
    this.reStartGame.innerHTML = "NEW GAME";
    this.reStartGame.onclick = game.reStart;
    document.getElementsByTagName("div")[0].appendChild(this.reStartGame);
  }
  buttonStartGame() {
    this.playGame.innerHTML = "PLAY";
    this.playGame.onclick = game.start;
    document.body.insertBefore(this.startPage, document.body.childNodes[1]);
    document.getElementsByTagName("div")[0].appendChild(this.playGame);
  }

  gameOverPanel(score) {
    console.log("TCL: ControlPanel -> gameOverPanel -> score", score);
    this.gameOver.innerHTML = `TOTAL  ${score.text} ${score.points}`;
    document
      .getElementsByTagName("div")[0]
      .parentNode.appendChild(this.gameOver);
    let element = document.getElementsByTagName("div")[0];
    document.getElementsByTagName("div")[0].parentNode.removeChild(element);
    this._buttonReStart();
    console.log("TCL: ControlPanel -> gameOverPanel -> element", element);
  }
}
