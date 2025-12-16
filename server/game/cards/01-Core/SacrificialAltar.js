const Card = require('../../Card.js');

class SacrificialAltar extends Card {
    // Action: Purge a friendly Human creature from play. If you do, play a creature from your discard pile.
    setupCardAbilities(ability) {
        this.action({
            target: {
                cardType: 'creature',
                controller: 'self',
                cardCondition: (card) => card.hasTrait('human'),
                gameAction: ability.actions.purge()
            },
            then: {
                target: {
                    cardType: 'creature',
                    controller: 'self',
                    location: 'discard',
                    gameAction: ability.actions.playCard()
                },
                message: "{0} 打出了 {1} 从他的弃牌堆，通过 {1}的效果"
            }
        });
    }
}

SacrificialAltar.id = 'sacrificial-altar';

module.exports = SacrificialAltar;
