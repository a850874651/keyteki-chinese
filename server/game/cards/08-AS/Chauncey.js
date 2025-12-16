const Card = require('../../Card.js');

class Chauncey extends Card {
    // Action: Destroy another friendly creature and Chauncey.  If you
    // do, gain 3A.
    setupCardAbilities(ability) {
        this.action({
            gameAction: ability.actions.jointAction([
                ability.actions.destroy((context) => ({
                    promptForSelect: {
                        cardType: 'creature',
                        controller: 'self',
                        cardCondition: (c) => c !== context.source,
                        message: '{0} 使用 {1} 摧毁 {2}',
                        messageArgs: (card) => [context.player, context.source, card]
                    }
                })),
                ability.actions.destroy((context) => ({
                    target: context.source
                }))
            ]),
            effect: '摧毁 {0}',
            then: {
                condition: (context) =>
                    context.preThenEvents.filter((event) => !event.cancelled).length === 2,
                gameAction: ability.actions.gainAmber({ amount: 3 }),
                message: '{0} 使用 {1} 获得3琥珀'
            }
        });
    }
}

Chauncey.id = 'chauncey';

module.exports = Chauncey;
