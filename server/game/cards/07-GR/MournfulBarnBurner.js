const Card = require('../../Card.js');

class MournfulBarnBurner extends Card {
    // After Fight: Discard the top 2 cards of a player窶冱 deck.
    //
    // Scrap: Each player discards the top card of their deck.
    setupCardAbilities(ability) {
        this.fight({
            target: {
                mode: 'select',
                activePromptTitle: "Which player's deck",
                choices: {
                    Mine: () => true,
                    "Opponent's": (context) => !!context.player.opponent
                }
            },
            effect: "弃掉 {1} 牌库顶的2张牌",
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
                            ? context.player.deck.slice(0, Math.min(2, context.player.deck.length))
                            : context.player.opponent.deck.slice(
                                  0,
                                  Math.min(2, context.player.opponent.deck.length)
                              )
                })
            }))
        });

        this.scrap({
            condition: (context) =>
                context.player.deck.length > 0 ||
                (!!context.player.opponent && context.player.opponent.deck.length > 0),
            gameAction: [
                ability.actions.conditional({
                    condition: (context) => context.player.deck.length > 0,
                    trueGameAction: ability.actions.discard((context) => ({
                        target: context.player.deck[0]
                    }))
                }),
                ability.actions.conditional({
                    condition: (context) =>
                        !!context.player.opponent && context.player.opponent.deck.length > 0,
                    trueGameAction: ability.actions.discard((context) => ({
                        target: context.player.opponent ? context.player.opponent.deck[0] : []
                    }))
                })
            ],
            message: "{0} 使用 {1} 弃掉每位玩家牌库顶的卡牌",
            messageArgs: (context) => [context.player, context.source]
        });
    }
}

MournfulBarnBurner.id = 'mournful-barn-burner';

module.exports = MournfulBarnBurner;
