const Card = require('../../Card.js');

class PrinceBufo extends Card {
    // Fate: Your opponent forges a key at current cost.
    setupCardAbilities(ability) {
        this.fate({
            effect: '以当前费用锻造1把钥匙',
            effectArgs: (context) => context.game.activePlayer.opponent,
            gameAction: ability.actions.forgeKey((context) => ({
                player: context.game.activePlayer.opponent
            }))
        });
    }
}

PrinceBufo.id = 'prince-bufo';

module.exports = PrinceBufo;
