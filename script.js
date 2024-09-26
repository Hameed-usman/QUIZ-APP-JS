// alert("Helooooo...");


const quizGuid = document.querySelector(".quizGuid");
const startQuizBtn = document.querySelector(".start-quiz-button");
// const quizGuid = document.querySelector(".quizGuid");
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


                     //========= QUIZ GUIDE OR RULE SECTION JS START TILL EXIT BUTTON =============




// --------------- COUNTDOWN POPUP JS WITH TARGET CONTINUE BUTTON-----------

const submitBtn = document.getElementById("continue-btn");
const modalPop = document.getElementById("modal-pop");
const countdownElement = document.getElementById("countdown-number");
const questShow = document.querySelector(".quet-cover");  // FOR QUESTION SHOW DIRECTLY AFTER 5 SECOND COUNTDOWN TIME NOT FOR COUNT DOWN


submitBtn.addEventListener("click", () => {
    modalPop.showModal();  
    let interval = 5;  
    let countdownTimer = setInterval(() => {    //NEW CONCEPT OF ASYNC
        interval--;  
        countdownElement.innerText = interval; 

        if (interval === 0) {
            clearInterval(countdownTimer);  
            modalPop.close();
            quizGuid.close(); 

            // THE UPDATE COUNTDOWN FUNCTION IS FOR THE QUESTION TIMER WHICH APPEARS DIRECTLY AFTER THE COUNTDOWN TIME 
            questContainerCover.showModal();
            // const countdownInterval = setInterval(updateCountdown, 1000);
            // updateCountdown ();  // UPDATE COUNTDOWN FUNCTION DECLARED IN LINE 169 

        }
    }, 1000);
});



    //  ......... // --------------- COUNTDOWN POPUP JS WITH TARGET CONTINUE BUTTON- END  ----------

 


// QUESTIONS JAVASCRIPT TO SHOW THE QUESTIONS 

let questContainerCover = document.querySelector(".quest-cover"); //THIS WILL SHOW TE QUESTION (questContainerCover.show())
let questions = document.querySelector(".question");
let choices = document.querySelector(".choice");
let nextBtn = document.querySelector(".next-btn");


let scoreDialog = document.getElementById("score");  // THIS BOTH IS FOR TO SHOW THE LAST SCORE 
let scoreHeader = document.getElementById("score-h");     // OF TEHE QUIZ 

let score = 0; //CALCULTATION OF SCORE IN THE LAST 
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

// THIS IS Function to display the current question and its options AT A TIME....
const showQuestions = () => {
    const storedQuest = quiz[currentQuizIndex];
    questions.innerText = storedQuest.question;
    choices.innerHTML = ""; // Clear previous options

    // THROUGH THIS OPTIONS & QUESTIONS WILL SHOW Dynamically
    for (let i = 0; i < storedQuest.options.length; i++) {
        const currentChoice = storedQuest.options[i];
        const createDiv = document.createElement("div");  //  I HAVE CREATE A DIV THORUGH JS TO SHOW 4 OPTIONs
        createDiv.innerText = currentChoice;
        createDiv.classList.add("option"); // AddED class for styling THORUGH JS
        choices.appendChild(createDiv);

        // Add click event listener to each option

        createDiv.addEventListener("click", () => {  // THIS FUNCTION IS REPSONIBE FOR CHECK ANSWER WHETER IT'S CORRECT
            checkAnswer(currentChoice, createDiv);     // OR NOT & STYLE THE TEXT RED OR GREEN ALSO "++Score"
        });
    }
};





// Function to check if the selected answer is correct or not
const checkAnswer = (selectedOption, element) => {   //elemnt is the inside content of DIV 
    if (quizCompleted) return; // Prevent further checking if the quiz is done (88)

    const correctAnswer = quiz[currentQuizIndex].answer;
    const allOptions = document.querySelectorAll(".option"); // Get all options

    // Disable further clicks after the first selection
    allOptions.forEach((option) => {
        option.style.pointerEvents = "none"; // Disable further clicks
    });

    // Apply color changes for correct and wrong answers
    if (selectedOption === correctAnswer) {            
        element.style.backgroundColor = "green"; 
        element.style.color = "white";
        score++;  // (73)
    } else {
        element.style.backgroundColor = "red"; 
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
        // Check if we are not at the last question
        if (currentQuizIndex < quiz.length - 1) {  
            currentQuizIndex++; // Move to the next question
            showQuestions(); // Display the next question (91)
            } else {
             // If no more questions, show the final score
            resultScore();
           }
                });

// Function to display the result score
const resultScore = () => {
    quizCompleted = true; // Mark the quiz as completed (88)
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
  // Check if the time is already 0 before decrementing
  if (minutes === 0 && seconds === 0) {
    clearInterval(countdownInterval); // Stop the countdown
    document.getElementById('countDown').innerHTML = "Time's up!";
    resultScore();

    return; // Exit the function
  }

  // Decrease seconds ONE BY ONE
  seconds--;

  // If seconds are less than 0, decrease minutes and reset seconds to 59
  if (seconds < 0) {
    seconds = 59;
    minutes--;
  }

  // Format and display the updated time
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  document.getElementById('countDown').innerHTML = formattedMinutes + ":" + formattedSeconds;
}

// Set an interval to call updateCountdown every second
const countdownInterval = setInterval(updateCountdown, 1000);   //(183)

// Update the countdown every 1 second (1000 milliseconds)
// const countdownInterval = setInterval(updateCountdown, 1000);


const everyCLose = document.querySelector("#close-Btn");

everyCLose.addEventListener("click" , () => {
    closeEvery ();
})

function closeEvery () {
    scoreDialog.close();
    container.classList.remove("blur");
}