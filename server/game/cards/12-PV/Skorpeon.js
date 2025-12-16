const Card = require('../../Card.js');

class Skorpeon extends Card {
    // Enhance .
    // After Reap: Deal 2 to an enemy creature for each of Skorpeon's Dis neighbors.
    setupCardAbilities(ability) {
        this.reap({
            gameAction: ability.actions.allocateDamage((context) => ({
                controller: 'opponent',
                numSteps: context.source.neighbors.filter((card) => card.hasHouse('dis')).length,
                damageStep: 2
            })),
            effect: '造成 2 点伤害对1个敌方生物 {1} 次{2}',
            effectArgs: (context) => [
                context.source.neighbors.filter((card) => card.hasHouse('dis')).length,
                context.source.neighbors.filter((card) => card.hasHouse('dis')).length === 1
                    ? ''
                    : ''
            ]
        });
    }
}

Skorpeon.id = 'skorpeon';

module.exports = Skorpeon;
