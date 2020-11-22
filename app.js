var startButton = document.querySelector("#start");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var questionsDisplay = document.querySelector("#showQs");
var responseDisplay = document.querySelector("#feedbackTrig");

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
    setQuestions();
    questionsDisplay.style.display = "block";
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

var questions = [
  {
    q: "Commonly used data types DO NOT include?",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    a: "C"
  },
  {
    q: "The condition in an if / else statement is enclosed within ____.",
    choices: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
    a: "C"
  }, 
  {
    q: "Arrays in Javascript can be used to store _____.",
    choices: ["Numbers & Strings", "Other Arrays", "Booleans", "All of the Above"],
    a: "D"
  },
  {
    q: "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
    a: "C"
  },
  {
    q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "Terminal/Bash", "For Loops", "Console Log"],
    a: "D"
  }
]

var questionsPointer = 0

var question = document.querySelector("#question")
var optionA = document.querySelector("#optionA")
var optionB = document.querySelector("#optionB")
var optionC = document.querySelector("#optionC")
var optionD = document.querySelector("#optionD")


function setQuestions() {
  if (questionsPointer === questions.length) {
    var timeString = Number(JSON.stringify(minutesDisplay))
    localStorage.setItem("Minutes", timeString)
    clearInterval(interval)
    var initials = prompt(`All Done! Enter your intials and we'll save your score!`);
    var getInitials = localStorage.setItem("Initials", initials);
    return
  }
  question.textContent = questions[questionsPointer].q
  optionA.textContent = questions[questionsPointer].choices[0]
  optionB.textContent = questions[questionsPointer].choices[1]
  optionC.textContent = questions[questionsPointer].choices[2]
  optionD.textContent = questions[questionsPointer].choices[3]
}

optionA.addEventListener("click", function () {
  if (optionA.getAttribute("data-answer") === questions[questionsPointer].a) {
    correctAlert()
    questionsPointer++
    setQuestions()
  } else {
    incorrectAlert()
    totalSeconds -= 10
  }
})

optionB.addEventListener("click", function () {
  if (optionB.getAttribute("data-answer") === questions[questionsPointer].a) {
    correctAlert()
    questionsPointer++
    setQuestions()
  } else {
    incorrectAlert()
    totalSeconds -= 10
  }
})

optionC.addEventListener("click", function () {
  if (optionC.getAttribute("data-answer") === questions[questionsPointer].a) {
    correctAlert()
    questionsPointer++
    setQuestions()
  } else {
    incorrectAlert()
    totalSeconds -= 10
  }
})

optionD.addEventListener("click", function () {
  if (optionD.getAttribute("data-answer") === questions[questionsPointer].a) {
    correctAlert()
    questionsPointer++
    setQuestions()
  } else {
    incorrectAlert()
    totalSeconds -= 10
  }
})

correctAlert = () => {
  responseDisplay.style.display = "block";
  responseDisplay.classList.remove("alert-danger");
  responseDisplay.classList.add("alert-success");
  responseDisplay.textContent = "Correct!";
} 

incorrectAlert = () => {
  responseDisplay.style.display = "block";
  responseDisplay.classList.remove("alert-success");
  responseDisplay.classList.add("alert-danger");
  responseDisplay.textContent = "Incorrect!";
  
} 