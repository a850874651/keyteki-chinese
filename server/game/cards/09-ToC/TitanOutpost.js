const Card = require('../../Card.js');

class TitanOutpost extends Card {
    // Action: Put a friendly creature on the bottom of its owner's
    // deck. If you do, make a token creature and archive a card.
    setupCardAbilities(ability) {
        this.action({
            target: {
                cardType: 'creature',
                controller: 'self',
                gameAction: ability.actions.returnToDeck({ bottom: true })
            },
            then: {
                gameAction: ability.actions.makeTokenCreature(),
                message: '{0} 使用 {1} 制造1个代标生物',
                then: {
                    alwaysTriggers: true,
                    target: {
                        location: 'hand',
                        controller: 'self',
                        gameAction: ability.actions.archive()
                    },
                    message: '{0} 使用 {1} 归档1张卡牌'
                }
            }
        });
    }
}

TitanOutpost.id = 'titan-outpost';

module.exports = TitanOutpost;
