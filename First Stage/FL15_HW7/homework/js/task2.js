const DEFAULT_MAX_PRIZE = 100,
    DEFAULT_MAX_BALL = 8,
    PRIZE_MAGNIFICATION = 2,
    INCREASE_BY = 4,
    DIVIDE_PRIZE_BY = 2;

const play = (maxPrize = DEFAULT_MAX_PRIZE, maxBall = DEFAULT_MAX_BALL, currentTotalPrize = 0) => {

    let attempts = 3;
    let totalPrize = currentTotalPrize;
    let possiblePrize = maxPrize;
    let hiddenNumber = getRandomNumber(0, maxBall);

    for (attempts; attempts > 0; attempts--) {
        let userNumber = parseInt(prompt(
            'Choose a roulette pocket number from 0 to ' + maxBall + '\n' +
            'Attempts left: ' + attempts + '\n' +
            'Total prize: ' + totalPrize + '$\n' +
            'Possible prize on current attempt: ' + possiblePrize + '$\n', ''));
        if (userNumber === hiddenNumber) {
            totalPrize += possiblePrize;
            break;
        } else {
            possiblePrize /= DIVIDE_PRIZE_BY;
        }
    }

    if (!attempts) {
        gameOver(totalPrize);
    } else {
        let resumeGame = confirm('Congratulation, you won! Your prize is: ' +
            totalPrize + '$. Do you want to continue?');
        resumeGame ? play(maxPrize * PRIZE_MAGNIFICATION, maxBall + INCREASE_BY, totalPrize) : gameOver(totalPrize);
    }
};

function gameOver(totalPrize) {
    alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
    let playAgain = confirm('Do you want to play again?');
    if (playAgain) {
        play();
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const startGame = confirm('Do you want to play a game?');
startGame ? play() : alert('You did not become a billionaire, but can');