
const computerChoiceDisplay = document.getElementById('computer-choice')
const userChoiceDisplay = document.getElementById('user-choice')
const resultDisplay = document.getElementById('result')
const possibleChoices = document.querySelectorAll('button')
let userChoice
let computerChoice
let result

possibleChoices.forEach(possibleChoice => possibleChoice.addEventListener('click', (e) => {
  userChoice = e.target.id
  userChoiceDisplay.innerHTML = userChoice
  generateComputerChoice()
  getResult()
}))

function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3) + 1 // or you can use possibleChoices.length
  
  if (randomNumber === 1) {
    computerChoice = 'rock'
  }
  if (randomNumber === 2) {
    computerChoice = 'scissors'
  }
  if (randomNumber === 3) {
    computerChoice = 'paper'
  }
  computerChoiceDisplay.innerHTML = computerChoice
}
let x=0,y=0;
function getResult() 
{
  if (computerChoice === userChoice) {
    result = 'its a draw!'
  }
  if (computerChoice === 'rock' && userChoice === "paper") {
    result = 'you win!';
    x=x+1;
    document.getElementById('user-score').innerHTML=x;
  }
  if (computerChoice === 'rock' && userChoice === "scissors") {
    result = 'you lost!';
     y+=1;
    document.getElementById('computer-score').innerHTML=y;
    
  }
  if (computerChoice === 'paper' && userChoice === "scissors") {
    result = 'you win!';
     x++;
    document.getElementById('user-score').innerHTML=x;
  }
  if (computerChoice === 'paper' && userChoice === "rock") {
    result = 'you lose!';
      y++;
    document.getElementById('computer-score').innerHTML=y;
  }
  if (computerChoice === 'scissors' && userChoice === "rock") {
    result = 'you win!';
     x++;
    document.getElementById('user-score').innerHTML=x;;
  }
  if (computerChoice === 'scissors' && userChoice === "paper") {
    result = 'you lose!';
    y+=1;
    document.getElementById('computer-score').innerHTML=y;
  }
  resultDisplay.innerHTML = result
}
