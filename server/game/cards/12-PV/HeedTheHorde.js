const Card = require('../../Card.js');

class HeedTheHorde extends Card {
    // Play: For each friendly Mutant creature, your opponent loses 1.
    // Fate: Each enemy Mutant creature captures 1.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.loseAmber((context) => ({
                target: context.player.opponent,
                amount: context.player.creaturesInPlay.filter((card) => card.hasTrait('mutant'))
                    .length
            }))
        });

        this.fate({
            gameAction: ability.actions.capture((context) => ({
                target: context.game.activePlayer.opponent.creaturesInPlay.filter((card) =>
                    card.hasTrait('mutant')
                )
            })),
            effect: '抢占 1 琥珀到 {1} 上',
            effectArgs: (context) => [
                context.game.activePlayer.opponent.creaturesInPlay.filter((card) =>
                    card.hasTrait('mutant')
                )
            ]
        });
    }
}

HeedTheHorde.id = 'heed-the-horde';

module.exports = HeedTheHorde;
