class ControlPanel {
  constructor() {
    this.startPage = document.createElement("div");
    this.playGame = document.createElement("button");
    this.instructions = document.createElement("button");
    this.reStartGame = document.createElement("button");
    this.gameOver = document.createElement("div");
    this.playerGame = document.createElement("div");
  }

  _setPlayerName() {
    this.playerGame.innerHTML =
      "<h1>Insert Lumberjack Name</h1>" + "<input type=`text`  id=`name`>";
    document.getElementsByTagName("div")[0].appendChild(this.playerGame);
  }

  _buttonReStart() {
    this.reStartGame.innerHTML = "NEW GAME";
    this.reStartGame.onclick = game.reStart;
    document.getElementsByTagName("div")[0].appendChild(this.reStartGame);

    this.buttonReCharge();
  }

  buttonReCharge() {
    var reChargePage = document.createElement("button");
    reChargePage.innerHTML = "New Player";
    reChargePage.onclick = this._refreshPage;
    document.getElementsByTagName("div")[0].appendChild(reChargePage);
  }

  _refreshPage() {
    window.location.reload();
  }

  buttonStartGame() {
    this.playerGame.innerHTML =
      "<h1>Welcome to Lumberjack GAME</h1><h2>Please, insert your Name</h2><input type=text id=name placeholder=LumberJack's_Name>";
    this.playerGame.setAttribute("id", "playerForm");

    this.startPage.setAttribute("id", "startPage");
    this.playGame.setAttribute("id", "playButton");
    this.playGame.innerHTML = "PLAY";
    // this.playGame.onclick = game.start;
    this.playGame.onclick = this.checkNameInsert;
    document.body.insertBefore(this.startPage, document.body.childNodes[1]);
    document.getElementsByTagName("div")[0].appendChild(this.playerGame);
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

  checkNameInsert() {
    var name = document.getElementById("name").value;
    console.log("TCL: ControlPanel -> checkNameInsert -> name", name);

    if (name) {
      game.start(name);
    }
  }

  gameOverPanel(score) {
    console.log("TCL: ControlPanel -> gameOverPanel -> score", score);
    this.gameOver.setAttribute("id", "finalResult");
    this.gameOver.innerHTML = `TOTAL  ${score.text} ${score.points}`;
    document
      .getElementsByTagName("div")[0]
      .parentNode.appendChild(this.gameOver);
    let element = document.getElementsByTagName("div")[0];
    document.getElementsByTagName("div")[0].parentNode.removeChild(element);
    this._buttonReStart();
    console.log("TCL: ControlPanel -> gameOverPanel -> element", element);
    game.totalScore.updateScore(score.name, score);
  }

  createHowToPlay() {
    var showInstructions = document.createElement("div");
    showInstructions.setAttribute("id", "showInstructionsPannel");
    showInstructions.setAttribute("class", "no-show");
    showInstructions.innerHTML =
      "Explicación Funcionamiento: <br> Utiliza las flechas para cortar el arbol desde el lado que indica la flecha, has de tener en cuenta que la rama no te puede caer encima, si no estás muerto. Date prisa porque el tiempo va en tu contra.";
    document.getElementById("startPage").appendChild(showInstructions);
  }

  showHowToPlay() {
    document
      .getElementById("showInstructionsPannel")
      .classList.toggle("no-show");
  }
}
