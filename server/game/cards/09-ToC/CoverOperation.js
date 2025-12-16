const Card = require('../../Card.js');

class CoverOperation extends Card {
    // Play: Make a token creature, then ready it.
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.makeTokenCreature(),
            effect: '制造1个代标生物并重整它',
            then: {
                gameAction: ability.actions.ready((context) => ({
                    target: context.preThenEvent.card
                }))
            }
        });
    }
}

CoverOperation.id = 'cover-operation';

module.exports = CoverOperation;
