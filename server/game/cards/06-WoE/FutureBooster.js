const Card = require('../../Card.js');

class FutureBooster extends Card {
    // Omni: Look at the top card of your deck. You may put it on the
    // bottom of your deck.
    setupCardAbilities(ability) {
        this.omni({
            condition: (context) => context.player.deck.length > 0,
            gameAction: ability.actions.moveToBottom((context) => ({
                promptWithHandlerMenu: {
                    optional: true,
                    activePromptTitle: 'Select card to move to bottom of deck',
                    cards: [context.player.deck[0]],
                    choices: ['Leave on top of deck'],
                    handlers: [() => []]
                }
            })),
            effect: '查看牌库顶的牌',
            then: {
                alwaysTriggers: true,
                message: '{0} 使用 {1} 来将 {3}',
                messageArgs: (context) => [
                    context.preThenEvent && !context.preThenEvent.cancelled
                        ? '移动到牌库底'
                        : '保留在牌库顶'
                ]
            }
        });
    }
}

FutureBooster.id = 'future-booster';

module.exports = FutureBooster;
