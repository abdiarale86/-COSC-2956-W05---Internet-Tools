const quizData = [
    {
        question: "What does HTML stand for?",
        a: "Hyper Text Markup Language",
        b: "High Tech Modern Language",
        c: "Hyper Transfer Markup Level",
        d: "Home Tool Markup Language",
        correct: "a"
    },
    {
        question: "Which tag is used to create a link in HTML?",
        a: "<p>",
        b: "<a>",
        c: "<img>",
        d: "<div>",
        correct: "b"
    },
    {
        question: "Which CSS property changes text color?",
        a: "font-size",
        b: "background-color",
        c: "color",
        d: "text-align",
        correct: "c"
    },
    {
        question: "Which JavaScript method selects an element by id?",
        a: "querySelectorAll()",
        b: "getElementById()",
        c: "getElementsByClassName()",
        d: "innerHTML()",
        correct: "b"
    },
    {
        question: "Which input type allows only one choice?",
        a: "checkbox",
        b: "text",
        c: "radio",
        d: "password",
        correct: "c"
    }
];

// Fisher-Yates shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(quizData);

const questionEl = document.getElementById("question");
const optionA = document.getElementById("option-a");
const optionB = document.getElementById("option-b");
const optionC = document.getElementById("option-c");
const optionD = document.getElementById("option-d");

const answerInputs = document.querySelectorAll('input[name="answer"]');

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");

const resultEl = document.getElementById("result");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

let currentQuestion = 0;
let userAnswers = new Array(quizData.length).fill(null);

function loadQuestion() {
    const currentQuiz = quizData[currentQuestion];

    questionEl.innerText = currentQuiz.question;
    optionA.innerText = currentQuiz.a;
    optionB.innerText = currentQuiz.b;
    optionC.innerText = currentQuiz.c;
    optionD.innerText = currentQuiz.d;

    deselectAnswers();

    if (userAnswers[currentQuestion] !== null) {
        answerInputs.forEach((input) => {
            if (input.value === userAnswers[currentQuestion]) {
                input.checked = true;
            }
        });
    }

    updateProgress();
    updateButtons();
}

function deselectAnswers() {
    answerInputs.forEach((input) => {
        input.checked = false;
    });
}

function getSelected() {
    let answer = null;
    answerInputs.forEach((input) => {
        if (input.checked) {
            answer = input.value;
        }
    });
    return answer;
}

function saveAnswer() {
    userAnswers[currentQuestion] = getSelected();
}

function updateProgress() {
    progressText.innerText = `Question ${currentQuestion + 1} / ${quizData.length}`;
    const percent = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = percent + "%";
}

function updateButtons() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.style.display = currentQuestion === quizData.length - 1 ? "none" : "inline-block";
    submitBtn.style.display = currentQuestion === quizData.length - 1 ? "inline-block" : "none";
}

nextBtn.addEventListener("click", function () {
    saveAnswer();

    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
});

prevBtn.addEventListener("click", function () {
    saveAnswer();

    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
});

submitBtn.addEventListener("click", function () {
    saveAnswer();

    let score = 0;

    for (let i = 0; i < quizData.length; i++) {
        if (userAnswers[i] === quizData[i].correct) {
            score++;
        }
    }

    document.getElementById("quiz").innerHTML = `
        <h2>You scored ${score} out of ${quizData.length}</h2>
        <button onclick="location.reload()">Reload Quiz</button>
    `;
});

loadQuestion();