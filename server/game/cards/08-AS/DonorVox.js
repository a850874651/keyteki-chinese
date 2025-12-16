const Card = require('../../Card.js');

class DonorVox extends Card {
    // Scrap: Give a friendly Mars creature two +1 power counters.
    setupCardAbilities(ability) {
        this.scrap({
            target: {
                cardCondition: (card) => card.hasHouse('mars'),
                cardType: 'creature',
                controller: 'self',
                gameAction: ability.actions.addPowerCounter({ amount: 2 })
            },
            effect: '给与 {0} 2个+1力量指示物'
        });
    }
}

DonorVox.id = 'donor-vox';

module.exports = DonorVox;
