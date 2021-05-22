import '../styles/general.scss'
import '../styles/header.scss'
import '../styles/game.scss'
import logResult from './logResult'
import play from "./play"
import randSuit from "./randomSuitGenerator";
import reset from "./reset"

const gameStatus = {
    roundCount: 1,
    firstPlayerWins: 0,
    secondPlayerWins: 0
}

const buttons = document.getElementsByClassName('game__button');
const resetBtn = document.getElementById('reset');

let timerId;
[...buttons].forEach(btn => {
    btn.addEventListener('click', () => {
        logResult(`Round ${gameStatus.roundCount++}, ${play(gameStatus, btn.dataset.suit, randSuit())}`);
        if(gameStatus.firstPlayerWins === 3 || gameStatus.secondPlayerWins === 3) {
            [...buttons].forEach(el => el.setAttribute('disabled', true))
            timerId = setTimeout(() => {
                const score = `Score ${gameStatus.firstPlayerWins}:${gameStatus.secondPlayerWins}`;
                if(gameStatus.firstPlayerWins > gameStatus.secondPlayerWins) {
                    logResult(`You've WON! ${score}`);
                } else if(gameStatus.firstPlayerWins < gameStatus.secondPlayerWins) {
                    logResult(`You've LOST! ${score}`);
                } else {
                    logResult(`It's a DRAW! ${score}`);
                }
            }, 1500)
        }
    })
})

resetBtn.addEventListener('click', () => {
    clearTimeout(timerId);
    reset(gameStatus);
});