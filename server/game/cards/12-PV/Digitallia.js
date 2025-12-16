const Card = require('../../Card.js');

class Digitallia extends Card {
    // Enhance 1.
    // After Reap: Draw a card for each of Digitallia's Logos neighbors.
    setupCardAbilities(ability) {
        this.reap({
            effect: '每有1个心灵逻机生物抽1张牌',
            gameAction: ability.actions.draw((context) => ({
                amount: context.source.neighbors.filter((card) => card.hasHouse('logos')).length
            }))
        });
    }
}

Digitallia.id = 'digitallia';

module.exports = Digitallia;
