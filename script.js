// ------------------- Quiz Data -------------------
const questions = [
    { question: "Which is the largest animal in the world?", answers: ["Shark", "Blue Whale", "Elephant", "Giraffe"], correct: 1 },
    { question: "Which planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Venus"], correct: 1 },
    { question: "What is the capital of India?", answers: ["Mumbai", "Delhi", "Kolkata", "Chennai"], correct: 1 },
    { question: "Which gas do plants release during photosynthesis?", answers: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"], correct: 1 },
    { question: "How many continents are there in the world?", answers: ["5", "6", "7", "8"], correct: 2 },
    { question: "Who is known as the Father of the Nation in India?", answers: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhash Chandra Bose", "Dr. B.R. Ambedkar"], correct: 1 },
    { question: "Which is the smallest planet in our solar system?", answers: ["Mercury", "Venus", "Mars", "Pluto"], correct: 0 },
    { question: "Which organ in the human body pumps blood?", answers: ["Lungs", "Liver", "Heart", "Kidneys"], correct: 2 },
    { question: "Which is the fastest land animal?", answers: ["Cheetah", "Lion", "Horse", "Tiger"], correct: 0 },
    { question: "Which festival is known as the Festival of Lights in India?", answers: ["Holi", "Eid", "Diwali", "Christmas"], correct: 2 }
];

// ------------------- HTML Elements -------------------
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// ------------------- Quiz State -------------------
let currentQuestionIndex = 0;
let score = 0;

// ------------------- Start Quiz -------------------
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

// ------------------- Show Question -------------------
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(index === currentQuestion.correct));
        answerButtons.appendChild(button);
    });
}

// ------------------- Reset State -------------------
function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = ""; // removes all previous answer buttons
}

// ------------------- Select Answer -------------------
function selectAnswer(isCorrect) {
    Array.from(answerButtons.children).forEach((button, idx) => {
        button.disabled = true;
        if (idx === questions[currentQuestionIndex].correct) button.classList.add("correct");
        else button.classList.add("incorrect");
    });

    if (isCorrect) score++;
    nextButton.style.display = "block";
}

// ------------------- Show Score -------------------
function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
}

// ------------------- Handle Next Button -------------------
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) showQuestion();
    else showScore();
}

// ------------------- Next Button Click -------------------
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) handleNextButton();
    else startQuiz();
});

// ------------------- Start the Quiz -------------------
startQuiz();
