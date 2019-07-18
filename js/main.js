var game;
var lumberjack;
var theTree;
var controlPanel;
var initialStatus;
var sound;
var sounds = [];
var totalScore;

document.onload = (function() {
  initialStatus = function() {
    return function() {
      console.log("iniciando ...");
      lumberjack = new LumberJack(100, 160);
      controlPanel = new ControlPanel();
      totalScore = new TotalScore();

      sound = new Sound("public/ArbolVa.mp3");
      sounds.push(sound);
      sound = new Sound("public/ChopWood.mp3");
      sounds.push(sound);
      sound = new Sound("public/ChopWood.mp3");
      sounds.push(sound);
      sound = new Sound("public/nonono.mp3");
      sounds.push(sound);
      sound = new Sound("public/levelUp.mp3");
      sounds.push(sound);

      game = new Game({
        rows: 500,
        columns: 700,
        lumberjack: lumberjack,
        theTree: new TheTree(lumberjack),
        controlpanel: controlPanel,
        starting: initialStatus,
        sounds: sounds,
        totalScore: totalScore
      });
    };
  };

  initialStatus()();

  controlPanel.buttonStartGame();
})();
