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
      { name: "", score: "" },
      { name: "", score: "" },
      { name: "", score: "" },
      { name: "", score: "" },
      { name: "", score: "" },
      { name: "", score: "" },
      { name: "", score: "" },
      { name: "", score: "" },
      { name: "", score: "" },
      { name: "", score: "" }
    ];
    // this.p1Name = localStorage.getItem("1");
    // this.p2Name = localStorage.getItem("2");
    // this.p3Name = localStorage.getItem("3");
    // this.p4Name = localStorage.getItem("4");
    // this.p5Name = localStorage.getItem("5");
    // this.p6Name = localStorage.getItem("6");
    // this.p7Name = localStorage.getItem("7");
    // this.p8Name = localStorage.getItem("8");
    // this.p9Name = localStorage.getItem("9");
    // this.p10Name = localStorage.getItem("10");

    // this.p1Score = localStorage.getItem("this.p1Name");
    // this.p2Score = localStorage.getItem("this.p2Name");
    // this.p3Score = localStorage.getItem("this.p3Name");
    // this.p4Score = localStorage.getItem("this.p4Name");
    // this.p5Score = localStorage.getItem("this.p5Name");
    // this.p6Score = localStorage.getItem("this.p6Name");
    // this.p7Score = localStorage.getItem("this.p7Name");
    // this.p8Score = localStorage.getItem("this.p8Name");
    // this.p9Score = localStorage.getItem("this.p9Name");
    // this.p10Score = localStorage.getItem("this.p10Name");

    for (let index = 0; index < 9; index++) {
      this.scores[index].name = localStorage.getItem(index);
      this.scores[index].score = localStorage.getItem(this.scores[index].name);
    }
  }

  updateScore(name, score) {
    this.scores.forEach(function(dataScore, index) {
      if (dataScore.name === name && dataScore.score < score.points) {
        dataScore.score = score.points;
        console.log("He tenido que actualizar los puntos");
      }
    });
  }
}

// function orderByDuration(movies) {
//     movies.sort(function(a, b) {
//       if (a.duration > b.duration) {
//         return 1;
//       } else if (a.duration < b.duration) {
//         return -1;
//       } else if (a.duration == b.duration) {
//         if (a.title > b.title) {
//           return 1;
//         } else if (a.title < b.title) {
//           return -1;
//         }
//         return 0;
//       }
//     });
//     return movies;
//   }
