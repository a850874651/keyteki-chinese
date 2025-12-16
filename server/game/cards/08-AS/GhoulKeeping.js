const Card = require('../../Card.js');

class GhoulKeeping extends Card {
    // Play: Ready a friendly Geistoid creature.
    setupCardAbilities(ability) {
        this.play({
            effect: '重整1个友方灵鬼生物',
            target: {
                controller: 'self',
                cardType: 'creature',
                cardCondition: (card) => card.hasHouse('geistoid'),
                gameAction: ability.actions.ready()
            }
        });
    }
}

GhoulKeeping.id = 'ghoul-keeping';

module.exports = GhoulKeeping;
