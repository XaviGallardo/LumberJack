var game;
var lumberjack;
var theTree;
var controlPanel;
var initialStatus;

document.onload = (function() {
  initialStatus = function() {
    return function() {
      console.log("iniciando ...");
      lumberjack = new LumberJack(50, 80);
      controlPanel = new ControlPanel();

      game = new Game({
        rows: 500,
        columns: 700,
        lumberjack: lumberjack,
        theTree: new TheTree(lumberjack),
        controlpanel: controlPanel,
        starting: initialStatus
      });
    };
  };

  initialStatus()();

  controlPanel.buttonStartGame();

  // game.gameOver = function() {
  //   let gameOver = document.getElementById("gameover");
  //   canvas.style = "display: none";
  //   gameOver.style = "display: block";
  // };
})();
