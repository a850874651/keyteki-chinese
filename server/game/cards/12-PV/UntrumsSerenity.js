const Card = require('../../Card.js');

class UntrumsSerenity extends Card {
    // Omega.
    // Play: Destroy each creature and artifact. Each player discards their archives and their hand, then refills their hand as if it were their "draw cards" step.
    setupCardAbilities(ability) {
        this.play({
            effect:
                "摧毁所有生物和神器,弃掉 {1} 从其档案并弃掉 {2} 从其手中, 弃掉 {3} 从 {4} 的档案并弃掉 {5} 从 {4} 的手中, 所有玩家抽满手牌",
            effectArgs: (context) => [
                context.player.archives.length > 0 ? context.player.archives : 'nothing',
                context.player.hand.length > 0 ? context.player.hand : 'nothing',
                context.player.opponent && context.player.opponent.archives.length > 0
                    ? context.player.opponent.archives
                    : 'nothing',
                context.player.opponent,
                context.player.opponent && context.player.opponent.hand.length > 0
                    ? context.player.opponent.hand
                    : 'nothing'
            ],
            gameAction: [
                ability.actions.destroy((context) => ({
                    target: context.game.cardsInPlay
                })),
                ability.actions.discard((context) => ({
                    target: context.player.archives.concat(
                        context.player.opponent ? context.player.opponent.archives : []
                    )
                })),
                ability.actions.discard((context) => ({
                    target: context.player.hand.concat(
                        context.player.opponent ? context.player.opponent.hand : []
                    )
                }))
            ],
            then: {
                alwaysTriggers: true,
                gameAction: [
                    ability.actions.draw((context) => ({
                        target: context.player,
                        refill: true
                    })),
                    ability.actions.draw((context) => ({
                        target: context.player.opponent,
                        refill: true
                    }))
                ]
            }
        });
    }
}

UntrumsSerenity.id = 'untrum-s-serenity';

module.exports = UntrumsSerenity;
