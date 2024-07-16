const questions = [
    {
        question: "What is the purpose of the main method in Java?",
        answers: [
            { text: " It is used to print messages.", correct: false},
            { text: " It is the entry point of any Java program.", correct: true},
            { text: " It is used to define class variables.", correct: false},
            { text: " It is used to create new objects.", correct: false},
        ]
    },
    {
        question: "What does the final keyword mean in Java?",
        answers: [
            { text: "It allows method overriding.", correct: false},
            { text: " It is used to declare constants, prevent method overriding, and inheritance.", correct: true},
            { text: " It makes a class abstract.", correct: false},
            { text: "  It allows inheritance.", correct: false},
        ]
    },
    {
        question: "What is the default value of a boolean variable in Java?",
        answers: [
            { text: "true", correct: false},
            { text: "null", correct: false},
            { text: "0", correct: false},
            { text: "false", correct: true},
        ]
    },
    {
        question: "What is the use of the this keyword in Java?",
        answers: [
            { text: "It refers to the parent class.", correct: false},
            { text: "It refers to the current instance of the class.", correct: true},
            { text: "It is used to call static methods.", correct: false},
            { text: "It refers to a local variable.", correct: false},
        ]
    },
    {
        question: "What is the superclass of all classes in Java?",
        answers: [
            { text: "String.", correct: false},
            { text: "Object.", correct: true},
            { text: "System", correct: false},
            { text: "Class", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answers =>
    {
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const seletedBtn = e.target;
    const isCorrect = seletedBtn.dataset.correct === "true";
    if(isCorrect){
        seletedBtn.classList.add("correct");
        score++;
    }else{
        seletedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `Your scored ${score} out of ${questions.length}! `;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
