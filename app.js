var startButton = document.querySelector("#start");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");


var totalSeconds = 0;
var secondsElapsed = 0;
var status = "Start";
var interval;



function getFormattedMinutes() {
    var secondsLeft = totalSeconds - secondsElapsed;
    var minutesLeft = Math.floor(secondsLeft / 60);
    var formattedMinutes;
    if (minutesLeft < 10) {
      formattedMinutes = "0" + minutesLeft;
    } else {
      formattedMinutes = minutesLeft;
    }
    return formattedMinutes;
  }

function getFormattedSeconds() {
    var secondsLeft = (totalSeconds - secondsElapsed) % 60;
    var formattedSeconds;
    if (secondsLeft < 10) {
      formattedSeconds = "0" + secondsLeft;
    } else {
      formattedSeconds = secondsLeft;
    }
    return formattedSeconds;
}

function setTime() {
    var minutes = 10;
    clearInterval(interval);
    totalSeconds = minutes * 60;
}
function startTimer() {
    setTime(); 
    if (totalSeconds > 0) {
        interval = setInterval(function() {
          secondsElapsed++;
          renderTime();
        }, 1000);
    } else {
      alert("Minutes of work/rest must be greater than 0.")
    }
}
function renderTime() {
    // When renderTime is called it sets the textContent for the timer html...
    minutesDisplay.textContent = getFormattedMinutes();
    secondsDisplay.textContent = getFormattedSeconds();
  
   // ..and then checks to see if the time has run out
    if (secondsElapsed >= totalSeconds) {
      if (status === "Start") {
        alert("Time for a break!");
      } else {
        alert("Time to get back to work!");
      }
  
      stopTimer();
    }
  }

startButton.addEventListener("click", startTimer);