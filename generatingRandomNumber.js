import { randomInt } from 'crypto';

export class GeneratingRandomNumber {
    constructor(min, max) {
        this.randomNumber = this.createRandomNumber(min, max);
    };

    createRandomNumber(min, max) {
        return randomInt(min, max + 1);
    };
};