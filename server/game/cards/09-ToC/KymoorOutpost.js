const Card = require('../../Card.js');

class KymoorOutpost extends Card {
    // Action: Put a friendly creature on the bottom of its owner's deck.
    // If you do, steal 1A and make a token creature.
    setupCardAbilities(ability) {
        this.action({
            target: {
                cardType: 'creature',
                controller: 'self',
                gameAction: ability.actions.returnToDeck({ bottom: true })
            },
            then: {
                gameAction: [ability.actions.steal(), ability.actions.makeTokenCreature()],
                message: '{0} 使用 {1} 窃取1琥珀并制造1个代标生物'
            }
        });
    }
}

KymoorOutpost.id = 'kymoor-outpost';

module.exports = KymoorOutpost;
