// array used to store user names
var users = {};
var time = 0;
var points = 0;
var questionNumber = 1;
var score = points + time

// add a funtion for the quiz start button
$("#start-btn").on("click", function() {
    console.log("Quiz started");
    time = 75;
    startQuiz();
    //countdown timer for the quiz.
    var interval = setInterval(function(){
        document.getElementById('timer').innerHTML=time;
        time--;
        if (time === 0 || time < 0) {
          clearInterval(interval)
          endQuiz()
        }
      }, 1000);
});

// add a function to start the quiz
var startQuiz = function() {
createQuestion(0);
};
// add an object array to store questions and answers
//an array of questions barrowed from a peer.
var questions = [
    {
        title: "Commonly Used data types DO NOT include:",
        choices: ["stings", "alerts", "booleans", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statment is enclosed within _____.",
        choices: ["parentheses", "quotes", "curly brackets", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "What javascipt method can we use to select an html element?",
        choices: ["document.queryselector()", "document.getElementChild", "document.getElementById", "Both 1 and 3"],
        answer: "Both 1 and 3"
    },
    {
        title: "What html tag is NOT included in the HEAD tag?",
        choices: ["link", "meta", "title", "header"],
        answer: "header"
    },
    {
        title: "What attribute is used in html to decorate content?",
        choices: ["css", "class", "src", "style"],
        answer: "style"
    }
]

// generates questions and the corosponding css
function createQuestion(questionId) {
    //pulls a question from the questions array and generates a div to place it on
    var question = questions[questionId];
    var questionDiv = document.createElement("div");
    questionDiv.setAttribute("id", "quesiton" + questionId);
    questionDiv.setAttribute("class", "d-flex row");
    
    var answerDiv = document.createElement("div");
    answerDiv.setAttribute("id", "answer-block");
    answerDiv.setAttribute("class", "col");
    //creates an h1 element inside the generated div
    var questionH1 = document.createElement("h4");
    questionH1.setAttribute("class", "question-title flex-row");
    questionH1.innerHTML = question.title;
    questionDiv.appendChild(questionH1);
    
    for (answer in question.choices) {
        var answerButton = document.createElement("button");
        answerButton.innerHTML = question.choices[answer];
        answerButton.setAttribute("class", "answer-btn btn btn-dark");
        answerButton.addEventListener("click", function() {
            answerChecker(question.choices[answer], question.answer); 
        });
        answerDiv.appendChild(answerButton);
    };
    var mainSection = document.getElementById("main");
    mainSection.innerHTML = "";
    mainSection.appendChild(questionDiv)
    mainSection.appendChild(answerDiv)
}

// make a function that subtracts time when the wrong answer is selected should also cycle
//through questions down the array

var wrongAnswer = function() {
    time = time - 15;
}

// make a function that adds points when the right answer is selected should also cycle
//through questions down the array
var rightAnswer = function() {
    points = points + 20;
}

// add a function to end the quiz and accept the users name. This should save the users name and the points value
//to local storage.
var endQuiz = function() {
    score = time + points;
    prompt("Please enter your name.")
}

// make a function to call a popup window thats displays the name and score of previous users ranked from 
//highes value to lowest
$("#view").on("click", function() {
    var userLi = $("<li>").addClass("user-list");
    $("main").append(userLi)
    console.log("view")
})

// loads high scores from local storage

// Make an h3 flasher thats says if an answer was correct or incorrect

// checks if an answer is correct and runs the corrosponding code
var answerChecker = function(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        rightAnswer();
    } else {
        wrongAnswer();
    }
    if (questionNumber < questions.length) {
        createQuestion(questionNumber);
        questionNumber++;
    } else {
    endQuiz();
    }
}

