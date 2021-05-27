import isAppropriateMove from './isAppropriateMove.js';
import makeMove from './makeMove.js';

export function twoPlayers(gameState) {
    return function onClickGrid(ev) {
        const targetEl = ev.target;
        const cellCoord = targetEl.dataset.cell;
        if (isAppropriateMove(gameState.field, +cellCoord)) {
            if (gameState.currentMove.name === gameState.players.player1.name) {
                const changeTo = gameState.players.player2;
                makeMove(gameState, targetEl, 1, cellCoord, changeTo);
            } else {
                const changeTo = gameState.players.player1;
                makeMove(gameState, targetEl, 2, cellCoord, changeTo);
            }
        }
    }
}