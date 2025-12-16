const Card = require('../../Card.js');

class RufusVergilius extends Card {
    // After Reap: A neighboring creature captures 1. Ward that creature.
    setupCardAbilities(ability) {
        this.reap({
            target: {
                cardType: 'creature',
                cardCondition: (card, context) => context.source.neighbors.includes(card),
                gameAction: [ability.actions.capture(), ability.actions.ward()]
            },
            effect: '抢占 1 琥珀到 {1} 上并界护它',
            effectArgs: (context) => [context.target]
        });
    }
}

RufusVergilius.id = 'rufus-vergilius';

module.exports = RufusVergilius;
