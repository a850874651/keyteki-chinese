const Card = require('../../Card.js');

class VaporImp extends Card {
    // After Reap: Discard a random card from your hand. During your
    // opponent窶冱 next turn, they cannot play cards of the discarded
    // card窶冱 type.
    setupCardAbilities(ability) {
        this.reap({
            gameAction: ability.actions.discardAtRandom((context) => ({
                target: context.player
            })),
            then: {
                condition: (context) =>
                    context.player.opponent && context.preThenEvent.cards.length > 0,
                gameAction: ability.actions.duringOpponentNextTurn((context) => ({
                    targetController: 'opponent',
                    effect: ability.effects.playerCannot(
                        'play',
                        (innerContext) =>
                            innerContext.source.type === context.preThenEvent.cards[0].type
                    )
                })),
                message: '{3} 使用 {4} 防止 {5} 下回合打出 {6} 卡牌',
                messageArgs: (context) => [
                    context.player,
                    context.source,
                    context.player.opponent,
                    context.preThenEvent.cards[0].type
                ],
                effectAlert: true
            }
        });
    }
}

VaporImp.id = 'vapor-imp';

module.exports = VaporImp;
