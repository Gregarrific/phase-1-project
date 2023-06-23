//Global variables
let playerName, difficulty, introMsg, answerKey, questionBank;
let qIndex = 0, correct = 0;
const showAnswerDelay = 1000; //Delay in milliseconds to show correct answer for each question
const introReset = 'Ready to play?  Enter your name below to start a new game.  Good luck!';
const categories = [
    {"id": 9, "name": "General Knowledge"},
    {"id": 11, "name": "Movies & Film"},
    {"id": 17, "name": "Science & Nature"},
    {"id": 22, "name": "Geography"},
    {"id": 23, "name": "History"},
    {"id": 99, "name": "Random"}
];
//Event listeners
document.addEventListener('DOMContentLoaded', e => {
    introMsg = document.getElementById('intro-msg');
    mainContainer = document.getElementById('main');
})
document.addEventListener('submit', e => initiatePlayer(e));
//Functions
function initiatePlayer(e) {
    e.preventDefault();
    const form = e.target;
    const formInput = form.querySelector('#player-name').value;   
    if (formInput === '') {
        introMsg.innerText = 'Oops. Looks like you did not enter your name.  Please try again.';
        return form.reset();
    }
    playerName = formInput;
    introMsg = introReset;
    initiateDifficulty();
}
function initiateDifficulty() {
    mainContainer.innerHTML = '';
    let heading = document.createElement('h3');
    heading.innerText = `2. ${playerName}, choose your difficulty level:`;
    let difficultySelect = document.createElement('select');
    difficultySelect.id = 'selection';
    difficultySelect.innerHTML = 
        `<option value="" disabled selected>Choose wisely ;-)</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>`;
    mainContainer.appendChild(heading);
    mainContainer.appendChild(difficultySelect);
    difficultySelect.addEventListener('change', e => {
        difficulty = e.target.value;
        initiateCategory();
    });
}
function initiateCategory() {
    mainContainer.innerHTML = '';
    let heading = document.createElement('h3');
    heading.innerText = `3. ${playerName}, choose your category:`;
    mainContainer.appendChild(heading);
    for (item of categories) {
        let button = document.createElement('button');
        button.id = item.id;
        button.className = 'cat-button';
        button.innerText = item.name;
        button.addEventListener('click', e => fetchQuestions(e));
        mainContainer.appendChild(button);
    }
}
function fetchQuestions(e) {
    let apiUrl, cat;
    if (parseInt(e.target.id) === 99) {
        cat = '';
    } else {
        cat = `&category=${e.target.id}`;
    }
    apiUrl = `https://opentdb.com/api.php?amount=40${cat}&difficulty=${difficulty}&type=multiple`;
    fetch(apiUrl)
    .then (response => response.json())
    .then (json => {
        questionBank = json.results;
        startGame(questionBank);
    });
}
function showQuestion(qIndex) {
    let currentQuestion = questionBank[qIndex];
    let questionCard = document.createElement('div');
    questionCard.id = 'question';
    questionCard.className = 'container';
    questionCard.innerHTML =`<h3 class="questionNum">Question ${qIndex + 1}</h3>
            <h4 class="question">${currentQuestion.question}</h4>`
    let i = 0;
    for (const button of answerKey[qIndex]) {
        if (button === answerKey[qIndex][0]) {
        } else {
        let answerButton = document.createElement('p');
        let answers = document.createElement('button');
        answers.className = 'button';
        answers.id = `ans-${i}`;
        answers.innerText = button;
        answerButton.appendChild(answers);
        questionCard.appendChild(answerButton);
        i ++;
        }
    }
    document.body.appendChild(questionCard);
}
function createAnswerKey(questions) {
    let theKey = [];
    for (const question in questions) {
        const randomNumber = Math.floor(Math.random() * 4);
        const answerArray = questions[question].incorrect_answers;
        answerArray.splice(randomNumber, 0, questions[question].correct_answer);
        answerArray.unshift(randomNumber);
        theKey.push(answerArray);
    }
    console.log(theKey);
    return theKey;
}
function startGame(questionBank) {
    mainContainer.innerHTML = `<h3>${playerName}, here we go!  You have 1 minute to answer as many questions as you can!</h3>`;
    setTimeout( f => endGame(), 60000);
    let numQuestions = questionBank.length;
    answerKey = createAnswerKey(questionBank, numQuestions);
    let index = 1;
    showQuestion(qIndex);
    document.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            checkAnswer(e);
        };
    });
}
function endGame(){
    let score = 0;
    if (difficulty === 'hard') {
        score = correct * 5;
    } else if (difficulty === 'medium') {
        score = correct * 3;
    } else {
        score = correct;
    };
    mainContainer.innerHTML = `<h3>${playerName}, game over! You got ${correct} questions right and a score of ${score}!</h3>`;
    document.getElementById('question').remove();
}
function checkAnswer(e) {
    const correctAnswer = answerKey[qIndex][0];
    const answerGuess = parseInt(e.target.id.split('-')[1]);
    let correctBtn = document.getElementById(`ans-${correctAnswer}`);
    let answerBtn = document.getElementById(`ans-${answerGuess}`);
    if (answerGuess !== correctAnswer) {
        answerBtn.className = 'result-incorrect';
    } else {
        correct ++;
    }
    correctBtn.className = 'result-correct';
    qIndex ++;
    setTimeout(f => {
    document.getElementById('question').remove();
    showQuestion(qIndex);
    }, showAnswerDelay);
}