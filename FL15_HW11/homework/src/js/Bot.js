import checkForWinner from "./checkForWinner";
import {
    Player
} from "./Player";

export class Bot extends Player {
    static names = ['John', 'Van', 'Billy', 'Markus', 'Gregory', 'Egor']

    constructor(markType) {
        const randomName = Bot.names[Math.floor(Math.random() * Bot.names.length)];
        super(`Bot ${randomName}`, markType);
    }

    _canWin(field) {
        for(let i = 0; i < field.length; i++) {
            if (field[i] === 0) {
                const nextMoveCopy = [...field];
                nextMoveCopy[i] = 2;
                let winCombination = checkForWinner(nextMoveCopy, 2);
                if (winCombination) {
                    return i;
                }
            }
        }
        return null;
    }

    _blockPlayerWin(field) {
        for(let i = 0; i < field.length; i++) {
            if (field[i] === 0) {
                const nextMoveCopy = [...field];
                nextMoveCopy[i] = 1;
                let winCombination = checkForWinner(nextMoveCopy, 1);
                if (winCombination) {
                    return i;
                }
            }
        }
        return null;
    }

    makeRandomMove(field) {
        const attemptToWin = this._canWin(field);
        if(attemptToWin !== null) {
            return attemptToWin;
        }
        const attemptToBlock = this._blockPlayerWin(field);
        if (attemptToBlock !== null) {
            return attemptToBlock;
        }
        let randIndex
        do {
            randIndex = Math.floor(Math.random() * 9);
        } while (field[randIndex] !== 0);
        return randIndex;
    }
}