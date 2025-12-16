const Card = require('../../Card.js');

function firstCreatureInDiscard(context) {
    const player =
        !context.select || context.select === 'Mine' ? context.player : context.player.opponent;
    return player.discard.find((c) => c.type === 'creature');
}

class SoulExchange extends Card {
    // Play: Choose a player. Return the topmost creature from that
    // player窶冱 discard pile to their hand. Destroy a creature
    // controlled by that player.
    setupCardAbilities(ability) {
        this.play({
            target: {
                mode: 'select',
                activePromptTitle: "Which player's discard",
                choices: {
                    Mine: () => true,
                    "Opponent's": (context) => !!context.player.opponent
                }
            },
            gameAction: ability.actions.conditional((context) => ({
                condition: !!firstCreatureInDiscard(context),
                trueGameAction: ability.actions.returnToHand({
                    location: 'discard',
                    target: firstCreatureInDiscard(context)
                })
            })),
            effect: "将 {1} 返回到 {2} 的手中",
            effectArgs: (context) => [
                firstCreatureInDiscard(context) ? firstCreatureInDiscard(context) : 'no creature',
                !context.select || context.select === 'Mine'
                    ? context.player
                    : context.player.opponent
            ],
            then: (preThenContext) => ({
                alwaysTriggers: true,
                target: {
                    controller:
                        !preThenContext.select || preThenContext.select === 'Mine'
                            ? 'self'
                            : 'opponent',
                    cardType: 'creature',
                    gameAction: ability.actions.destroy()
                },
                message: '{0} 使用 {1} 摧毁 {3}',
                messageArgs: (context) => [context.target]
            })
        });
    }
}

SoulExchange.id = 'soul-exchange';

module.exports = SoulExchange;
