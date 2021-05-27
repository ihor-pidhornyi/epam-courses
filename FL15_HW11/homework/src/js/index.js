import '../styles/styles.scss'
import startGame from './startGame.js';
import newGame from './newGame.js';
import {
    twoPlayers
} from './twoPlayers.js';
import {
    botMoveHandler,
    singlePlayer
} from './singlePlayer.js';
import reset from './reset.js';
import img from '../assets/tic-tac-toe-logo.png';
import {
    Bot
} from './Bot';

const startGameWrapper = document.getElementById('startGame');
const playBtn = document.getElementById('playBtn');
const selectGame = document.getElementById('selectGame');
const singleForm = document.getElementById('singleForm');
const twoPlayersForm = document.getElementById('twoPlayersForm');
const gridField = document.getElementById('gridField');
const firstPlayer = document.getElementById('firstPlayer');
const firstPlayerScore = document.getElementById('firstPlayerScore');
const secondPlayer = document.getElementById('secondPlayer');
const secondPlayerScore = document.getElementById('secondPlayerScore');
const newGameBtn = document.getElementById('newGameBtn');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');

const logo = document.getElementById('logo');
logo.src = img;

let gameState = {
    mode: 'single',
    field: Array(9).fill(0),
    players: null,
    currentMove: null,
    move: 0
};

let onClickGrid;

export function generateRandomPlayer() {
    const firstMove = Math.floor(Math.random() * 2) === 0 ? 'player1' : 'player2';
    gameState.currentMove = gameState.players[firstMove];
}

export function updateScore() {
    firstPlayerScore.textContent = `Score: ${gameState.players.player1.score}`;
    secondPlayerScore.textContent = `Score: ${gameState.players.player2.score}`;
}

export function updateGameView(winCombination = null) {
    if (!winCombination && gameState.move !== 9) {
        if (gameState.currentMove.name === gameState.players.player1.name) {
            firstPlayer.classList.add('player__name_highlighted')
            secondPlayer.classList.remove('player__name_highlighted');
        } else {
            firstPlayer.classList.remove('player__name_highlighted')
            secondPlayer.classList.add('player__name_highlighted');
        }
    } else if (!winCombination && gameState.move === 9 || winCombination) {
        firstPlayer.classList.remove('player__name_highlighted')
        secondPlayer.classList.remove('player__name_highlighted');
    }
}

export function showMessage(msg) {
    message.textContent = msg;
}

export function singlePlayerHandler() {
    if (gameState.currentMove instanceof Bot) {
        gridField.classList.add('field_disabled')
        setTimeout(() => {
            botMoveHandler(gameState, gameState.currentMove.makeRandomMove(gameState.field));
            updateGameView();
            gridField.classList.remove('field_disabled');
        }, 1000)
    } else {
        gridField.classList.remove('field_disabled');
    }
    onClickGrid = singlePlayer(gameState);
}

selectGame.addEventListener('change', () => {
    const option = selectGame.value;
    if (option === 'two') {
        singleForm.classList.add('fieldset_hidden');
        twoPlayersForm.classList.remove('fieldset_hidden');
        gameState.mode = 'two';
    } else if (option === 'single') {
        singleForm.classList.remove('fieldset_hidden');
        twoPlayersForm.classList.add('fieldset_hidden');
        gameState.mode = 'single';
    }
})

playBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    const players = startGame(selectGame.value);
    if (players) {
        gameState.players = {
            ...players
        };
        generateRandomPlayer();
        updateGameView();
    }
    if (gameState.mode === 'single') {
        singlePlayerHandler();
    } else {
        onClickGrid = twoPlayers(gameState);
    }
    gridField.addEventListener('click', onClickGrid);
});

newGameBtn.addEventListener('click', () => {
    newGame(gameState);
})

resetBtn.addEventListener('click', () => {
    reset(gameState);
})

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        startGameWrapper.classList.add('start-game_visible');
    }, 0)
})