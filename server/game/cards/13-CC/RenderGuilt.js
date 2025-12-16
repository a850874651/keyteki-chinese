const Card = require('../../Card.js');

class RenderGuilt extends Card {
    // Play: A friendly creature captures 1A. For each A on that creature, deal 1D to a creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'self',
                gameAction: ability.actions.sequential([
                    ability.actions.capture(),
                    ability.actions.allocateDamage((context) => ({
                        numSteps: context.target.amber || 0
                    }))
                ])
            },
            effect:
                '从对手处抢占1琥珀到 {0} 上，并且 {0} 上每有1琥珀对一个生物造成1点伤害'
        });
    }
}

RenderGuilt.id = 'render-guilt';

module.exports = RenderGuilt;
