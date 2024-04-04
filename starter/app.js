/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1 three times their turn is over, and for each 1 roll all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game j

*/

let scores, roundScore, activePlayer, notActive, dice, dice1, gamePlaying, win, globalScore, strikeCheck; 

// Starts the game
init();

let dialog = document.querySelector('dialog');

const openRules = () => {
  dialog.showModal();
}

const closeRules = () => {
  dialog.close();
}

document.querySelector('.btn-roll').addEventListener('click', function () {
    if(gamePlaying){
      // 1. Random Number (side note: the reason you add 1 is because random generator would generate values from 0 - 5)
      dice = Math.floor(Math.random() * 6) + 1;
      dice1 = Math.floor(Math.random() * 6) + 1;
      // 2. Display the result
        let diceDOM = document.querySelector('.dice');
          diceDOM.style.display = 'block'; 
            
        let diceDOM0 = document.querySelector('.dice-0');
        let diceDOM1 = document.querySelector('.dice-1');
        let snake = document.querySelector('.snake');
        let strikes = document.querySelector('.strikes-' + activePlayer);
          
        
        diceDOM0.src = `dice-${dice}.png`;
            
        
        diceDOM1.src = `dice-${dice1}.png`;
          
        
        
      // 3. Update the round score IF the rolled number was NOT a 1 or two 6's
        

            
    if(dice !== 1 && dice1 !== 1){
               // Add score
        roundScore += (dice + dice1);
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else if((dice === 1 && dice1 !== 1) || (dice !== 1 && dice1 === 1)){
              // Reset current score to zero if one of the dice is 1
            roundScore = 0;
            
            strikes.textContent += `X `;
            strikeCheck++;
            
            if(strikeCheck === 3){
              strikes.textContent = "Busted!";
              scores[activePlayer] = 0;
              gamePlaying = false;
              document.querySelector('#score-' + activePlayer).textContent = '0';
              setTimeout(nextPlayer, 1000);

            }
            document.querySelector('#current-' + activePlayer).textContent = '0';
    } else if(dice === 1 && dice1 === 1){
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = '0';
                snake.style.display = 'block';
                gamePlaying = false;

                setTimeout(nextPlayer, 1000);
    } else {
                // Next player
        
                nextPlayer();      
                      }
    }
  

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gamePlaying) {
      // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    
    
    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    // Check if player won the game
    if (scores[activePlayer] >= win) {
        
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!!!';
        
        document.querySelector('#name-' + notActive).textContent = 'Unlucky...';
        
        document.querySelector('.dice').style.display = 'none';
        
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
            
    } else {
        //Next Player
        nextPlayer();
        
    };  
  }; 
    
    
});


 

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    activePlayer === 0 ? notActive = 1 : notActive = 0;
    
    roundScore = 0;
    strikeCheck = 0;
    gamePlaying = true;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';  
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    //document.querySelector('.player-0-panel').classList.remove('active');
    
    //document.querySelector('.player-1-panel').classList.add('active');
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.snake').style.display = 'none';
    document.querySelector('.strikes-' + notActive).textContent = '';
    
}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    notActive = 1;
    strikeCheck = 0;
    gamePlaying = true;
    newEndScore();
    
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.snake').style.display = 'none';
    document.querySelector('.strikes-' + activePlayer).textContent = "";
    document.querySelector('.strikes-' + notActive).textContent = "";
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('score').textContent = win;

    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
} 


function newEndScore() {
    // Change the goal score
  let x = document.getElementById("mySelect").selectedIndex;
  win = document.getElementsByTagName("option")[x].value;
}



/**********************************
// Use innerHTML to use html syntax to alter information within a js document, similar to how the "<script> </script>" tags work

document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
*/

//let x = document.querySelector('#score-0').textContent;














































