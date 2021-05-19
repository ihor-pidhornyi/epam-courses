export default (state, suit1, suit2) => {
    const SUIT1 = 'Rock',
        SUIT2 = 'Paper',
        SUIT3 = 'Scissors';
    let base = `${suit1} vs. ${suit2},`;
    if (suit1 === suit2) {
        return `${base} It's a draw!`;
    }
    if (suit1 === SUIT3 && suit2 === SUIT2 ||
        suit1 === SUIT2 && suit2 === SUIT1 || 
        suit1 === SUIT1 && suit2 === SUIT3) {
        state.firstPlayerWins++;
        return `${base} You've WON!`;
    }
    state.secondPlayerWins++;
    return `${base} You've LOST!`;
}