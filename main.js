//Global variables
let playerName, difficulty, introMsg, answerKey, questionBank;
let qIndex = 0;
let timerEnd = false;
const introReset = 'Ready to play?  Enter your name below to start a new game.  Good luck!';
const apiUrl = `http://localhost:3000/results`; //temporary while testing
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
    fetch(apiUrl)
    .then (response => response.json())
    .then (json => {
        questionBank = json;
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
    for (let button of answerKey[qIndex]) {
        if (button === answerKey[qIndex][0]) {
        } else {
        let answerButton = document.createElement('p');
        answerButton.innerHTML = `<button class='button'>${button}</button>`;
        questionCard.appendChild(answerButton);
        }
    }
    document.body.appendChild(questionCard);
}
function createAnswerKey(questions) {
    let theKey = [];
    for (let question in questions) {
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
    mainContainer.innerHTML = `<h3>${playerName}, here we go!  You have 1 minute!</h3>`;
    setTimeout( f => endGame(), 10000); //Set to 10 seconds for testing purposes
    let numQuestions = questionBank.length;
    answerKey = createAnswerKey(questionBank, numQuestions);
    let index = 1;
    showQuestion(qIndex);
    document.addEventListener('click', e => checkAnswer(e))
}
function endGame(){
    mainContainer.innerHTML = `<h3>${playerName}, game over!</h3>`;
    document.getElementById('question').remove();
}
function checkAnswer(e) {
    console.log(e.target);
    qIndex ++;
    document.getElementById('question').remove();
    showQuestion(qIndex)
}