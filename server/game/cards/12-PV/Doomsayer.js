const Card = require('../../Card.js');

class Doomsayer extends Card {
    // After Reap: Move each A from a friendly creature to the common supply. For each A moved, deal 2D to a creature.
    setupCardAbilities(ability) {
        this.reap({
            effect: '移动琥珀从友方生物到公共供应堆，并造成伤害',
            target: {
                controller: 'self',
                location: 'play area',
                cardType: 'creature',
                gameAction: ability.actions.removeAmber({
                    all: true
                })
            },
            then: {
                gameAction: ability.actions.allocateDamage((context) => ({
                    damageStep: 2,
                    numSteps: context.preThenEvent.amount
                }))
            }
        });
    }
}

Doomsayer.id = 'doomsayer';

module.exports = Doomsayer;
