const Card = require('../../Card.js');

class MultiDimensionalRescue extends Card {
    // Play: Return one card of each type (action, artifact, creature,
    // upgrade) from your discard pile to your hand. For the remainder
    // of the turn, you may play a non-Star Alliance card. Purge
    // Multi-Dimensional Rescue.
    setupCardAbilities(ability) {
        this.play({
            targets: {
                action: {
                    cardType: 'action',
                    location: 'discard',
                    controller: 'self',
                    gameAction: ability.actions.returnToHand({ location: 'discard' })
                },
                artifact: {
                    cardType: 'artifact',
                    location: 'discard',
                    controller: 'self',
                    gameAction: ability.actions.returnToHand({ location: 'discard' })
                },
                creature: {
                    cardType: 'creature',
                    location: 'discard',
                    controller: 'self',
                    gameAction: ability.actions.returnToHand({ location: 'discard' })
                },
                upgrade: {
                    cardType: 'upgrade',
                    location: 'discard',
                    controller: 'self',
                    gameAction: ability.actions.returnToHand({ location: 'discard' })
                }
            },
            effect:
                '返回 {1} 到其手中, 本回合可以打出一张非星盟卡牌，并清除 {0}',
            effectArgs: (context) => [Object.values(context.targets)],
            then: {
                alwaysTriggers: true,
                gameAction: ability.actions.untilPlayerTurnEnd({
                    effect: ability.effects.canPlayNonHouse('staralliance')
                }),
                then: {
                    alwaysTriggers: true,
                    gameAction: ability.actions.purge((context) => ({
                        target: context.source
                    }))
                }
            }
        });
    }
}

MultiDimensionalRescue.id = 'multi-dimensional-rescue';

module.exports = MultiDimensionalRescue;
