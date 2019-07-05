var game;
var lumberjack;
var theTree;
var controlPanel;
document.onload = (function() {
  //   const canvas = document.getElementById("snake");
  //   const ctx = canvas.getContext("2d");
  //   const widthCell = 10;

  lumberjack = new LumberJack(50, 80);
  controlPanel = new ControlPanel();

  game = new Game({
    rows: 500,
    columns: 700,
    lumberjack: lumberjack,
    theTree: new TheTree(lumberjack),
    controlpanel: controlPanel
  });

  //   lumberjack = new LumberJack(20, 60);

  controlPanel.buttonStartGame();

  // game.start();
  // game._createBoard();
  // game._drawTree();
  // game._drawLumberJack();
  // game._drawBranches();
  // game._assignControlsToKeys();

  // TESTING
  //   for (let index = 1; index < 5; index++) {
  //     game._clear();
  //     game._attackTree();
  //     game._drawLumberJack();
  //     game._drawBranches();
  //   }

  //   game.start();

  game.gameOver = function() {
    let gameOver = document.getElementById("gameover");
    canvas.style = "display: none";
    gameOver.style = "display: block";
  };
})();
