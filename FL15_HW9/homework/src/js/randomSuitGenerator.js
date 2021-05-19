export default () => {
    const SUITS = ['Rock', 'Paper', 'Scissors'];
    return SUITS[Math.floor(Math.random() * SUITS.length)];
}