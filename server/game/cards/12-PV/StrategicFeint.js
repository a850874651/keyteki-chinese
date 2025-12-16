const Card = require('../../Card.js');

class StrategicFeint extends Card {
    // Play: Deal 1 to two enemy creatures and exhaust them.
    // Fate: Discard the top card of your deck. Until the end of the turn, you may not play cards of the discarded card's type.
    setupCardAbilities(ability) {
        this.play({
            target: {
                mode: 'exactly',
                numCards: 2,
                cardType: 'creature',
                controller: 'opponent',
                gameAction: [ability.actions.dealDamage({ amount: 1 }), ability.actions.exhaust()]
            }
        });

        this.fate({
            gameAction: ability.actions.discard((context) => ({
                target: context.game.activePlayer.deck.length
                    ? context.game.activePlayer.deck[0]
                    : []
            })),
            then: {
                condition: (context) => !!context.preThenEvent.card,
                gameAction: ability.actions.untilPlayerTurnEnd((context) => ({
                    targetController: 'opponent',
                    effect: ability.effects.playerCannot(
                        'play',
                        (innerContext) =>
                            innerContext.source.type === context.preThenEvent.card.type
                    )
                })),
                message: '{0} 使用 {1} 防止在本回合的剩余时间内打出 {3} 卡',
                messageArgs: (context) => [context.preThenEvent.card.type],
                effectAlert: true
            }
        });
    }
}

StrategicFeint.id = 'strategic-feint';

module.exports = StrategicFeint;
