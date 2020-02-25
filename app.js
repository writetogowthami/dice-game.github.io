var scores, roundScore, activePlayer, gamePlaying;
init(); //Resets all counters
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // Random number when a dice rolls
        var dice = Math.floor(Math.random() * 6) + 1;
        //Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        //Updating the round score if the rolled number is NOT a 1
        if (dice !== 1) {
            roundScore += dice; //Add score
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            alert("Dice rolled a 1, missed your chance!!")
            nextPlayer(); //Next player
        }
    }    
});
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;// Add CURRENT score to GLOBAL score
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; // Update the UI
        var input = document.querySelector('.final-score').value;
        var winningScore;
        // Undefined, 0, null or "" are COERCED to false. Everything else is COERCED to true
        if(input) {
            winningScore = input;
        } else {
            winningScore = 20;
        }
        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            var show= parseInt(activePlayer)+1;
            alert('Player '+show+' is the Winner!!');

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('animated', 'flipOutX'); //Callback
        } else {
            nextPlayer(); //Next player
        }
    }
});
function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}
document.querySelector('.btn-new').addEventListener('click', init);
function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
/* Change the game with below rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.) */
