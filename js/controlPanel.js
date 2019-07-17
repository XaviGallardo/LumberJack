class ControlPanel {
  constructor() {
    this.startPage = document.createElement("div");
    this.playGame = document.createElement("button");
    this.instructions = document.createElement("button");
    this.reStartGame = document.createElement("button");
    this.gameOver = document.createElement("div");
  }
  _buttonReStart() {
    this.reStartGame.innerHTML = "NEW GAME";
    this.reStartGame.onclick = game.reStart;
    document.getElementsByTagName("div")[0].appendChild(this.reStartGame);
  }
  buttonStartGame() {
    this.startPage.setAttribute("id", "startPage");
    this.playGame.setAttribute("id", "playButton");
    this.playGame.innerHTML = "PLAY";
    this.playGame.onclick = game.start;
    document.body.insertBefore(this.startPage, document.body.childNodes[1]);
    document.getElementsByTagName("div")[0].appendChild(this.playGame);

    this.instructions.setAttribute("id", "instructionsButton");
    this.instructions.innerHTML = "Instructions";
    this.instructions.onclick = this.showHowToPlay;
    document.getElementById("startPage").appendChild(this.instructions);
    console.log(
      "TCL: ControlPanel -> constructor -> this.playGame",
      this.playGame
    );
    this.createHowToPlay();
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

  createHowToPlay() {
    var showInstructions = document.createElement("div");
    showInstructions.setAttribute("id", "showInstructionsPannel");
    showInstructions.setAttribute("class", "no-show");
    showInstructions.innerHTML = "Explicación Funcionamiento";
    document.getElementById("startPage").appendChild(showInstructions);
  }

  showHowToPlay() {
    document
      .getElementById("showInstructionsPannel")
      .classList.toggle("no-show");
  }
}
