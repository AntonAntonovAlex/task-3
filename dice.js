import { input } from '@inquirer/prompts';

export class Dice {
    constructor(diceArr) {
        this.diceArr = diceArr.map((diceValues) => diceValues.split(','));
        this.errorMessage = '';
    };

    async checkValues() {
        if (this.isInvalid()) {
            let answer = await input({ message: this.errorMessage});
            this.diceArr = answer.split(' ').map((diceValues) => diceValues.split(','));
            this.checkValues();
            return;
        };
    };

    isInvalid() {
        if (this.diceArr.length < 3) {
            this.errorMessage = 'Please enter the values ​​of three or more cubes:';
            return true;
        };
        if (this.diceArr.some((dice) => dice.length < 6)) {
            this.errorMessage = 'The number of dice values ​​must be equal to "6". \n Please enter the correct value:';
            return true;
        };
        if (this.diceArr.some((dice) => dice.some((val) => val <= 0 || val % 1 != 0 || val > 12))) {
           this.errorMessage = 'Values ​​must be integers in the range "1..12". \n Please enter the correct value:';
           return true;
        };
        this.errorMessage = '';
        return false;
    };
};