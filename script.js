

const quizGuid = document.querySelector(".quizGuid");
const startQuizBtn = document.querySelector(".start-quiz-button");
const closeBtn = document.querySelector("#close-btn");
const container = document.querySelector(".container");

startQuizBtn.addEventListener("click", () => {
    quizGuid.showModal(); // Show the dialog
    container.classList.add("blur"); // Add the blur effect to the container
});

closeBtn.addEventListener("click", () => {
    quizGuid.close(); // Close the dialog
    container.classList.remove("blur"); // Remove the blur effect from the container
});

// FORM modal POP DIALOG

// const continueBtn = document.querySelector("#continue-btn");
// const formDialog = document.querySelector("#form-dialog");

// continueBtn.addEventListener("click", () => {
//     formDialog.showModal();
// });

//  COUNTDOWN POPUP 

const submitBtn = document.getElementById("continue-btn");
const modalPop = document.getElementById("modal-pop");
const countdownElement = document.getElementById("countdown-number");
const questShow = document.querySelector(".quet-cover");
const cover = document.getElementsByClassName("full-cover");


submitBtn.addEventListener("click", () => {
    modalPop.showModal();  
    let interval = 5;  
    countdownElement.innerText = interval;  
    let countdownTimer = setInterval(() => {
        interval--;  
        countdownElement.innerText = interval; 

        if (interval === 0) {
            clearInterval(countdownTimer);  
            modalPop.close();
            quizGuid.close(); 
            // showQuestions ();
            questContainerCover.showModal();
            const countdownInterval = setInterval(updateCountdown, 1000);
            updateCountdown ();


        }
    }, 1000);
});


// QUESTIONS JAVASCRIPT 



// Select elements
let questContainerCover = document.querySelector(".quest-cover");
let questions = document.querySelector(".question");
let choices = document.querySelector(".choice");
let nextBtn = document.querySelector(".next-btn");
let scoreDialog = document.getElementById("score");
let scoreHeader = document.getElementById("score-h");

let score = 0; // Initialize score
const quiz = [
    { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Markup Language"], answer: "Hyper Text Markup Language" },
    { question: "Which HTML tag is used to define an internal style sheet?", options: ["<css>", "<style>", "<script>", "<link>"], answer: "<style>" },
    { question: "Which property is used in CSS to change the background color?", options: ["color", "bgcolor", "background-color", "backgroundimage"], answer: "background-color" },
    { question: "What is the correct syntax for linking an external JavaScript file in HTML?", options: ['<script href="app.js"></script>', '<script src="app.js"></script>', '<link src="app.js">', '<js link="app.js">'], answer: '<script src="app.js"></script>' },
    { question: "Which of the following is a JavaScript framework?", options: ["React", "CSS", "HTML", "Bootstrap"], answer: "React" },
    { question: "Which CSS property controls the text size?", options: ["text-style", "font-size", "text-size", "font-style"], answer: "font-size" },
    { question: "In JavaScript, which method is used to select an element by its ID?", options: ["getElementByClass()", "getElementByTag()", "getElementById()", "querySelectorAll()"], answer: "getElementById()" },
    { question: "Which of the following is a valid way to declare a variable in JavaScript?", options: ["var x = 5;", "int x = 5;", "let x = 5;", "Both A and C"], answer: "Both A and C" },
    { question: "Which HTML tag is used for creating a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], answer: "<a>" },
    { question: "Which of the following is used to add a comment in CSS?", options: ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment */", "# This is a comment"], answer: "/* This is a comment */" }
];

let currentQuizIndex = 0;
let quizCompleted = false; // Track whether the quiz is completed or not

// Function to display the current question and its options
const showQuestions = () => {
    const storedQuest = quiz[currentQuizIndex];
    questions.innerText = storedQuest.question;
    choices.innerHTML = ""; // Clear previous options

    // Display the options dynamically
    for (let i = 0; i < storedQuest.options.length; i++) {
        const currentChoice = storedQuest.options[i];
        const createDiv = document.createElement("div");
        createDiv.innerText = currentChoice;
        createDiv.classList.add("option"); // Add class for styling if needed
        choices.appendChild(createDiv);

        // Add click event listener to each option
        createDiv.addEventListener("click", () => {
            checkAnswer(currentChoice, createDiv);
        });
    }
};

// Function to check if the selected answer is correct or not
const checkAnswer = (selectedOption, element) => {
    if (quizCompleted) return; // Prevent further checking if the quiz is done

    const correctAnswer = quiz[currentQuizIndex].answer;
    const allOptions = document.querySelectorAll(".option"); // Get all options

    // Disable further clicks after the first selection
    allOptions.forEach((option) => {
        option.style.pointerEvents = "none"; // Disable further clicks
    });

    // Apply color changes for correct and wrong answers
    if (selectedOption === correctAnswer) {
        element.style.backgroundColor = "green"; // Correct answer styling
        element.style.color = "white";
        score++; // Increment score for a correct answer
    } else {
        element.style.backgroundColor = "red"; // Wrong answer styling
        element.style.color = "white";
    }

    // Mark the correct answer in green (if another option was selected)
    allOptions.forEach((option) => {
        if (option.innerText === correctAnswer) {
            option.style.backgroundColor = "green"; // Highlight correct answer
            option.style.color = "white";
        }
    });
};

// Functionality for the Next button
nextBtn.addEventListener("click", () => {
    if (currentQuizIndex < quiz.length - 1) {
        currentQuizIndex++;
        showQuestions();
    } else {
        resultScore(); // Show the final score
    }
});

// Function to display the result score
const resultScore = () => {
    quizCompleted = true; // Mark the quiz as completed
    questContainerCover.style.display = "none"; // Hide the quiz
    scoreHeader.innerText = `Your final score is: ${score} out of ${quiz.length}`; // Display the score
    scoreDialog.showModal(); // Show the score dialog
};

// Show the first question when the page loads
showQuestions();


// COUNTDOWN TIMES FUNCTIIONALTIY 
// Set initial time (1 minute 40 seconds)
let minutes = 1;
let seconds = 40;

// Function to update the countdown
function updateCountdown() {
  // Decrease seconds
  seconds--;

  // If seconds are less than 0, decrease minutes and reset seconds to 59
  if (seconds < 0) {
    seconds = 59;
    minutes--;
  }

  // Stop the countdown when time reaches 0
  if (minutes <= 0 && seconds <= 0) {
    clearInterval(countdownInterval);
    document.getElementById('countDown').innerHTML = "Time's up!";
    return;
  }

//   // Format minutes and seconds to always show two digits
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

//   // Display the updated countdown
  document.getElementById('countDown').innerHTML = `${formattedMinutes}:${formattedSeconds}`;
}

// Update the countdown every 1 second (1000 milliseconds)
// const countdownInterval = setInterval(updateCountdown, 1000);


const everyCLose = document.querySelector("#close-Btn");

everyCLose.addEventListener("click" , () => {
    closeEvery ();
})

function closeEvery () {
    scoreDialog.close();
}