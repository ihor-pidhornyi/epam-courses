const getBiggestNumber = require('../src/get-bigest-number.js')

describe('Get the biggest number', () => {

    it('shoud return 5', () => {
        const value = getBiggestNumber(2, 5);

        expect(value).toBe(5);
    })
    it('should throw not enough arguments error', () => {
        expect(() => getBiggestNumber()).toThrow(new Error('Not enough arguments'));
    })
    it('should throw wrong argument type error', () => {
        expect(() => getBiggestNumber('wrong argument type', 'another one')).toThrow(new Error('Wrong argument type'));
    })
    it('should throw too many arguments error', () => {
        expect(() => getBiggestNumber(0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55)).toThrow(new Error('Too many arguments'));
    })
})