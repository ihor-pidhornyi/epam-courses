import {generateRandomPlayer, showMessage, singlePlayerHandler, updateGameView} from './index.js';
const lineDrawer = document.getElementById('lineDrawer');
const gridField = document.getElementById('gridField');
export default (gameState) => {
    const context = lineDrawer.getContext('2d');
    context.clearRect(0, 0, lineDrawer.width, lineDrawer.height);
    gameState.field = Array(9).fill(0);
    gameState.move = 0; 
    generateRandomPlayer();
    [...gridField.children].forEach(child => child.textContent = '');
    lineDrawer.style.zIndex = -1;
    if(gameState.mode === 'single') {
        singlePlayerHandler();
    }
    showMessage('');
    updateGameView();
}