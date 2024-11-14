import { input } from '@inquirer/prompts';
import { GeneratingHmac } from "./generatingHmac.js";
import { GeneratingRandomNumber } from './generatingRandomNumber.js';
import chalk from 'chalk';
import { TableProbability } from "./tableProbability.js";

export class Game {
    constructor(diceValues) {
        this.generatingHmac = new GeneratingHmac(0,1);
        this.diceValues = diceValues;
        this.computerDice = [];
        this.userDice = [];
        this.input = 0;
        this.computerMoveResult = 0;
        this.userMoveResult = 0;
        this.isComputerGoesFirst = false;
        this.tableProbability = new TableProbability(this.diceValues);
    };

    async defineWhoGoesFirst() {
        console.log(`Let's determine who makes the first move.`);
        console.log(`I selected a random value in the range 0..1 (HMAC=${this.generatingHmac.hmac}).`);
        console.log('Try to guess my selection.');
        console.log('0 - 0');
        console.log('1 - 1');
        await this.getUserInput();
        this.isComputerGoesFirst = (this.input != this.generatingHmac.randomNumber);
        console.log(`My selection: ${this.generatingHmac.randomNumber} (KEY=${this.generatingHmac.key}).`);
        const randomNumber = new GeneratingRandomNumber(0, this.diceValues.length-1).randomNumber;
        if (this.isComputerGoesFirst) {
            this.computerDice = this.diceValues[randomNumber];
            this.diceValues = [...this.diceValues.slice(0, randomNumber), ...this.diceValues.slice(randomNumber + 1)];
            console.log(`I make the first move and choose the [${this.computerDice}] dice.`);
        };
        console.log('Choose your dice:');
        this.diceValues.forEach((dice, index) => console.log(`${index} - ${dice}`));
        await this.getUserInput();
        this.userDice = this.diceValues[this.input];
        console.log(`You choose the [${this.userDice}] dice.`);
        if (!this.isComputerGoesFirst) {
            this.computerDice = this.diceValues[randomNumber];
            console.log(`I choose the [${this.computerDice}] dice.`);
        };
    };

    async makeMove(isComputer) {
        const { key: randomKey, randomNumber: randomNumber, hmac: randomHmac } = new GeneratingHmac(0,5);
        console.log(`It's time for ${isComputer ? 'my' : 'your'} throw.`);
        console.log(`I selected a random value in the range 0..5 (HMAC=${randomHmac}).`);
        console.log('Add your number modulo 6.');
        for (let i = 0; i <=  5; i++) {
            console.log(`${i} - ${i}`);
        };
        await this.getUserInput();
        const result = (+this.input + +randomNumber) % 6;
        console.log(`My number is: ${randomNumber} (KEY=${randomKey}).`);
        console.log(`The result is ${this.input} + ${randomNumber} = ${result} (mod 6).`);
        if (isComputer) {
            this.computerMoveResult = this.computerDice[result];
        } else this.userMoveResult = this.userDice[result];
        console.log(`${isComputer ? 'My' : 'Your'} throw is ${isComputer ? this.computerMoveResult : this.userMoveResult}.`);
    };

    async rollDice() {
        await this.makeMove(this.isComputerGoesFirst);
        await this.makeMove(!this.isComputerGoesFirst);
    };

    calculatResults() {
        if (this.computerMoveResult > this.userMoveResult) {
            console.log(chalk.red(`You lost (${this.userMoveResult} < ${this.computerMoveResult})!`));
            return;
        };
        if (this.computerMoveResult < this.userMoveResult) {
            console.log(chalk.green(`You win (${this.userMoveResult} > ${this.computerMoveResult})!`));
            return;
        };
        console.log(chalk.yellow(`Draw (${this.userMoveResult} = ${this.computerMoveResult})!`));
    };

    checkAnswer() {
        if (this.input.toUpperCase() == 'X') {
            process.exit();
        };
        if (this.input == '?') {
            this.tableProbability.showTable();
            process.exit();
        };
    };

    async getUserInput() {
        console.log('X - exit');
        console.log('? - help');
        this.input = await input({ message: 'Your selection:'});
        this.checkAnswer();
    };
};