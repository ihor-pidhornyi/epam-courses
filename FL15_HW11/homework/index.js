const isEquals = (a, b) => a === b;
const isBigger = (a, b) => a > b;
const storeNames = (...names) => names;
const getDifference = (a, b) => a > b ? a - b : b - a;
const negativeCount = arr => arr.reduce((acc, cur) => acc + (cur < 0 ? 1 : 0), 0);
const letterCount = (str, letter) => str.length - str.toLowerCase().split(letter.toLowerCase()).join('').length;
const countPoints = arr => {
    const POINTS_FOR_WIN = 3;
    return arr.reduce((acc, cur) => {
        const [our, enemy] = cur.split(':').map(el => Number(el));
        if (our > enemy) {
            return acc + POINTS_FOR_WIN;
        } else if (our === enemy) {
            return acc + 1;
        } else {
            return acc + 0;
        }
    }, 0);
}