const Card = require('../../Card.js');

class EnergyVampirism extends Card {
    // Play: A creature captures 1 A from its own side. For each A on
    // that creature, deal 1 D to a creature.
    setupCardAbilities(ability) {
        this.play({
            target: {
                cardType: 'creature',
                controller: 'any',
                gameAction: ability.actions.sequential([
                    ability.actions.capture((context) => ({
                        amount: 1,
                        player: context.target && context.target.controller
                    })),
                    ability.actions.allocateDamage((context) => ({
                        numSteps: (context.target && context.target.amber) || 0
                    }))
                ])
            },
            effect:
                '从其控制方抢占1琥珀到 {0} 上，每有1个琥珀在 {0} 上，对1个生物造成1点伤害'
        });
    }
}

EnergyVampirism.id = 'energy-vampirism';

module.exports = EnergyVampirism;
