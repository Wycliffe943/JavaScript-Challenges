//alert('hello Oloo');
//console.log('hello');
// Challenge 1: Age In Days

function ageInDays() {
    var birthYear = prompt('What Year Were You Born');
    var ageInDayss = (2020 - birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDayss + ' days old.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    }

function reset() {
    document.getElementById('ageInDays').remove();
}    

function generateImage(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-img-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);  
}

// Challenge 3: Rock, Paper, Scissors
 function rpsGame(yourChoice) {
     console.log(yourChoice.id);
     var humanChoice, botChoice;
    humanChoice = yourChoice.id; //outputs an id
    botChoice = numberToChoice(randToRpsInt()); //outputs a random id 
    console.log('Computer Choice', botChoice);
    results = decideWinner(humanChoice, botChoice); // [0, 1] human lost, bot won
    console.log(results);
    message = finalMessage(results); // {'message': 'You won!', 'color': 'green'}
    console.log(message);

    rpsFrontEnd(yourChoice.id, botChoice, message);
 }

 function randToRpsInt() {
     return Math.floor(Math.random() * 3);
 }

 function numberToChoice(number) {
     return ['rock', 'paper', 'scissors'][number];
 }

function decideWinner(yourChoice, botChoice) {
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0} //this function needs to return just one number 
    }

    var yourScore = rpsDatabase[yourChoice][botChoice];
    var computerScore = rpsDatabase[botChoice][yourChoice]; //these are numbers found in the database e.g 0.5 and 1 and 0

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if (yourScore === 0) {
        return {'message': 'You lost!', 'color': 'red'};
    } else if (yourScore === 0.5) {
        return {'message': 'You tied!', 'color': 'yellow'};
    } else {
        return {'message': 'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) { 
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src //to recreate id's so as not to refer to ids in html
    } 

    //removing all the images when elements are clicked
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();


    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233,1);'>"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24,1);'>"


    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv); 

}

// Challenge 4: Change Color of All Buttons
var all_buttons = document.getElementsByTagName('button'); //this collects all the buttons in the DOM. They will be in form of an array.

// now we copy all buttons and store them in an array called 'copyAllButtons' using the for loop and push command for the computer to remember their initial state in order to reset later
var copyAllButtons = [];
for (let i=0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1]); //the classList chooses only the color element i.e 'btn-danger' or 'btn-success'
}   

// console.log(copyAllButtons); //shows the classLists of all buttons in the DOM in an array

function buttonColorChange(buttonThingy) {                  //core function where all other functions run
    if (buttonThingy.value === 'red') {
        buttonsRed();
    }else if (buttonThingy.value === 'green') {
        buttonsGreen();
    }else if (buttonThingy.value === 'reset') {
        buttonsColorReset();
    }else if (buttonThingy.value === 'random') {
        randomColors();
    }
}

function buttonsRed(){
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsColorReset() {
    for (let i=0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

    for (let i=0; i < all_buttons.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

//Challenge 5: Blackjack

// This database lists all core components of the game. Makes it easy for reference. 

let blackjackGame = {
    'you': {'scorespan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scorespan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1, 10]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,    //activated to 'true' if you hit the Stand button so that computer can play
    'turnsOver':false,    //activated to 'true' after YOU have clicked both 'Hit' and 'Stand' and computer is done so it can compute results
};

const YOU = blackjackGame['you']                   //to refer to objects inside 'you'
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');


document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);



function blackjackHit() {
    if (blackjackGame['isStand'] === false) { //if the stand mode has not been activated, this is the only time the 'Hit' button should work
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
    
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);     //function that picks out a random card from the deck
    return blackjackGame['cards'][randomIndex];
}


function showCard(card, activePlayer) {                   //function that shows and appends the random card on the YOU or DEALER box
    if (activePlayer['score'] <= 21) {                     //only shows cards when their score is less than 21
        let cardImage = document.createElement('img');
        cardImage.src = `static/images2/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }  
}

function blackjackDeal() {                        //Resets everything to their original values and settings
    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;    //reset Stand button

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
        
        for (i=0; i < yourImages.length; i++) {   // removes images in both boxes after both players have chosen and score has been determined
            yourImages[i].remove();
        }
    
        for (i=0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
    
        YOU['score'] = 0;                                          //resets score to original
        DEALER['score'] = 0;
    
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
    
        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';
    
        document.querySelector('#blackjack-result').textContent = "Let's Play";  //resets the colours to original
        document.querySelector('#blackjack-result').style.color = 'black'; 
        
        blackjackGame['turnsOver'] = true;
    }    
}

    // if adding 11 keeps me below 21, add 11. Otherwise add 1. 'A' can be a 1 or an 11.
function updateScore(card, activePlayer) {  
    if (card === 'A') {
        if (activePlayer['score'] += blackjackGame['cardsMap'][card][1] <= 21) {
        activePlayer['score'] += blackjackGame['cardsMap'][card][1];    
        } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }

        }else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];    
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scorespan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scorespan']).style.color = 'red';
    } else {
    document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {                                        //this function automates the dealer to whip out cards after every second.
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function dealerLogic() {
    blackjackGame['isStand'] = true;

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    blackjackGame['turnsOver'] = true;  
    let winner = computeWinner();
    showResult(winner);
}

// compute winner and return who just won

function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) { //higher score than dealer or when dealer busts
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;

        } else if (YOU['score'] < DEALER['score']) {
            blackjackGame['losses']++;
            winner = DEALER;

        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;

        }
        // condition when user busts but dealer doesn't
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;

        // when you both bust
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        blackjackGame['draws']++;
    }
    console.log('Winner is', winner);
    return winner;
}

function showResult(winner) {
    let winnerMessage, messageColor;

    if (blackjackGame['turnsOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            winnerMessage = 'You won!';
            messageColor = 'green';
            winSound.play();
    
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            winnerMessage = 'You lost!';
            messageColor = 'red';
            lossSound.play();
    
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            winnerMessage = 'You drew!';
            messageColor = 'black';
        }
    
        document.querySelector('#blackjack-result').textContent = winnerMessage;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}