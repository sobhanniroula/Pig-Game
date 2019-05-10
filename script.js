var scores, currentScore, activePlayer, gamePlaying;


first();


//defining the first function that needs to run when a new game is started
function first() {
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
   
    document.getElementById('player-score-0').textContent = '0';
    document.getElementById('player-score-1').textContent = '0';
    document.getElementById('current-score-0').textContent = '0';
    document.getElementById('current-score-1').textContent = '0';
    
    document.getElementById('player-name-0').textContent = 'Player 1';
    document.getElementById('player-name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-area').classList.remove('winner');
    document.querySelector('.player-1-area').classList.remove('winner');
    document.querySelector('.player-0-area').classList.remove('active');
    document.querySelector('.player-1-area').classList.remove('active');
    document.querySelector('.player-0-area').classList.add('active');

}


// what happens when will click the 'Roll the Dice' button?: 
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Generate Random Number
        var dice = Math.floor(Math.random() * 6) + 1;
        
        // 2. Display the correct dice on the screen
        var diceDisplay = document.querySelector('.dice');
        diceDisplay.style.display = 'block';
        diceDisplay.src = 'img/dice-' + dice + '.png';
        
        // 3. check if the dice roll is 1 or not
        if (dice !== 1) {
            currentScore += dice;
            document.querySelector('#current-score-' + activePlayer).textContent =  currentScore;
        } else {
            // turn for the next player
            nextPlayer();
        } 
    }       
});


// the nextPlayer function goes here:
function nextPlayer() {
    // 1. Change the active player:
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    
    // 2. update the current score:
    currentScore = 0;
    document.getElementById('current-score-0').textContent = '0';
    document.getElementById('current-score-1').textContent = '0';
    
    // 3. change the active class of players area:
    document.querySelector('.player-0-area').classList.toggle('active');
    document.querySelector('.player-1-area').classList.toggle('active');  
    
    // 4. remove the dice display:
    document.querySelector('.dice').style.display = 'none';
}


// what happens when we click the 'Hold the Score' button?:
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. Update the global score of the current player:
        scores[activePlayer] += currentScore;
        
        // 2. Update the UI:
        document.querySelector('#player-score-' + activePlayer).textContent = scores[activePlayer];
    
        // 3. Check if the game has finished or not
        if (scores[activePlayer] >= 100) {
            document.querySelector('.player-' + activePlayer + '-area').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-area').classList.add('winner');
            document.querySelector('#player-name-' + activePlayer).textContent = 'Winner!!';
            document.querySelector('.dice').style.display = 'none';
            gamePlaying = false;
        } else {
            nextPlayer();
        }   
    }
});


// what happens when we click the 'Play a New Game' button?:
document.querySelector('.btn-new').addEventListener('click', first);


// JavaScript codes for modal (pop-up window for rules):
var modal = document.getElementById('myModal');
var modalBtn = document.querySelector('.btn-rules');
var closeModal = document.querySelector('.close');

modalBtn.addEventListener('click', function() {
   modal.style.display = 'block'; 
});
closeModal.addEventListener('click', function() {
   modal.style.display = 'none'; 
});


/*
modalBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
*/