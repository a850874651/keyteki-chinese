const Card = require('../../Card.js');

class GanymedeOutpost extends Card {
    // Action: Put a friendly creature on the bottom of its owner's
    // deck. If you do, archive 2 cards.
    setupCardAbilities(ability) {
        this.action({
            target: {
                cardType: 'creature',
                controller: 'self',
                gameAction: ability.actions.returnToDeck({ bottom: true })
            },
            then: {
                targets: {
                    cards: {
                        mode: 'exactly',
                        numCards: 2,
                        controller: 'self',
                        location: 'hand',
                        gameAction: ability.actions.archive()
                    }
                },
                message: '{0} 使用 {1} 归档2张卡牌'
            }
        });
    }
}

GanymedeOutpost.id = 'ganymede-outpost';

module.exports = GanymedeOutpost;
