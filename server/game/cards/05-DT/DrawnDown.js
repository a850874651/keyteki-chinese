const Card = require('../../Card.js');

class DrawnDown extends Card {
    // Play: Look at the top 3 cards of your opponent窶冱 deck. Discard 1, put 1 on the bottom of their deck, and put 1 on top of their deck.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) => !!context.player.opponent,
            effect: "查看对手牌库顶的3张牌",
            gameAction: ability.actions.sequential([
                ability.actions.discard((context) => ({
                    promptWithHandlerMenu: {
                        activePromptTitle: 'Choose a card to add to discard',
                        cards: context.player.opponent.deck.slice(0, 3)
                    }
                })),
                ability.actions.moveToBottom((context) => ({
                    promptWithHandlerMenu: {
                        activePromptTitle: 'Choose a card to move to bottom of deck',
                        cards: context.player.opponent.deck.slice(0, 2),
                        message: '{0} 添加1张卡牌到手中并将1张卡牌放到牌库底'
                    }
                }))
            ])
        });
    }
}

DrawnDown.id = 'drawn-down';

module.exports = DrawnDown;
