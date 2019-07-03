var game;
var lumberjack;
var theTree;
document.onload = (function() {
  //   const canvas = document.getElementById("snake");
  //   const ctx = canvas.getContext("2d");
  //   const widthCell = 10;
  lumberjack = new LumberJack(50, 80);

  game = new Game({
    rows: 500,
    columns: 700,
    lumberjack: lumberjack,
    theTree: new TheTree(lumberjack)
    // maxCells: widthCell
    // snake: new Snake(canvas.width / widthCell, canvas.height / widthCell),
    // ctx: ctx
  });

  //   lumberjack = new LumberJack(20, 60);

  game._createBoard();
  game._drawTree();
  game._drawLumberJack();
  game._drawBranches();
  //   game.start();

  game.gameOver = function() {
    let gameOver = document.getElementById("gameover");
    canvas.style = "display: none";
    gameOver.style = "display: block";
  };
})();
