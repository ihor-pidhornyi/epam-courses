import {
    showMessage,
    updateGameView,
    updateScore
} from ".";
import {
    Bot
} from "./Bot";
import checkForWinner from "./checkForWinner";
import drawWinLine from "./drawWinLine";
import {
    botMoveHandler
} from "./singlePlayer";

const gridField = document.getElementById('gridField');

export default (gameState, container, number, index, changeTo) => {
    const currentMove = gameState.currentMove;
    container.textContent = gameState.currentMove.markType;
    gameState.currentMove = changeTo;
    gameState.field[index] = number;
    gameState.move++;

    let winCombination = checkForWinner(gameState.field, number);
    if (winCombination) {
        currentMove.increaseScore();
        drawWinLine(winCombination);
        updateScore();
        showMessage(`${currentMove.name} wins!`);
    } else if (!winCombination && gameState.move === 9) {
        gameState.players.player1.increaseScore();
        gameState.players.player2.increaseScore();
        updateScore();
        showMessage(`Draw!`);
    } else if (gameState.currentMove instanceof Bot) {
        gridField.classList.add('field_disabled');
        const delay = Math.random() * 1000 + 1000;
        setTimeout(() => {
            botMoveHandler(gameState, gameState.currentMove.makeRandomMove(gameState.field));
            gridField.classList.remove('field_disabled');
        }, delay);
    }
    updateGameView(winCombination);
}