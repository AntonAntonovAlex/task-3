const THROWS_SUM = 36;

export class ProbabilityCalculation {
    getProbability(firstDice, secondDice) {
        if (firstDice == secondDice) return '- (0.5)';
        const numberFavorableOutcomes = firstDice.reduce((acc, firstValue) => acc + secondDice.filter(secondValue => secondValue < firstValue).length, 0);
        return (numberFavorableOutcomes / THROWS_SUM).toFixed(4);
    };
};