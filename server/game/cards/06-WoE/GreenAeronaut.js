const Card = require('../../Card.js');

class GreenAeronaut extends Card {
    // Action: A friendly Nautilixian gains Splash-attack 3 for the
    // remainder of the turn.
    setupCardAbilities(ability) {
        this.action({
            effect: '在本回合剩余时间内，1个友方机甲鹦鹉螺获得溅射3',
            target: {
                controller: 'self',
                cardCondition: (card) => card.name === 'Nautilixian',
                gameAction: ability.actions.cardLastingEffect({
                    duration: 'untilPlayerTurnEnd',
                    effect: ability.effects.addKeyword({ 'splash-attack': 3 })
                })
            }
        });
    }
}

GreenAeronaut.id = 'green-aeronaut';

module.exports = GreenAeronaut;
