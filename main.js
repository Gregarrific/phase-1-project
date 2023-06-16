//Global variables
let playerName;
let timerEnd = false;
const apiUrl = `http://localhost:3000/results`; //temporary while testing
//Event listeners
document.addEventListener('submit', e => initiatePlayer(e));
//Functions
function initiatePlayer(e) {
    e.preventDefault();
    const form = e.target;
    const formInput = form.querySelector('#player-name').value;   
    console.log(formInput);
}