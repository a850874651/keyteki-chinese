const Card = require('../../Card.js');

class AemberStorm extends Card {
    // Play: For each A in your pool, deal 1 D to an enemy creature.
    setupCardAbilities(ability) {
        this.play({
            effect: '其琥珀池中每有1琥珀，对1个敌方生物造成1点伤害',
            condition: (context) => !!context.player.opponent,
            gameAction: ability.actions.allocateDamage((context) => ({
                controller: 'opponent',
                numSteps: context.player.amber || 0
            }))
        });
    }
}

AemberStorm.id = 'æmber-storm';

module.exports = AemberStorm;
