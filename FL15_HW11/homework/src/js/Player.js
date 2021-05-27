export class Player {

    constructor(name, markType) {
        this.name = name;
        this.score = 0;
        this.markType = markType
    }
    
    increaseScore(score = 1) {
        this.score += score;
    }
}