const Card = require('../../Card.js');

class LongusaurLector extends Card {
    // Play/After Reap: You may exalt Longusaur Lector. If you do, make a token creature.
    setupCardAbilities(ability) {
        this.play({
            reap: true,
            optional: true,
            gameAction: ability.actions.exalt(),
            then: {
                gameAction: ability.actions.makeTokenCreature(),
                message: '{0} 使用 {1} 制造1个代标生物'
            }
        });
    }
}

LongusaurLector.id = 'longusaur-lector';

module.exports = LongusaurLector;
