import { Dice } from "./dice.js";
import { Game } from "./game.js";

const diceArr = process.argv.slice(2);
let dice = new Dice(diceArr);
await dice.checkValues();
let game = new Game(dice.diceArr);
await game.defineWhoGoesFirst();
await game.rollDice();
game.calculatResults();