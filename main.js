//Global variables
let playerName;
let timerEnd = false;
let introMsg;
const introReset = 'Ready to play?  Enter your name below to start a new game.  Good luck!'
const apiUrl = `http://localhost:3000/results`; //temporary while testing
//Event listeners
document.addEventListener('DOMContentLoaded', e => {
    introMsg = document.getElementById('intro-msg');
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
    initiateCat();
}
function intiateCat(){
    
}