var game;
var lumberjack;
var theTree;
var controlPanel;
document.onload = (function() {
  lumberjack = new LumberJack(50, 80);
  controlPanel = new ControlPanel();

  game = new Game({
    rows: 500,
    columns: 700,
    lumberjack: lumberjack,
    theTree: new TheTree(lumberjack),
    controlpanel: controlPanel
  });

  controlPanel.buttonStartGame();

  // game.gameOver = function() {
  //   let gameOver = document.getElementById("gameover");
  //   canvas.style = "display: none";
  //   gameOver.style = "display: block";
  // };
})();
