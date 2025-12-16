const Card = require('../../Card.js');

class Kharisma extends Card {
    // After Reap: Return another friendly creature to its owner's
    // hand. If you do, make a token creature.
    setupCardAbilities(ability) {
        this.reap({
            target: {
                cardType: 'creature',
                controller: 'self',
                cardCondition: (card, context) => card !== context.source,
                gameAction: ability.actions.returnToHand()
            },
            then: {
                gameAction: ability.actions.makeTokenCreature(),
                message: '{0} 使用 {1} 制造1个代标生物'
            }
        });
    }
}

Kharisma.id = 'kharisma';

module.exports = Kharisma;
