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
            effect: '选择保持留着牌库顶或放到牌库底.'
        });
    }
}

FutureBooster.id = 'future-booster';

module.exports = FutureBooster;
