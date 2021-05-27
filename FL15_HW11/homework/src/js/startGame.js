import {
    Bot
} from "./Bot";
import {
    Player
} from "./Player";

const game = document.getElementById('game');
const startGame = document.getElementById('startGame');
const firstPlayer = document.getElementById('firstPlayer');
const firstPlayerScore = document.getElementById('firstPlayerScore');
const secondPlayer = document.getElementById('secondPlayer');
const secondPlayerScore = document.getElementById('secondPlayerScore');

function launchGame(player1, player2) {
    firstPlayer.textContent = 'Player 1: ' + player1.name;
    firstPlayerScore.textContent = 'Score: ' + player1.score;
    secondPlayer.textContent = 'Player 2: ' + player2.name;
    secondPlayerScore.textContent = 'Score: ' + player2.score;
    game.classList.remove('game_hidden');
    startGame.classList.add('start-game_hidden');
}

export default (option) => {
    if (option === 'single') {
        const playerNameSingle = document.getElementById('playerNameSingle').value;
        if (playerNameSingle.trim()) {
            const player = new Player(playerNameSingle, 'X');
            const bot = new Bot('O');
            launchGame(player, bot);
            return {
                player1: player,
                player2: bot
            }
        }
    } else if (option === 'two') {
        const firstPlayerName = document.getElementById('firstPlayerName').value;
        const secondPlayerName = document.getElementById('secondPlayerName').value;
        if (firstPlayerName.trim() && secondPlayerName.trim()) {
            const player1 = new Player(firstPlayerName, 'X');
            const player2 = new Player(secondPlayerName, 'O');
            launchGame(player1, player2)
            return {
                player1,
                player2
            }
        }
    }
}