const Card = require('../../Card.js');

class Boo extends Card {
    // Play: Discard the top 10 cards of a player窶冱 deck.
    setupCardAbilities(ability) {
        this.play({
            target: {
                mode: 'select',
                activePromptTitle: "Which player's deck",
                choices: {
                    Mine: () => true,
                    "Opponent's": (context) => !!context.player.opponent
                }
            },
            effect: "弃掉 {1} 牌库顶的10张牌",
            effectArgs: (context) => [
                !context.select || context.select === 'Mine'
                    ? context.player
                    : context.player.opponent
            ],
            gameAction: ability.actions.conditional((context) => ({
                condition:
                    !context.select || context.select === 'Mine'
                        ? context.player.deck.length > 0
                        : context.player.opponent.deck.length > 0,
                trueGameAction: ability.actions.discard({
                    target:
                        !context.select || context.select === 'Mine'
                            ? context.player.deck.slice(0, 10)
                            : context.player.opponent.deck.slice(0, 10)
                })
            }))
        });
    }
}

Boo.id = 'boo';

module.exports = Boo;
