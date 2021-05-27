import isAppropriateMove from './isAppropriateMove.js';
import makeMove from './makeMove.js';

const gridField = document.getElementById('gridField');

export function botMoveHandler(gameState, index) {
    const changeTo = gameState.players.player1;
    makeMove(gameState, gridField.children[index], 2, index, changeTo);
}

export function singlePlayer(gameState) {
    return function onClickGrid(ev) {
        const targetEl = ev.target;
        const cellCoord = targetEl.dataset.cell;

        if (isAppropriateMove(gameState.field, +cellCoord)) {
            const changeTo = gameState.players.player2;
            makeMove(gameState, targetEl, 1, cellCoord, changeTo);
        }
    }
}