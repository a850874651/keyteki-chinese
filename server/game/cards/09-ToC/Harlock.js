const Card = require('../../Card.js');

class Harlock extends Card {
    // After Fight: If the creature Harlock fought was destroyed, make
    // a token creature.
    setupCardAbilities(ability) {
        this.fight({
            condition: (context) =>
                context.event.destroyed &&
                context.event.destroyed.includes(context.event.attackerTarget),
            gameAction: ability.actions.makeTokenCreature(),
            effect: '制造1个代标生物'
        });
    }
}

Harlock.id = 'harlock';

module.exports = Harlock;
