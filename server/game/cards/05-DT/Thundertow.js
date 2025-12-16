const Card = require('../../Card.js');

class Thundertow extends Card {
    // Play: Exhaust 2 creatures. Deal 2D to each exhausted creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                mode: 'exactly',
                numCards: 2,
                cardType: 'creature',
                gameAction: ability.actions.exhaust()
            },
            then: {
                alwaysTriggers: true,
                gameAction: ability.actions.dealDamage((context) => ({
                    target: context.game.creaturesInPlay.filter((card) => card.exhausted),
                    amount: 2
                })),
                message: '{0} 使用 {1} 对每个横置生物造成伤害'
            }
        });
    }
}

Thundertow.id = 'thundertow';

module.exports = Thundertow;
