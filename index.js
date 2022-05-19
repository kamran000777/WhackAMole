function whack() {
  const box = document.querySelectorAll(".box");
  const mole = document.querySelector(".mole");
  const scored = document.querySelector("#score");
  let time = document.querySelector("#timeleft");

  let result = 0;
  let hitPosition = null;
  let timerId = null;
  let timer = time.textContent;

  //giving a new grid every time
  function randomGrid() {
    box.forEach((element) => {
      element.classList.remove("mole");
    });
    let randomPositon = box[Math.floor(Math.random() * 9)];
    randomPositon.classList.add("mole");
    hitPosition = randomPositon.id;
  }

  //checking for an hit on each grid of the board
  box.forEach((box) => {
    box.addEventListener("mousedown", () => {
      if (box.id == hitPosition) {
        result++;
        if (result > hiscoreval) {
          hiscoreval = result;
          localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
          hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scored.textContent = result;
        hitPosition = null;
      }
    });
  });

  function moleMove() {
    timerId = setInterval(randomGrid, 1000);
  }
  moleMove();

  //function for timer is come to an end
  countdown = () => {
    timer--;
    time.textContent = timer;
    if (timer == 0) {
      clearInterval(countdowntimer);
      clearInterval(timerId);
      alert("Time out Buddy! Your Score is " + result);
      time.textContent = 60;
      result = 0;
      scored.textContent = result;
    }
  };
  let countdowntimer = setInterval(countdown, 1000);
}

//storing high score in localstorage
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "High Score: " + hiscore;
}
