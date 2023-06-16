//Global variables
let playerName, difficulty, introMsg;
let timerEnd = false;
const introReset = 'Ready to play?  Enter your name below to start a new game.  Good luck!'
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
    if (formInput === "") {
        introMsg.innerText = "Oops. Looks like you did not enter your name.  Please try again.";
        return form.reset();
    }
    playerName = formInput;
    introMsg = introReset;
    initiateDifficulty();
}
function initiateDifficulty() {
    mainContainer.innerHTML = "";
    let heading = document.createElement('h3');
    heading.innerText = `2. ${playerName}, choose your difficulty level:`;
    let difficultySelect = document.createElement('select');
    difficultySelect.id = 'selection';
    difficultySelect.innerHTML = 
        `<option value="" disabled selected>Choose wisely</option>
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
    mainContainer.innerHTML = "";
    let heading = document.createElement('h3');
    heading.innerText = `3. ${playerName}, choose your category:`;
    mainContainer.appendChild(heading);
    for (item of categories) {
        let button = document.createElement('button');
        button.id = item.id;
        button.className = "cat-button";
        button.innerText = item.name;
        button.addEventListener('click', e => fetchQuestions(e));
        mainContainer.appendChild(button);
    }
}
function fetchQuestions(e) {
    fetch(apiUrl)
    .then (response => response.json())
    .then (json => console.log(json));
    
}