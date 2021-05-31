const getBiggestNumber = (...args) => {
    const MIN_ARGS = 2;
    const MAX_ARGS = 10;
    if (args.length > MAX_ARGS) {
        throw new Error('Too many arguments');
    }
    if (args.length < MIN_ARGS) {
        throw new Error('Not enough arguments');
    }
    if (args.some(number => typeof number !== 'number')) {
        throw new Error('Wrong argument type')
    }
    return Math.max(...args);
}
module.exports = getBiggestNumber;