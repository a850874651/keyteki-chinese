const Card = require('../../Card.js');

class AmbrosiaOutpost extends Card {
    // Action: Put a friendly creatue on the bottom of its owner's deck. If you do, move 1A from a friendly creature to your pool.
    setupCardAbilities(ability) {
        this.action({
            target: {
                cardType: 'creature',
                controller: 'self',
                gameAction: ability.actions.returnToDeck({ bottom: true })
            },
            then: {
                target: {
                    cardType: 'creature',
                    controller: 'self',
                    cardCondition: (card) => card.hasToken('amber'),
                    gameAction: ability.actions.removeAmber()
                },
                then: (preThenContext) => ({
                    gameAction: ability.actions.gainAmber(),
                    message: '{0} 使用 {1} 移动1琥珀从 {3} 到他的琥珀池中',
                    messageArgs: [preThenContext.target]
                })
            }
        });
    }
}

AmbrosiaOutpost.id = 'æmbrosia-outpost';

module.exports = AmbrosiaOutpost;
