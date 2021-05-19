export default (state) => {
    const buttons = document.getElementsByClassName('game__button');
    const container = document.getElementById('message');
    [...buttons].forEach(btn => btn.removeAttribute('disabled'));
    container.textContent = '';
    state.roundCount = 1;
    state.firstPlayerWins = 0;
    state.secondPlayerWins = 0;
}