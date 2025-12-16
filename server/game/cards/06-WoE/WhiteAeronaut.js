const Card = require('../../Card.js');

class WhiteAeronaut extends Card {
    // Action: Ward and fully heal a friendly Nautilixian.
    setupCardAbilities(ability) {
        this.action({
            effect: '界护并治疗1个友方机甲鹦鹉螺',
            target: {
                controller: 'self',
                cardCondition: (card) => card.name === 'Nautilixian',
                gameAction: ability.actions.sequential([
                    ability.actions.heal({ fully: true }),
                    ability.actions.ward()
                ])
            }
        });
    }
}

WhiteAeronaut.id = 'white-aeronaut';

module.exports = WhiteAeronaut;
