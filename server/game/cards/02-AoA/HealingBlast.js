const Card = require('../../Card.js');

class HealingBlast extends Card {
    // Play: Fully heal a creature. If you healed 4 or more damage this way, gain 2A.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                gameAction: ability.actions.heal({ fully: true, upTo: true })
            },
            then: {
                condition: (context) => context.preThenEvent.amount >= 4,
                message: '{0} 获得了额外的2琥珀，通过 {1} 治疗至少4点伤害',
                gameAction: ability.actions.gainAmber({ amount: 2 })
            }
        });
    }
}

HealingBlast.id = 'healing-blast';

module.exports = HealingBlast;
