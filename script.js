let randomNumber=parseInt(Math.random()*100+1);
const userInput=document.querySelector('#guess-input');
const submit=document.querySelector('#guess-btn');
const guessSlot=document.querySelector('.guesses');
const remaining=document.querySelector('#attempts-left');
const attempted=document.querySelector('#attempts-used');
const lowOrHi=document.querySelector('.lowOrHi');

let playGame=true;
let numGuess=0;
let prevGuess=[];

if(playGame){
    submit.addEventListener('click',function(e){
        e.preventDefault();
        const guess=parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid number');

    }else if(guess<1){
        alert('Please enter a number greater than 1');
    }else if(guess>100){
        alert('Please enter a number less than 100');
    }else{
        prevGuess.push(guess);
        if(numGuess===9){
            displayGuess(guess);
            displayMessage(`Game Over! The number was ${randomNumber}`);
            endGame();
        }else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    if(guess===randomNumber){
        displayMessage(`You guessed it right in ${numGuess} guesses`);
        endGame();
    }else if(guess<randomNumber){
        displayMessage(`Guess Higher!`);
    }else if(guess>randomNumber){
        displayMessage(`Guess Lower!`);
    }
}

function displayGuess(guess){
    if(numGuess==0) guessSlot.innerHTML='';
    userInput.value='';
    guessSlot.innerHTML+=`${guess}, `;
    numGuess++;
    remaining.innerHTML=`${10-numGuess} `;
    attempted.innerHTML=`${numGuess} `;

}

function displayMessage(message){
    lowOrHi.innerHTML=`<h2>${message}</h2>`;
}

function endGame(){
    userInput.value='';
    userInput.setAttribute('disabled','');
    playGame=false;
    
}
newGame();

function newGame(){
    const newGameButton=document.querySelector('#reset-btn');
    newGameButton.addEventListener('click',function(e){
        randomNumber=parseInt(Math.random()*100+1);
        prevGuess=[];
        numGuess=1;
        guessSlot.innerHTML='';
        remaining.innerHTML=10;
        attempted.innerHTML=0;
        lowOrHi.innerHTML='';
        userInput.value='';
        userInput.removeAttribute('disabled');
        displayMessage('Enter your first guess...');

        playGame=true;
    })
}
