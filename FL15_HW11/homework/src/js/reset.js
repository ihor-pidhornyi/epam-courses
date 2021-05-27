import newGame from './newGame.js';
import {updateScore} from './index.js'

export default (gameState) => {
    newGame(gameState);
    gameState.players.player1.score = 0;
    gameState.players.player2.score = 0;
    updateScore();
}