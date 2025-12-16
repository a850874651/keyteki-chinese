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
                    activePromptTitle: 'Select card to discard',
                    cards: [context.player.deck[0]],
                    choices: ['Leave on top of deck'],
                    handlers: [() => []]
                }
            })),
            message: '选择保持或弃掉牌库顶的卡牌'
        });
    }
}

ScoutPete.id = 'scout-pete';

module.exports = ScoutPete;
