const Card = require('../../Card.js');

class ScoutPete extends Card {
    // Play/Fight/Reap: Look at the top card of your deck. You may discard that card.
    setupCardAbilities(ability) {
        this.play({
            fight: true,
            reap: true,
            condition: (context) => context.player.deck.length > 0,
            gameAction: ability.actions.discard((context) => ({
                promptWithHandlerMenu: {
                    optional: true,
                    activePromptTitle: 'Select a card to discard',
                    cards: [context.player.deck[0]],
                    choices: ['Leave on top of deck'],
                    handlers: [() => []]
                }
            })),
            effect: '选择保持或弃掉牌库顶的卡牌',
            then: {
                alwaysTriggers: true,
                condition: (context) => !context.preThenEvent || context.preThenEvent.cancelled,
                message: '{0} 使用 {1} 保持牌库顶的卡牌'
            }
        });
    }
}

ScoutPete.id = 'scout-pete';

module.exports = ScoutPete;
