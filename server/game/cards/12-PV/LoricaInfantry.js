const Card = require('../../Card.js');

class LoricaInfantry extends Card {
    // After Fight: You may exalt Lorica Infantry. If you do, your opponent loses 2.
    setupCardAbilities(ability) {
        this.fight({
            optional: true,
            gameAction: ability.actions.exalt(),
            then: {
                message: '{0} 使用 {1} 使 {3} 失去2琥珀',
                messageArgs: (context) => [context.player.opponent],
                gameAction: ability.actions.loseAmber((context) => ({
                    target: context.player.opponent,
                    amount: 2
                }))
            }
        });
    }
}

LoricaInfantry.id = 'lorica-infantry';

module.exports = LoricaInfantry;
