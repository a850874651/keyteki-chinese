const Card = require('../../Card.js');

class Commune extends Card {
    // Omega. (After you play this card, end this step.)
    // Play: Lose all of your A. Gain 4A.
    setupCardAbilities(ability) {
        this.play({
            message: '{0} 使用 {1} 失去全部 {2} 琥珀并获得4琥珀',
            messageArgs: (context) => [context.player, context.source, context.player.amber],
            gameAction: ability.actions.sequential([
                ability.actions.loseAmber((context) => ({
                    amount: context.player.amber,
                    target: context.player
                })),
                ability.actions.gainAmber({ amount: 4 })
            ])
        });
    }
}

Commune.id = 'commune';

module.exports = Commune;
