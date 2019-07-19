function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0)
    );
  }
}

if (storageAvailable("localStorage")) {
  // Yippee! We can use localStorage awesomeness
  console.log("We can use it!!");
} else {
  // Too bad, no localStorage for us
  console.log("We can NOT use it!!");
}

class TotalScore {
  constructor() {
    this.scores = [
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 },
      { name: "", score: 0 }
    ];

    console.log("TCL: TotalScore -> constructor -> this.scores", this.scores);
    this.getLocalData();
    console.log("TCL: TotalScore -> constructor -> this.scores", this.scores);
  }

  getLocalData() {
    for (let index = 0; index < 10; index++) {
      if (localStorage.getItem(index) != null) {
        this.scores[index].name = localStorage.getItem(index);
        this.scores[index].score = parseInt(
          localStorage.getItem(this.scores[index].name)
        );
      }
      console.log(
        "TCL: TotalScore -> printLocalData -> this.scores",
        this.scores
      );
    }
  }

  setLocalScore() {
    for (let index = 0; index < this.scores.length; index++) {
      localStorage.setItem(index, this.scores[index].name);
      localStorage.setItem(this.scores[index].name, this.scores[index].score);
    }
    console.log("TCL: TotalScore -> setLocalScore -> this.scores", this.scores);
  }

  updateScore(name, score) {
    this.getLocalData();

    let indexName = this.scores.findIndex(data => data.name === name);

    if (indexName != -1) {
      if (this.scores[indexName].score <= score.points) {
        this.scores[indexName].score = score.points;
      }
    } else {
      this.scores.push({ name: name, score: score.points });
    }

    console.log(
      "TCL: TotalScore -> setLocalScore -> this.scores AFTER ACTUALIZAR SIN ORDENAR",
      this.scores
    );

    this.scores.sort(function(a, b) {
      return b.score - a.score;
    });
    console.log(
      "TCL: TotalScore -> setLocalScore -> this.scores AFTER ACTUALIZAR ORDENADO",
      this.scores
    );
    if (this.scores.length === 11) {
      this.scores.pop();
    }
    console.log(
      "TCL: TotalScore -> setLocalScore -> this.scores AFTER ACTUALIZAR QUITO ULTIMO ELEMENTO",
      this.scores
    );
    localStorage.clear();
    this.setLocalScore();
  }
}
