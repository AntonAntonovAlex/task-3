import AsciiTable from 'ascii-table';
import { ProbabilityCalculation } from './probabilityCalculation.js';
import chalk from 'chalk';

export class TableProbability {
    constructor(diceValues) {
        this.diceValues = diceValues;
        this.probabilityCalculation = new ProbabilityCalculation();
        this.table = new AsciiTable('Probability of the win for the user:');
        this.table.setHeading('User dice v', `${diceValues[0]}`, `${diceValues[1]}`, `${diceValues[2]}`);
        this.diceValues.map((diceValue) => this.table.addRow(this.getRowValue(diceValue)));
    };

    generateProbability(firstValue, secondValue) {
        return this.probabilityCalculation.getProbability(firstValue, secondValue);
    };

    getRowValue(diceValue) {
        return [diceValue, ...this.diceValues.map(value=>this.generateProbability(diceValue, value))];
    };

    showTable() {
        console.log(chalk.greenBright(`The player can play a general non-transitive dice game. \nUsers specify which dice they want to use. \nThe basic idea is that the dice can be non-transitive \n(the second die wins against the first, the third wins against the second, but the third loses to the first). \nNo dice can be hard-coded into the code; the dice are passed as arguments.`));
        console.log(this.table.toString());
    };
};