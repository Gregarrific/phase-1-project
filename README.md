Project Pitch - Phase 1

Basic Story:
I am going to create an application that uses the Open Trivia Database API 
(https://opentdb.com) to create a page that asks trivia questions to the user.

Once the page loads, the player will be asked to enter their name.  Then, the player will choose 
one of six categories via a button.  The choices will be 5 specific categories and a 6th.  The 6th 
will be "random" and will randomly choose one of the 5 other categories to use.  Once the 
player has made those selections and is ready to proceed, they will click a button to start the 
game.  The player will have 1 minute to answer correctly as many questions as they can.

Questions will be presented one at a time.  In addition to the question, 4 multiple choice 
answers will be presented.  The player will press a button for the answer that they think is 
correct.  Once they select an answer a brief message will let them know if that was correct or 
incorrect.

They will then be presented with the next question and so on until the countdown has elapsed. 
Once the countdown has elapsed, the player will see the correct number of questions and their 
associated score.

The score will be based on the number of correct answers multiplied by a bonus.  The bonus will 
be based on the difficulty they choose and whether they picked the random category.

Core features of the Mean Viable Product are:
    *	Allow the user to submit their "name" via a text input form.
    *	Allow the user to select the button of the category they wish to answer questions from.  
There will be 5 categories to choose from, plus one "random" choice that will pick one of 
the other 5 categories at random.
    *	Start and run a countdown timer.
    *	Present one question at a time, allowing the player to click the button number (1-4) that 
they think is correct.
    *	Once they click a choice (1-4), the player will get a brief "message" acknowledging 
whether the answer that they chose was correct or incorrect before going on to the next 
question.
    *	The total number of correct answers will be recorded.
    *	The 

API:
    *	Open Trivia Database (https://opentdb.com/)
    *	The JSON object includes a response and results object.  An example of the results array 
is:
{
"category": "Science:Computers",
"type": "multiple",
"difficulty": "medium",
"question": "Which internet company began life as an online 
bookstore called &#039;Cadabra&#039;?",
"correct_answer": "Amazon",
"incorrect_answers": ["eBay","Overstock","Shopify"]
}
    *	Through the API, I will request the category, type of question (multiple choice), difficulty 
and the number of questions to return.
    *	The question will be presented, and the correct answer and array of incorrect answers 
will have to be presented in a way that the answer list is random.

Challenges:
    *	Implementing and having the countdown timer running.
    *	Questions (see example above) have encoding that I will need to parse and replace.
    *	I know this is about JavaScript, but it will be hard not to get distracted trying to add CSS 
to make it look nice.
    *	May have challenges with the timer and using that.
    *	Need to determine the best way to acknowledge if an answer is correct or incorrect and 
how that gets displayed and only for a brief (1 second?) period.

Meeting Project Requirements:
    *	The application will consist of one HTML page, one CSS page and one JS page and will 
run on one page without reloading the HTML page.
    *	The API will return more than 5 JSON formatted objects.  I estimate requesting at least 
100 question objects for the 1-minute time limit.
    *	Each question object has 6 question attributes.
    *	Three distinct event listeners types:
        o	Submit - submit the name of the player;
        o	Dropdown - choose the difficulty level of the questions (easy, medium, hard);
        o	Click - registers the choice of category;
    *	Will need to use array iteration to present the questions in the DOM, and to assemble 
the answers.
