class ControlPanel {
  constructor() {
    this.startPage = document.createElement("div");
    this.playGame = document.createElement("button");
    this.reStartGame = document.createElement("button");
    this.gameOver = document.createElement("div");
  }

  buttonStartGame() {
    this.playGame.innerHTML = "PLAY";
    this.playGame.onclick = game.start;
    document.body.insertBefore(this.startPage, document.body.childNodes[1]);
    document.getElementsByTagName("div")[0].appendChild(this.playGame);
  }

  gameOverPanel() {
    this.gameOver.innerHTML = "VER COMO METER la PUNTUACION";
    document.getElementsByTagName("div")[0].appendChild(this.gameOver);
    let element = document.getElementsByTagName("div")[0];
    document.getElementsByTagName("div")[0].parentNode.removeChild(element);
  }
}
