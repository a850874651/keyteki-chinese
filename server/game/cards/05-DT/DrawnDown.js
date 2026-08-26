const Card = require('../../Card.js');

class DrawnDown extends Card {
    // Play: Look at the top 3 cards of your opponent's deck. Discard 1, put 1 on the bottom of their deck, and put 1 on top of their deck.
    setupCardAbilities(ability) {
        this.play({
            condition: (context) => !!context.player.opponent,
            effect: '{1}',
            effectArgs: (context) => {
                const count = Math.min(3, context.player.opponent.deck.length);
                return count
                    ? `查看牌库顶 ${count} 牌在${count === 1 ? '' : 's'} of ${
                          context.player.opponent.name
                      }的牌库`
                    : `look at ${context.player.opponent.name}的牌库, 但是牌库是空的`;
            },
            gameAction: ability.actions.sequential([
                ability.actions.conditional({
                    // Only show the discard prompt if there is at least 1 card in the opponent's deck
                    condition: (context) => context.player.opponent.deck.length >= 1,
                    trueGameAction: ability.actions.discard((context) => ({
                        promptWithHandlerMenu: {
                            activePromptTitle: '选择一张牌弃置',
                            cards: context.player.opponent.deck.slice(0, 3)
                        }
                    }))
                }),
                ability.actions.conditional({
                    // Only show the move to bottom prompt if there were at least 2 cards in the opponent's deck (1 was already discarded and 1 to move to bottom so condition on 1)
                    condition: (context) => context.player.opponent.deck.length >= 1,
                    trueGameAction: ability.actions.moveToBottom((context) => ({
                        promptWithHandlerMenu: {
                            activePromptTitle: '选择一张牌放到牌库底',
                            cards: context.player.opponent.deck.slice(0, 2),
                            message: "{0} 使用 {1} 来将牌放到 {3}的牌库底",
                            messageArgs: [context.player.opponent]
                        }
                    }))
                })
            ]),
            then: {
                // If there were at least 3 cards in the opponent's deck (1 was already discard, and another put on the bottom, so condition on 2), show a message that the remaining card was automatically put back on top
                alwaysTriggers: true,
                condition: (context) => context.player.opponent.deck.length >= 2,
                message: "{0} 使用 {1} 来将牌放到 {3}的牌库顶",
                messageArgs: (context) => [context.player.opponent]
            }
        });
    }
}

DrawnDown.id = 'drawn-down';

module.exports = DrawnDown;
