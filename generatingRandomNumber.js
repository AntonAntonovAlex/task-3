export class GeneratingRandomNumber {
    constructor(min, max) {
        this.randomNumber = this.createRandomNumber(min, max);
    };

    createRandomNumber(min, max) {
        let randNum = min + Math.random() * (max + 1 - min);
        return Math.floor(randNum);
    };
};